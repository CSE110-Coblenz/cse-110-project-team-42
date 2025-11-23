import { ITERATIONS } from "../../constants";

export class GraphScreenModel {
  private selectedOption: number = 0;
  private history: number[][] = [];
  private finalValues: number[] = [];

  constructor() {
    // No initial simulation - will be called when screen is shown
  }

  runSimulation(selectedOption: number, simulateFn: (index: number) => number): void {
    this.selectedOption = selectedOption;
    this.history = [0, 1, 2].map(() => [0]);

    for (let i = 1; i <= ITERATIONS; i++) {
      [0, 1, 2].forEach((optionIndex) => {
        const prev = this.history[optionIndex][i - 1];
        this.history[optionIndex].push(prev + simulateFn(optionIndex));
      });
    }

    this.finalValues = this.history.map(
      (arr) => arr[arr.length - 1]
    );
  }

  getHistory(): number[][] {
    return this.history;
  }

  /**
   * Convert cumulative history into running-average profits per round for each series.
   * For each series, compute per-round profits (difference between consecutive cumulative totals)
   * and then the running average up to each round. Index 0 will be 0.
   */
  getRunningAverages(): number[][] {
    return this.history.map((history) => {
      const perRound: number[] = history.map((v, i) => (i === 0 ? 0 : v - history[i - 1]));
      const avgs: number[] = [];
      let sum = 0;
      for (let i = 0; i < perRound.length; i++) {
        if (i === 0) {
          avgs.push(0);
          continue;
        }
        sum += perRound[i];
        avgs.push(sum / i);
      }
      return avgs;
    });
  }

  getFinalValues(): number[] {
    return this.finalValues;
  }

  getSelectedOption(): number {
    return this.selectedOption;
  }
}

