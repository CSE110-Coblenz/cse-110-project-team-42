import { CARD_OPTIONS } from "../../constants";
import type { CardGameOption, SimulationResult } from "../../types";

export class CardGameScreenModel {
  private options: CardGameOption[];

  constructor() {
    this.options = CARD_OPTIONS;
  }

  getOptions(): CardGameOption[] {
    return this.options;
  }

  simulate(option: CardGameOption, runs: number): SimulationResult {
    const deckSize = 52;
    const faceCards = 12; // Jack, Queen, King for each of 4 suits
    const winProbability = faceCards / deckSize;

    let wins = 0;
    for (let i = 0; i < runs; i++) {
      if (Math.random() < winProbability) {
        wins++;
      }
    }

    const losses = runs - wins;
    const totalPayoff = wins * option.payoff;
    const totalCost = runs * option.buyIn;
    const netResult = totalPayoff - totalCost;
    const expectedValue = netResult / runs;
    const verdict = netResult >= 0 ? "worth it" : "not worth it";

    return {
      option,
      runs,
      wins,
      losses,
      netResult,
      expectedValue,
      verdict,
    };
  }
}
