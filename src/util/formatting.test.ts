import { describe, expect, it } from "vitest";
import { thousandize } from "./formatting";

describe("thousandize", () => {
  it("formats numbers for display", () => {
    expect(thousandize(1234567)).toContain("1");
  });

  it("returns '-' for nullish input", () => {
    expect(thousandize(undefined)).toBe("-");
    expect(thousandize(null)).toBe("-");
  });
});
