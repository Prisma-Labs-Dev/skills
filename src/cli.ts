#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import {
  findCollection,
  findSkill,
  findSource,
  loadCatalog,
  loadConfig,
  planInstall,
  resolveRoot,
  validateRepo,
} from "./catalog.js";

interface ParsedArgs {
  positional: string[];
  json: boolean;
  dryRun: boolean;
  agents: string[];
  global: boolean;
  copy: boolean;
  root?: string;
}

function printHelp(): void {
  console.log(`skills-meta

Small control-plane CLI for this repository's skill catalog.

Usage:
  pnpm skills-meta <command> [options]

Commands:
  list                  List sources, skills, and collections
  show <id>             Show one source, skill, or collection
  install <id>          Install a skill or collection through the skills CLI
  validate              Validate the repo bootstrap and catalog invariants

Flags:
  --json                Emit machine-readable JSON
  --dry-run             For install, print planned commands without executing them
  --agent <name>        Repeatable. Target one or more agents during install
  --global              Install globally instead of project scope
  --copy                Copy files instead of symlinking during install
  --root <path>         Resolve the repo from an explicit root

Examples:
  pnpm skills-meta list --json
  pnpm skills-meta show motion
  pnpm skills-meta install motion --agent codex --dry-run
`);
}

function parseArgs(argv: string[]): ParsedArgs {
  const parsed: ParsedArgs = {
    positional: [],
    json: false,
    dryRun: false,
    agents: [],
    global: false,
    copy: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const value = argv[index];
    if (!value) {
      throw new Error("Unexpected empty argument.");
    }
    switch (value) {
      case "--json":
        parsed.json = true;
        break;
      case "--dry-run":
        parsed.dryRun = true;
        break;
      case "--global":
        parsed.global = true;
        break;
      case "--copy":
        parsed.copy = true;
        break;
      case "--agent": {
        const agent = argv[index + 1];
        if (!agent) {
          throw new Error("Missing value after --agent.");
        }
        parsed.agents.push(agent);
        index += 1;
        break;
      }
      case "--root": {
        const root = argv[index + 1];
        if (!root) {
          throw new Error("Missing value after --root.");
        }
        parsed.root = root;
        index += 1;
        break;
      }
      default:
        parsed.positional.push(value);
        break;
    }
  }

  return parsed;
}

function printValue(value: unknown, asJson: boolean): void {
  if (asJson) {
    console.log(JSON.stringify(value, null, 2));
    return;
  }

  if (typeof value === "string") {
    console.log(value);
    return;
  }

  console.log(JSON.stringify(value, null, 2));
}

async function main(): Promise<void> {
  const parsed = parseArgs(process.argv.slice(2));
  const [command, id] = parsed.positional;

  if (
    !command ||
    command === "--help" ||
    command === "-h" ||
    command === "help"
  ) {
    printHelp();
    return;
  }

  const root = resolveRoot(parsed.root);
  const catalog = loadCatalog(root);

  switch (command) {
    case "list": {
      const response = {
        root,
        sources: catalog.sources,
        skills: catalog.skills.map((skill) => ({
          id: skill.id,
          sourceId: skill.sourceId,
          notes: skill.notes,
          tags: skill.tags,
        })),
        collections: catalog.collections,
      };

      if (parsed.json) {
        printValue(response, true);
        return;
      }

      console.log("Sources");
      for (const source of response.sources) {
        console.log(`- ${source.id}: ${source.description}`);
      }
      console.log("\nSkills");
      for (const skill of response.skills) {
        console.log(`- ${skill.id} (${skill.sourceId})`);
      }
      console.log("\nCollections");
      for (const collection of response.collections) {
        console.log(`- ${collection.id}: ${collection.skills.join(", ")}`);
      }
      return;
    }
    case "show": {
      if (!id) {
        throw new Error("show requires an id.");
      }

      const value =
        findSkill(catalog, id) ??
        findCollection(catalog, id) ??
        findSource(catalog, id);
      if (!value) {
        throw new Error(`No source, skill, or collection found for "${id}".`);
      }
      printValue(value, parsed.json);
      return;
    }
    case "install": {
      if (!id) {
        throw new Error("install requires a skill or collection id.");
      }

      const config = loadConfig(process.env);
      const plan = planInstall(catalog, root, id, {
        agents: parsed.agents.length > 0 ? parsed.agents : config.defaultAgents,
        global: parsed.global || config.defaultScope === "global",
        copy: parsed.copy,
      });

      if (parsed.dryRun || parsed.json) {
        printValue(
          {
            root,
            requestedId: id,
            expandedSkills: plan.expandedSkills.map((skill) => skill.id),
            commands: plan.commands,
            mode: parsed.dryRun ? "dry-run" : "planned",
          },
          parsed.json,
        );
        if (!parsed.json) {
          for (const commandToRun of plan.commands) {
            console.log(commandToRun.displayCommand);
          }
        }
        if (parsed.dryRun) {
          return;
        }
      }

      const executions = plan.commands.map((entry) => {
        const result = spawnSync(entry.command, entry.args, {
          cwd: root,
          encoding: "utf8",
          stdio: parsed.json ? "pipe" : "inherit",
        });
        return {
          id: entry.id,
          command: entry.displayCommand,
          status: result.status,
          stdout: parsed.json ? result.stdout : undefined,
          stderr: parsed.json ? result.stderr : undefined,
        };
      });

      const failed = executions.find((execution) => execution.status !== 0);
      if (parsed.json) {
        printValue(
          {
            ok: !failed,
            executions,
          },
          true,
        );
      }
      if (failed) {
        throw new Error(`Install failed for ${failed.id}.`);
      }
      return;
    }
    case "validate": {
      const validation = validateRepo(root);
      printValue(validation, parsed.json);
      if (!validation.ok) {
        process.exitCode = 1;
      }
      return;
    }
    default:
      throw new Error(`Unknown command "${command}".`);
  }
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(message);
  process.exit(1);
});
