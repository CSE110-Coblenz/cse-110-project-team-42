/// <reference types="vitest" />

import { describe, it, expect, vi, afterEach } from "vitest";
import { CardGameScreenModel } from "../screens/CardGameScreen/CardGameScreenModel";

describe("CardGameScreenModel", () => {
  const model = new CardGameScreenModel();

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns the configured options", () => {
    const options = model.getOptions();
    expect(Array.isArray(options)).toBe(true);
    expect(options.length).toBeGreaterThan(0);
  });

  it("simulateByIndex respects deterministic random outcomes", () => {
    // Force Math.random to always return 0 so every run is a win
    vi.spyOn(Math, "random").mockReturnValue(0);

    const option = model.getOptions()[0];
    const result = model.simulateByIndex(0, 5);

    expect(result.loss).toBe(0);
    expect(result.profit).toBe(option.payoff * 5);
  });
});

