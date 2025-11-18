import { describe, it, expect, vi, afterEach } from "vitest";
import { CardGameScreenModel } from "../screens/CardGameScreen/CardGameScreenModel";

const model = new CardGameScreenModel();

describe("CardGameScreenModel", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("exposes card game options from configuration", () => {
    const options = model.getOptions();
    expect(options.length).toBeGreaterThan(0);
    expect(options[0]).toHaveProperty("buyIn");
  });

  it("simulateByIndex honors deterministic random outcomes", () => {
    const guaranteedWin = vi.spyOn(Math, "random").mockReturnValue(0);
    const option = model.getOptions()[0];

    const result = model.simulateByIndex(0, 5);

    expect(result.loss).toBe(0);
    expect(result.profit).toBe(option.payoff * 5);

    guaranteedWin.mockRestore();
  });
});

