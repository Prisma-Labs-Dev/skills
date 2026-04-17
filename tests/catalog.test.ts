import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, test } from "vitest";
import { loadCatalog, planInstall, validateRepo } from "../src/catalog.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

describe("catalog", () => {
  test("loads the bootstrap catalog", () => {
    const catalog = loadCatalog(root);

    expect(catalog.sources.length).toBeGreaterThan(0);
    expect(catalog.skills.find((entry) => entry.id === "motion")).toBeDefined();
    expect(
      catalog.skills.find((entry) => entry.id === "ui-animation-direction"),
    ).toBeDefined();
  });

  test("plans local install commands for the motion fork", () => {
    const catalog = loadCatalog(root);
    const plan = planInstall(catalog, root, "motion", {
      agents: ["codex"],
      global: false,
      copy: false,
    });

    expect(plan.commands).toHaveLength(1);
    expect(plan.commands[0]?.source).toBe(path.join(root, "skills/motion"));
    expect(plan.commands[0]?.args).toContain("codex");
  });

  test("expands collections into their member skills", () => {
    const catalog = loadCatalog(root);
    const plan = planInstall(catalog, root, "apple-design", {
      agents: [],
      global: false,
      copy: false,
    });

    expect(plan.expandedSkills.map((skill) => skill.id)).toEqual([
      "ios-dev",
      "hig",
      "ios-design-consultant",
      "ios-ui-craft",
    ]);
  });

  test("motion-polish includes library docs and direction guidance", () => {
    const catalog = loadCatalog(root);
    const plan = planInstall(catalog, root, "motion-polish", {
      agents: [],
      global: false,
      copy: false,
    });

    expect(plan.expandedSkills.map((skill) => skill.id)).toEqual([
      "motion",
      "ui-animation-direction",
    ]);
  });

  test("validates repo invariants", () => {
    expect(validateRepo(root).ok).toBe(true);
  });
});
