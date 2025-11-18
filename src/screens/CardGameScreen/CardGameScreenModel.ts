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

  /** Core simulation for a single option. */
  simulate(option: CardGameOption, runs: number): SimulationResult {
    const { faceCards, deckSize } = option;
    const winProbability = faceCards / deckSize;

    let wins = 0;
    for (let i = 0; i < runs; i++) {
      if (Math.random() < winProbability) {
        wins++;
      }
    }

    const losses = runs - wins;
    const totalPayoff = wins * option.payoff;
    const totalCost = losses * option.buyIn;
    const netResult = totalPayoff - totalCost;
    const expectedValue =
      winProbability * option.payoff - (1 - winProbability) * option.buyIn;

    return {
      option,
      runs,
      profit: totalPayoff,
      loss: totalCost,
      netResult,
      expectedValue,
    };
  }

  /** Index-based helper, roughly analogous to “simulateOp1/2/3”. */
  simulateByIndex(index: number, runs: number): SimulationResult {
    const opt = this.options[index];
    if (!opt) {
      throw new Error(`No card game option at index ${index}`);
    }
    return this.simulate(opt, runs);
  }
}
