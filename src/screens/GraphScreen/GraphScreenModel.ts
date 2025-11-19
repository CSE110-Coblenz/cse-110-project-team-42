import { ITERATIONS, type GraphDataConfig } from "../../constants";

export class GraphScreenModel {
  private data: GraphDataConfig;
  private history: number[][] = [];
  private finalValues: number[] = [];

  constructor(data: GraphDataConfig) {
    this.data = data;
    this.simulate();
  }

  private simulate(): void {
    const fns = this.data.simulateFns;
    this.history = fns.map(() => [0]);

    for (let i = 1; i <= ITERATIONS; i++) {
      fns.forEach((fn, idx) => {
        const prev = this.history[idx][i - 1];
        this.history[idx].push(prev + fn());
      });
    }

    this.finalValues = this.history.map(
      (arr) => arr[arr.length - 1]
    );
  }

  updateData(newData: GraphDataConfig): void {
    this.data = newData;
    this.simulate();
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
    return this.data.selectedOption;
  }
}

