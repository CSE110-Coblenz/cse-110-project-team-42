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

  it("simulateByIndex runs simulation once and returns payoff on win", () => {
    // Force Math.random to always return 0 so the simulation wins
    vi.spyOn(Math, "random").mockReturnValue(0);

    const option = model.getOptions()[0];
    const result = model.simulateByIndex(0);

    // Should return the payoff since we won
    expect(result).toBe(option.payoff - option.buyIn);
  });

  it("simulateByIndex runs simulation once and returns negative buyIn on loss", () => {
    // Force Math.random to always return 1 so the simulation loses
    vi.spyOn(Math, "random").mockReturnValue(1);

    const option = model.getOptions()[0];
    const result = model.simulateByIndex(0);

    // Should return negative buyIn since we lost
    expect(result).toBe(-option.buyIn);
  });

  it("selected option tracking works correctly", () => {
    expect(model.getSelectedOption()).toBe(-1); // Initial value
    
    model.setSelectedOption(1);
    expect(model.getSelectedOption()).toBe(1);
    
    model.setSelectedOption(2);
    expect(model.getSelectedOption()).toBe(2);
  });
});

