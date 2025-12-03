import { CARD_OPTIONS1, CARD_OPTIONS2, CARD_OPTIONS3} from "../../constants";
import type { CardGameOption} from "../../types";
import { Hearts } from "../../gamestate";

export class CardGameScreenModel {
  private selectedOption: number = -1;

  constructor() {
    // No static initialization needed
  }

  getOptions(): CardGameOption[] {
    const lives = Hearts.get();
    if (lives === 3) return CARD_OPTIONS1;
    if (lives === 2) return CARD_OPTIONS2;
    // Fallback or level 3 (hardest)
    return CARD_OPTIONS3;
  }

  /** Core simulation for a single option. Returns net profit/loss from one play. */
  simulate(option: CardGameOption): number {
    const { faceCards, deckSize, payoff, buyIn } = option;
    const winProbability = faceCards / deckSize;

    // Run simulation once
    const won = Math.random() < winProbability;
    
    if (won) {
      return payoff - buyIn;
    } else {
      return -buyIn;
    }
  }

  /** Index-based helper. Returns net profit/loss for the given option. */
  simulateByIndex(index: number): number {
    const options = this.getOptions();
    const opt = options[index];
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
