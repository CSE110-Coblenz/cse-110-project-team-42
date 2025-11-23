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
      "Choice A:\nRoll 3 dice — any 6 pays $10.\nEntry $5.",
      "Choice B:\nRoll 3 dice — sum ≥ 14 pays $20.\nEntry $2.",
      "Choice C:\nRoll 3 dice — all even pays $30.\nEntry $5.",
    ],
    [
      "Choice A:\nRoll 3 dice — exactly one 6 pays $8.\nEntry $3.",
      "Choice B:\nRoll 3 dice — sum = 9, 10 or 11 pays $10.\nEntry $3.",
      "Choice C:\nRoll 3 dice — triple 6 pays $100.\nEntry $2.",
    ],
    [
      "Choice A:\nRoll 3 dice — all different pays $4.\nEntry $3.",
      "Choice B:\nRoll 3 dice — sum ≥ 15 pays $20.\nEntry $1.",
      "Choice C:\nRoll 3 dice — at least two even pays $5.\nEntry $3.",
    ],
    [
      "Choice A:\nRoll 3 dice — any 1 pays $5.\nEntry $3.",
      "Choice B:\nRoll 3 dice — all odd pays $30.\nEntry $2.",
      "Choice C:\nRoll 3 dice — exactly a pair pays $6.\nEntry $4.",
    ],
    [
      "Choice A:\nRoll 3 dice — no 6 pays $4.\nEntry $3.",
      "Choice B:\nRoll 3 dice — sum = 10, 11 or 12 pays $10.\nEntry $3.",
      "Choice C:\nRoll 3 dice — sum ≤ 5 pays $40.\nEntry $3.",
    ],
  ];

  private currentSetIndex = 0;
  /*
  getRandomSet(): DiceChoiceSet {
    this.currentSetIndex = Math.floor(Math.random() * this.sets.length);
    return [...this.sets[this.currentSetIndex]];
  }
  */
  getSet(): DiceChoiceSet {
    this.currentSetIndex = Hearts.heartsCount;
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
}
