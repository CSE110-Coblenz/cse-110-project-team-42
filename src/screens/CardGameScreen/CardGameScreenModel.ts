import { CARD_OPTIONS, ITERATIONS } from "../../constants";
import type { CardGameOption, SimulationResult } from "../../types";

export class CardGameScreenModel {
  private options: CardGameOption[];
  private selectedOption: number = -1;

  constructor() {
    this.options = CARD_OPTIONS;
  }

  getOptions(): CardGameOption[] {
    return this.options;
  }

  /** Core simulation for a single option. Returns net profit/loss from one play. */
  simulate(option: CardGameOption): number {
    const { faceCards, deckSize, payoff, buyIn } = option;
    const winProbability = faceCards / deckSize;

    // Run simulation once
    const won = Math.random() < winProbability;
    
    if (won) {
      return payoff;
    } else {
      return -buyIn;
    }
  }

  /** Index-based helper. Returns net profit/loss for the given option. */
  simulateByIndex(index: number): number {
    const opt = this.options[index];
    if (!opt) {
      throw new Error(`No card game option at index ${index}`);
    }
    return this.simulate(opt);
  }

  /** Set the user's selected option by index */
  setSelectedOption(index: number): void {
    this.selectedOption = index;
  }

  /** Get the user's selected option index */
  getSelectedOption(): number {
    return this.selectedOption;
  }
}
