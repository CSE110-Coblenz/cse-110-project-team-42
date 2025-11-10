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

  getFinalValues(): number[] {
    return this.finalValues;
  }

  getSelectedOption(): number {
    return this.data.selectedOption;
  }
}

