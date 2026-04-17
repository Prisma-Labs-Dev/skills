#!/usr/bin/env node

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

type OutputName = "official-learning-path" | "tutorials-and-examples";
type GroupName = "foundation" | "core-api" | "learning" | "optional";

interface ResourceEntry {
  id: string;
  group: GroupName;
  outputs: OutputName[];
  url: string;
  localPurpose: string;
}

interface Manifest {
  generatedFrom: string;
  resources: ResourceEntry[];
}

interface ResourceSnapshot extends ResourceEntry {
  resolvedUrl: string;
  title: string;
  description: string;
}

interface RefreshArtifacts {
  snapshots: ResourceSnapshot[];
  outputs: Record<OutputName, string>;
}

const root = process.cwd();
const manifestPath = path.join(root, "sources", "motion", "resources.json");
const cachePath = path.join(
  root,
  "sources",
  "motion",
  "cache",
  "resources.generated.json",
);
const outputPaths: Record<OutputName, string> = {
  "official-learning-path": path.join(
    root,
    "vendors",
    "secondsky",
    "motion",
    "skills",
    "motion",
    "references",
    "official-learning-path.md",
  ),
  "tutorials-and-examples": path.join(
    root,
    "vendors",
    "secondsky",
    "motion",
    "skills",
    "motion",
    "references",
    "tutorials-and-examples.md",
  ),
};

async function main(): Promise<void> {
  const [command = "refresh", ...args] = process.argv.slice(2);
  switch (command) {
    case "refresh":
      await runRefresh(args.includes("--apply"));
      return;
    case "help":
    case "--help":
    case "-h":
      printHelp();
      return;
    default:
      printHelp();
      throw new Error(`Unknown command: ${command}`);
  }
}

async function runRefresh(apply: boolean): Promise<void> {
  const manifest = await loadManifest();
  const artifacts = await buildArtifacts(manifest);
  const changes = await collectChanges(artifacts);

  console.log("Motion docs refresh");
  console.log(`  apply=${apply ? "yes" : "no"}`);
  console.log(`  resources=${artifacts.snapshots.length}`);

  for (const change of changes) {
    console.log(`  ${change.changed ? "CHANGED" : "OK"} ${change.path}`);
  }

  if (!apply) {
    if (changes.some((change) => change.changed)) {
      console.log("");
      console.log(
        "Run `pnpm motion-docs:refresh` to write refreshed artifacts.",
      );
      process.exitCode = 1;
    }
    return;
  }

  await mkdir(path.dirname(cachePath), { recursive: true });
  await writeFile(cachePath, renderSnapshotJson(artifacts.snapshots), "utf8");

  for (const [outputName, content] of Object.entries(artifacts.outputs) as [
    OutputName,
    string,
  ][]) {
    await mkdir(path.dirname(outputPaths[outputName]), { recursive: true });
    await writeFile(outputPaths[outputName], content, "utf8");
  }

  console.log("");
  console.log("Wrote refreshed Motion artifacts.");
}

async function buildArtifacts(manifest: Manifest): Promise<RefreshArtifacts> {
  const snapshots = await Promise.all(manifest.resources.map(fetchResource));
  return {
    snapshots,
    outputs: {
      "official-learning-path": renderOfficialLearningPath(snapshots),
      "tutorials-and-examples": renderTutorialsAndExamples(snapshots),
    },
  };
}

async function fetchResource(
  resource: ResourceEntry,
): Promise<ResourceSnapshot> {
  const response = await fetch(resource.url, { redirect: "follow" });
  if (!response.ok) {
    throw new Error(`Failed to fetch ${resource.url}: ${response.status}`);
  }

  const html = await response.text();
  return {
    ...resource,
    resolvedUrl: response.url,
    title: decodeHtml(extractTitle(html)),
    description: decodeHtml(extractDescription(html)),
  };
}

function extractTitle(html: string): string {
  return (
    html.match(/<title>(.*?)<\/title>/is)?.[1]?.trim() ?? "Untitled Motion page"
  );
}

function extractDescription(html: string): string {
  const value =
    html.match(
      /<meta[^>]+name=["']description["'][^>]+content=["'](.*?)["']/is,
    )?.[1] ??
    html.match(
      /<meta[^>]+property=["']og:description["'][^>]+content=["'](.*?)["']/is,
    )?.[1];
  return value?.trim() ?? "No description available.";
}

function decodeHtml(value: string): string {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&#39;", "'")
    .replaceAll("&quot;", '"')
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}

async function loadManifest(): Promise<Manifest> {
  return JSON.parse(await readFile(manifestPath, "utf8")) as Manifest;
}

function renderOfficialLearningPath(snapshots: ResourceSnapshot[]): string {
  const sections: Array<{ heading: string; group: GroupName; intro: string }> =
    [
      {
        heading: "Foundation",
        group: "foundation",
        intro:
          "Use these first when the agent needs the canonical docs, latest install guidance, or a clean official starting point.",
      },
      {
        heading: "Core API Pages",
        group: "core-api",
        intro:
          "Use these when implementation questions need the official API surface rather than a fork-local summary.",
      },
      {
        heading: "Learning Surfaces",
        group: "learning",
        intro:
          "Use these when the user wants worked examples, tutorials, or broader exploration.",
      },
      {
        heading: "Optional AI Path",
        group: "optional",
        intro:
          "Use this only when the user already has access to Motion's AI kit or MCP workflow.",
      },
    ];

  const lines = [
    "# Official Learning Path",
    "",
    "> Generated from official Motion URLs by `pnpm motion-docs:refresh`.",
    "",
    "Use this reference when the agent needs direct access to the official Motion docs, current API pages, tutorials, examples, or the optional AI kit/MCP workflow.",
    "",
    "## Core Rule",
    "",
    "Use the official Motion pages for freshness and canon.",
    "",
    "Use the local opinionated guide for defaults, taste, and preferred subsets.",
    "",
  ];

  for (const section of sections) {
    lines.push(`## ${section.heading}`, "", section.intro, "");
    for (const snapshot of snapshots.filter(
      (entry) => entry.group === section.group,
    )) {
      lines.push(...renderResource(snapshot));
    }
  }

  return `${lines.join("\n").trimEnd()}\n`;
}

function renderTutorialsAndExamples(snapshots: ResourceSnapshot[]): string {
  const items = snapshots.filter((entry) =>
    entry.outputs.includes("tutorials-and-examples"),
  );
  const lines = [
    "# Tutorials And Examples",
    "",
    "> Generated from official Motion URLs by `pnpm motion-docs:refresh`.",
    "",
    "Use this reference when the user specifically wants learning material, worked examples, or inspiration rather than only API pages.",
    "",
    "## Best Sources",
    "",
  ];

  for (const snapshot of items) {
    lines.push(...renderResource(snapshot));
  }

  lines.push(
    "## How To Use Them With This Fork",
    "",
    "1. Start with the official example or tutorial that is closest to the requested interaction.",
    "2. Use the local templates in `templates/` if they already cover the shape.",
    "3. Apply `opinionated-guide.md` and `polish-and-bar-raising.md` once the interaction is functionally correct.",
    "",
    "## Good Matching Heuristic",
    "",
    "- Need freshness or canon: official docs/tutorials/examples.",
    "- Need a local starter or pre-filtered subset: this fork's opinionated guide and templates.",
    "- Need refinement and taste: the local polish layer.",
  );

  return `${lines.join("\n").trimEnd()}\n`;
}

function renderResource(snapshot: ResourceSnapshot): string[] {
  return [
    `### [${snapshot.title}](${snapshot.resolvedUrl})`,
    "",
    `- Why load: ${snapshot.localPurpose}`,
    `- Official summary: ${snapshot.description}`,
    "",
  ];
}

function renderSnapshotJson(snapshots: ResourceSnapshot[]): string {
  return `${JSON.stringify(snapshots, null, 2)
    .replace(/"outputs": \[\n(\s+)"([^"]+)"\n(\s+)\]/g, '"outputs": ["$2"]')
    .replace(
      /"outputs": \[\n(\s+)"([^"]+)",\n(\s+)"([^"]+)"\n(\s+)\]/g,
      '"outputs": ["$2", "$4"]',
    )}\n`;
}

async function collectChanges(
  artifacts: RefreshArtifacts,
): Promise<Array<{ path: string; changed: boolean }>> {
  const checks: Array<{ path: string; content: string }> = [
    { path: cachePath, content: renderSnapshotJson(artifacts.snapshots) },
    ...(Object.entries(artifacts.outputs) as [OutputName, string][]).map(
      ([outputName, content]) => ({
        path: outputPaths[outputName],
        content,
      }),
    ),
  ];

  const results: Array<{ path: string; changed: boolean }> = [];
  for (const check of checks) {
    try {
      const current = await readFile(check.path, "utf8");
      results.push({
        path: path.relative(root, check.path),
        changed: current !== check.content,
      });
    } catch {
      results.push({ path: path.relative(root, check.path), changed: true });
    }
  }
  return results;
}

function printHelp(): void {
  console.log(`motion-docs.ts

Usage:
  tsx scripts/motion-docs.ts refresh
  tsx scripts/motion-docs.ts refresh --apply

Commands:
  refresh      Fetch official Motion page metadata and render local reference files
`);
}

void main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
