import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";

export type SourceKind = "github-repo" | "local-fork";

export interface SourceEntry {
  id: string;
  kind: SourceKind;
  repository: string;
  url: string;
  description: string;
  managedBy: "external" | "vendored";
}

export interface SkillInstall {
  kind: "skills-add";
  package?: string;
  path?: string;
  skill: string;
}

export interface UpstreamReference {
  repository: string;
  commit: string;
  path: string;
}

export interface SkillEntry {
  id: string;
  sourceId: string;
  install: SkillInstall;
  upstream?: UpstreamReference;
  tags: string[];
  notes: string;
}

export interface CollectionEntry {
  id: string;
  description: string;
  skills: string[];
}

export interface Catalog {
  sources: SourceEntry[];
  skills: SkillEntry[];
  collections: CollectionEntry[];
}

export interface MetaConfig {
  defaultAgents: string[];
  defaultScope: "project" | "global";
}

export interface InstallOptions {
  agents?: string[];
  global?: boolean;
  copy?: boolean;
}

export interface InstallCommand {
  id: string;
  source: string;
  command: string;
  args: string[];
  displayCommand: string;
}

export interface InstallPlan {
  requestedId: string;
  expandedSkills: SkillEntry[];
  commands: InstallCommand[];
}

function fail(message: string): never {
  throw new Error(message);
}

export function resolveRoot(explicitRoot?: string): string {
  return explicitRoot ? path.resolve(explicitRoot) : process.cwd();
}

export function loadConfig(env: NodeJS.ProcessEnv = process.env): MetaConfig {
  const defaultAgent = env.SKILLS_META_DEFAULT_AGENT?.trim();
  const scope = env.SKILLS_META_DEFAULT_SCOPE?.trim();
  if (scope && scope !== "project" && scope !== "global") {
    fail(
      `SKILLS_META_DEFAULT_SCOPE must be "project" or "global", got "${scope}".`,
    );
  }
  const defaultScope: "project" | "global" =
    scope === "global" ? "global" : "project";

  return {
    defaultAgents: defaultAgent ? [defaultAgent] : [],
    defaultScope,
  };
}

export function loadCatalog(root = resolveRoot()): Catalog {
  const catalogPath = path.join(root, "catalog", "registry.json");
  if (!existsSync(catalogPath)) {
    fail(`Catalog file not found at ${catalogPath}.`);
  }

  const parsed = JSON.parse(
    readFileSync(catalogPath, "utf8"),
  ) as Partial<Catalog>;
  return validateCatalog(parsed, root);
}

function validateCatalog(input: Partial<Catalog>, root: string): Catalog {
  const sources = input.sources ?? [];
  const skills = input.skills ?? [];
  const collections = input.collections ?? [];

  if (
    !Array.isArray(sources) ||
    !Array.isArray(skills) ||
    !Array.isArray(collections)
  ) {
    fail(
      "Catalog must contain array fields for sources, skills, and collections.",
    );
  }

  const sourceIds = new Set<string>();
  for (const source of sources) {
    if (!source.id) fail("Every source requires an id.");
    if (sourceIds.has(source.id)) fail(`Duplicate source id "${source.id}".`);
    sourceIds.add(source.id);
  }

  const skillIds = new Set<string>();
  for (const skill of skills) {
    if (!skill.id) fail("Every skill requires an id.");
    if (skillIds.has(skill.id)) fail(`Duplicate skill id "${skill.id}".`);
    skillIds.add(skill.id);
    if (!sourceIds.has(skill.sourceId)) {
      fail(
        `Skill "${skill.id}" references unknown source "${skill.sourceId}".`,
      );
    }
    if (!skill.install.package && !skill.install.path) {
      fail(
        `Skill "${skill.id}" must define either install.package or install.path.`,
      );
    }
    if (skill.install.path) {
      const localPath = path.join(root, skill.install.path);
      if (!existsSync(localPath)) {
        fail(
          `Skill "${skill.id}" points to missing local path "${skill.install.path}".`,
        );
      }
    }
  }

  const collectionIds = new Set<string>();
  for (const collection of collections) {
    if (!collection.id) fail("Every collection requires an id.");
    if (collectionIds.has(collection.id)) {
      fail(`Duplicate collection id "${collection.id}".`);
    }
    collectionIds.add(collection.id);
    for (const skillId of collection.skills) {
      if (!skillIds.has(skillId)) {
        fail(
          `Collection "${collection.id}" references unknown skill "${skillId}".`,
        );
      }
    }
  }

  return {
    sources: sources as SourceEntry[],
    skills: skills as SkillEntry[],
    collections: collections as CollectionEntry[],
  };
}

export function findSkill(
  catalog: Catalog,
  id: string,
): SkillEntry | undefined {
  return catalog.skills.find((entry) => entry.id === id);
}

export function findCollection(
  catalog: Catalog,
  id: string,
): CollectionEntry | undefined {
  return catalog.collections.find((entry) => entry.id === id);
}

export function findSource(
  catalog: Catalog,
  id: string,
): SourceEntry | undefined {
  return catalog.sources.find((entry) => entry.id === id);
}

function formatCommand(command: string, args: string[]): string {
  return [command, ...args]
    .map((part) => (part.includes(" ") ? JSON.stringify(part) : part))
    .join(" ");
}

export function planInstall(
  catalog: Catalog,
  root: string,
  requestedId: string,
  options: InstallOptions,
): InstallPlan {
  const expandedSkills = expandRequestedSkills(catalog, requestedId);

  const commands = expandedSkills.map((skill) => {
    const args = ["-y", "skills", "add"];

    if (options.global) {
      args.push("--global");
    }

    const sourcePath = skill.install.path;
    const source = skill.install.package
      ? skill.install.package
      : sourcePath
        ? path.join(root, sourcePath)
        : fail(`Skill "${skill.id}" is missing install.path.`);
    args.push(source, "--skill", skill.install.skill);

    for (const agent of options.agents ?? []) {
      args.push("--agent", agent);
    }

    if (options.copy) {
      args.push("--copy");
    }

    return {
      id: skill.id,
      source,
      command: "npx",
      args,
      displayCommand: formatCommand("npx", args),
    };
  });

  return {
    requestedId,
    expandedSkills,
    commands,
  };
}

function expandRequestedSkills(
  catalog: Catalog,
  requestedId: string,
): SkillEntry[] {
  const directSkill = findSkill(catalog, requestedId);
  if (directSkill) {
    return [directSkill];
  }

  const collection = findCollection(catalog, requestedId);
  if (!collection) {
    fail(`Unknown skill or collection "${requestedId}".`);
  }

  return collection.skills.map((skillId) => {
    const skill = findSkill(catalog, skillId);
    if (!skill) {
      fail(
        `Collection "${collection.id}" references missing skill "${skillId}".`,
      );
    }
    return skill;
  });
}

export interface ValidationResult {
  ok: boolean;
  checks: string[];
  issues: string[];
}

const REQUIRED_FRONTIER_HEADINGS = [
  "Goal",
  "Spec Anchor",
  "Why Now",
  "Out Of Scope",
  "Scope",
  "Acceptance Bar",
  "Current Status",
  "Last Completed Slice",
  "Key Context Paths",
  "Attempt Log",
  "Validation Log",
  "Artifacts",
  "Blockers",
  "Next Step",
];

export function validateRepo(root = resolveRoot()): ValidationResult {
  const checks: string[] = [];
  const issues: string[] = [];

  try {
    loadCatalog(root);
    checks.push("Catalog loaded and integrity checks passed.");
  } catch (error) {
    issues.push(error instanceof Error ? error.message : String(error));
  }

  const frontierDir = path.join(root, "docs", "exec-plans", "active");
  if (!existsSync(frontierDir)) {
    issues.push(`Missing active frontier directory at ${frontierDir}.`);
  } else {
    const activeFiles = readdirSync(frontierDir).filter((file) =>
      file.endsWith(".md"),
    );
    if (activeFiles.length !== 1) {
      issues.push(
        `Expected exactly one active frontier file, found ${activeFiles.length}.`,
      );
    } else {
      const activeFile = activeFiles[0];
      if (!activeFile) {
        issues.push("Active frontier resolution failed unexpectedly.");
        return {
          ok: false,
          checks,
          issues,
        };
      }
      const frontierPath = path.join(frontierDir, activeFile);
      const content = readFileSync(frontierPath, "utf8");
      for (const heading of REQUIRED_FRONTIER_HEADINGS) {
        if (!content.includes(`## ${heading}`)) {
          issues.push(
            `Frontier file ${frontierPath} is missing "## ${heading}".`,
          );
        }
      }
      if (issues.length === 0) {
        checks.push(`Active frontier file is valid: ${frontierPath}.`);
      }
    }
  }

  const requiredFiles = [
    path.join(root, "README.md"),
    path.join(root, "AGENTS.md"),
    path.join(root, "docs", "contracts", "commands.yaml"),
    path.join(root, ".env.example"),
  ];
  for (const filePath of requiredFiles) {
    if (!existsSync(filePath)) {
      issues.push(`Missing required bootstrap file ${filePath}.`);
    }
  }
  if (issues.length === 0) {
    checks.push("Required bootstrap files are present.");
  }

  return {
    ok: issues.length === 0,
    checks,
    issues,
  };
}
