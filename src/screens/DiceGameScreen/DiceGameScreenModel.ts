// src/screens/DiceGameScreen/DiceGameScreenModel.ts
import { Hearts } from "../../gamestate";
export type DiceChoiceSet = [string, string, string];

function roll3(): number[] {
  return [
    1 + Math.floor(Math.random() * 6),
    1 + Math.floor(Math.random() * 6),
    1 + Math.floor(Math.random() * 6),
  ];
}

export class DiceGameScreenModel {
  private readonly sets: DiceChoiceSet[] = [
    [
      "Roll 3 dice and you win if at least one die shows a 6.\n\n$5 Buy in → +$10 Payoff.",
      "Roll 3 dice and you win if the total sum is 14 or higher.\n\n$2 Buy in → +$20 Payoff.",
      "Roll 3 dice and you win if all three dice are even (2, 4, 6).\n\n$5 Buy in → +$30 Payoff.",
    ],

    [
      "Roll 3 dice and you win with exactly one 6.\n\n$3 Buy in → +$8 Payoff.",
      "Roll 3 dice and you win if the total is 9, 10, or 11.\n\n$3 Buy in → +$10 Payoff.",
      "Roll 3 dice and you win only with triple 6.\n$2 Buy in → +$100 Payoff.",
    ],

    [
      "Roll 3 dice and you win if all dice show different numbers.\n$3 Buy in → +$4 Payoff.",
      "Roll 3 dice and you win if the total is 15 or higher.\n\n$1 Buy in → +$20 Payoff.",
      "Roll 3 dice and you win if at least two dice are even.\n\n$3 Buy in → +$5 Payoff.",
    ],

    [
      "Roll 3 dice and you win if none of the dice show a 1.\n\n$3 Buy in → +$5 Payoff.",
      "Roll 3 dice and you win if all dice are odd (1, 3, 5).\n\n$2 Buy in → +$30 Payoff.",
      "Roll 3 dice and you win with exactly one pair.\n\n$4 Buy in → +$6 Payoff.",
    ],

    [
      "Roll 3 dice and win if no die shows a 6.\n\n$3 Buy in → +$4 Payoff.",
      "Roll 3 dice and win if the total is 10, 11, or 12.\n\n$3 Buy in → +$10 Payoff.",
      "Roll 3 dice and win if the total is 5 or lower.\n\n$3 Buy in → +$40 Payoff.",
    ],
  ];




  private currentSetIndex = 0;
  private selectedOption: number = -1;

  getSet(): DiceChoiceSet {
    this.currentSetIndex = Hearts.get();
    return [...this.sets[this.currentSetIndex]];
  }


  //----------------------------------------------------------------------
  // Very simple, readable logic for EACH set and EACH option
  // No text parsing, just hardcoded payoff formulas.
  //----------------------------------------------------------------------

  private simulate(set: number, opt: number): number {
    const dice = roll3();
    const sum = dice[0] + dice[1] + dice[2];

    switch (set) {
      case 0:
        if (opt === 0) return (dice.includes(6) ? 10 : 0) - 5;
        if (opt === 1) return (sum >= 14 ? 20 : 0) - 2;
        if (opt === 2) return (dice.every(d => d % 2 === 0) ? 30 : 0) - 5;
        break;

      case 1:
        if (opt === 0) return ((dice.filter(d => d === 6).length === 1 ? 8 : 0)) - 3;
        if (opt === 1) return ([9,10,11].includes(sum) ? 10 : 0) - 3;
        if (opt === 2) return ((dice.every(d => d === 6) ? 100 : 0)) - 2;
        break;

      case 2:
        if (opt === 0) return ((new Set(dice).size === 3 ? 4 : 0)) - 3;
        if (opt === 1) return (sum >= 15 ? 20 : 0) - 1;
        if (opt === 2) return ((dice.filter(d => d % 2 === 0).length >= 2 ? 5 : 0)) - 3;
        break;

      case 3:
        if (opt === 0) return (dice.includes(1) ? 5 : 0) - 3;
        if (opt === 1) return (dice.every(d => d % 2 === 1) ? 30 : 0) - 2;
        if (opt === 2) {
          const counts = Object.values(
            dice.reduce((a: Record<number, number>, v) => {
              a[v] = (a[v] || 0) + 1;
              return a;
            }, {})
          );
          return (counts.includes(2) ? 6 : 0) - 4;
        }
        break;

      case 4:
        if (opt === 0) return (dice.every(d => d !== 6) ? 4 : 0) - 3;
        if (opt === 1) return ([10,11,12].includes(sum) ? 10 : 0) - 3;
        if (opt === 2) return (sum <= 5 ? 40 : 0) - 3;
        break;
    }

    return 0; // fallback
  }

  // public API
  simulateOpt1(): number {
    return this.simulate(this.currentSetIndex, 0);
  }

  simulateOpt2(): number {
    return this.simulate(this.currentSetIndex, 1);
  }

  simulateOpt3(): number {
    return this.simulate(this.currentSetIndex, 2);
  }

  simulateByIndex(index: number): number {
      return this.simulate(this.currentSetIndex, index);
  }

  setSelectedOption(index: number): void {
      this.selectedOption = index;
  }

  getSelectedOption(): number {
      return this.selectedOption;
  }
}
