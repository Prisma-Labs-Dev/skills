import { describe, expect, test } from "vitest";

describe("motion docs generation contract", () => {
  test("source manifest exists for generated Motion resources", async () => {
    const manifest = await import("../sources/motion/resources.json");
    expect(Array.isArray(manifest.default.resources)).toBe(true);
    expect(manifest.default.resources.length).toBeGreaterThanOrEqual(5);
  });
});
