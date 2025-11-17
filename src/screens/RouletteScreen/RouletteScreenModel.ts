import { ROULLET_OPTIONS1, ROULLET_OPTIONS2, ROULLET_OPTIONS3 } from "../../constants";
import type { RouletteOption, SimulationResultRoullet } from "../../types";

export class RoulletGameScreenModel {
    private options: RouletteOption[];

    constructor(setNumber: 1 | 2 | 3 = 1) {
        if (setNumber === 1) this.options = ROULLET_OPTIONS1
        else if (setNumber === 2) this.options = ROULLET_OPTIONS2;
        else this.options = ROULLET_OPTIONS3; 

    }

    getOptions(): RouletteOption[] {
        return this.options;
    }

    simulate(option: RouletteOption, runs: number): SimulationResultRoullet {
        const winProbability = option.slots / option.total

        let wins = 0;

        for (let i = 0; i < runs; i++) {
            if (Math.random() < winProbability) {
                wins++;
            }
        }

        const losses = runs - wins;
        const totalPayoff = wins * option.payoff; //sum of earnings
        const totalCost = runs; //since each buy in is $1 cost is number of runs
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
