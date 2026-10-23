import { describe, expect, it } from "vitest";
import { formatAmount, thousandize } from "./formatting";

describe("thousandize", () => {
  it("formats numbers for display", () => {
    expect(thousandize(1234567)).toContain("1");
  });

  it("returns '-' for nullish input", () => {
    expect(thousandize(undefined)).toBe("-");
    expect(thousandize(null)).toBe("-");
  });
});

describe("formatAmount", () => {
  // nb-NO uses a non-breaking space as thousands separator and comma as decimal separator
  const normalize = (value: string) => value.replace(/\s/g, " ");

  it("always shows exactly two decimals", () => {
    expect(normalize(formatAmount(1500))).toBe("1 500,00");
    expect(normalize(formatAmount(1234.5))).toBe("1 234,50");
    expect(normalize(formatAmount(0))).toBe("0,00");
  });

  it("rounds to two decimals", () => {
    expect(normalize(formatAmount(1234.567))).toBe("1 234,57");
    expect(normalize(formatAmount(0.004))).toBe("0,00");
  });

  it("returns '-' for nullish input", () => {
    expect(formatAmount(undefined)).toBe("-");
    expect(formatAmount(null)).toBe("-");
  });
});
