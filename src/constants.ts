// Stage dimensions
export const STAGE_WIDTH = 1200;
export const STAGE_HEIGHT = 700;

// ============================================================
// FONT CONSTANTS
// ============================================================
// Title font - used for main screen titles and headings
export const FONT_TITLE = "Haettenschweiler";

// Primary font - used for descriptions, rules, buttons, and general text
export const FONT_PRIMARY = "Lora";

// UI font - used for timer, scores, and other UI elements
export const FONT_UI = "'Roboto Mono', monospace";

// Font size for option buttons across minigames
export const FONT_SIZE_BUTTON = 18;

// ============================================================
// COLOR CONSTANTS
// ============================================================
// Text color for minigame screens (Roulette, CardGame, DiceGame)
export const COLOR_MINIGAME_TEXT = "#fef6dc";

export const GAME1RESULTSTEXT =
	"RESULTS\n\n\n\n\
	🔴Red ➡️ {0}\n\
	🟢Green ➡️ {1}\n\
	🔵Blue ➡️ {2}\n\n\
	Your choice of green won!";

// ROULETTE_OPTIONS1 (Easy - 3 hearts): Total 10 slots
// Red:   1/10 slots, $12 payoff → EV = 12×0.10 - 1 = +$0.20 ✓ WINNER
// Black: 3/10 slots, $3 payoff  → EV = 3×0.30 - 1 = -$0.10
// Blue:  5/10 slots, $1.80 payoff → EV = 1.8×0.50 - 1 = -$0.10
export const ROULETTE_OPTIONS1 = [
  { 
    id: "r1_opt1", 
    label: "$12 Payoff", 
    buyIn: 1, 
    payoff: 12, 
    slots: 2, 
    total: 10, 
    color: "Red"
  },
  { 
    id: "r1_opt2", 
    label: "$3 Payoff", 
    buyIn: 1, 
    payoff: 3, 
    slots: 3, 
    total: 10, 
    color: "Black"
  },
  { 
    id: "r1_opt3", 
    label: "$1.80 Payoff", 
    buyIn: 1, 
    payoff: 1.8, 
    slots: 5, 
    total: 10, 
    color: "Blue"
  },
];

// ROULETTE_OPTIONS2 (Medium - 2 hearts): Total 12 slots
// Yellow: 4/12 slots, $2.50 payoff → EV = 2.5×0.333 - 1 = -$0.17
// Blue:   2/12 slots, $7 payoff   → EV = 7×0.167 - 1 = +$0.17 ✓ WINNER
// Green:  6/12 slots, $1.50 payoff → EV = 1.5×0.50 - 1 = -$0.25
export const ROULETTE_OPTIONS2 = [
  {
    id: "r2_opt1",
    label: "$2.50 Payoff",
    buyIn: 1,
    payoff: 2.5,
    slots: 4,
    total: 12,
    color: "Yellow"
  },
  {
    id: "r2_opt2",
    label: "$7 Payoff",
    buyIn: 1,
    payoff: 7,
    slots: 2,
    total: 12,
    color: "Blue"
  },
  {
    id: "r2_opt3",
    label: "$1.50 Payoff",
    buyIn: 1,
    payoff: 1.5,
    slots: 6,
    total: 12,
    color: "Green"
  }
];

// ROULETTE_OPTIONS3 (Hard - 1 heart): Total 8 slots
// Orange: 1/8 slots, $10 payoff   → EV = 10×0.125 - 1 = +$0.25 ✓ WINNER
// Green:  3/8 slots, $2.50 payoff → EV = 2.5×0.375 - 1 = -$0.06 (close!)
// Red:    4/8 slots, $2 payoff    → EV = 2×0.50 - 1 = $0.00 (break-even trap)
export const ROULETTE_OPTIONS3 = [
  {
    id: "r3_opt1",
    label: "$10 Payoff",
    buyIn: 1,
    payoff: 10,
    slots: 1,
    total: 8,
    color: "Orange"
  },
  {
    id: "r3_opt2",
    label: "$2.50 Payoff",
    buyIn: 1,
    payoff: 2.5,
    slots: 3,
    total: 8,
    color: "Green"
  },
  {
    id: "r3_opt3",
    label: "$2 Payoff",
    buyIn: 1,
    payoff: 2,
    slots: 4,
    total: 8,
    color: "Red"
  }
];

// 3 Hearts (Easy Mode)
// Opt 1: EV = (25-10)*(10/30) - 10*(20/30) = 5 - 6.66 = -1.66
// Opt 2: EV = (20-5)*(12/52) - 5*(40/52) = 3.46 - 3.84 = -0.38
// Opt 3: EV = (70-10)*(8/52) - 10*(44/52) = 9.23 - 8.46 = +0.77 (Best)
export const CARD_OPTIONS1 = [
  { 
    id: "opt1", 
    label: "Small Deck (30 Cards)\n10 Face Cards\n$10 Buy-in → +$25 Payoff", 
    buyIn: 10, 
    payoff: 25, 
    faceCards: 10, 
    deckSize: 30 
  },
  { 
    id: "opt2", 
    label: "Standard Deck (52 Cards)\n12 Face Cards\n$5 Buy-in → +$20 Payoff", 
    buyIn: 5, 
    payoff: 20, 
    faceCards: 12, 
    deckSize: 52 
  },
  { 
    id: "opt3", 
    label: "Stacked Deck (52 Cards)\n8 Face Cards\n$10 Buy-in → +$70 Payoff", 
    buyIn: 10, 
    payoff: 70, 
    faceCards: 8, 
    deckSize: 52 
  },
];

// 2 Hearts (Medium Mode)
// Opt 1: EV = (18-5)*(5/20) - 5*(15/20) = 3.25 - 3.75 = -0.5
// Opt 2: EV = (22-5)*(13/52) - 5*(39/52) = 4.25 - 3.75 = +0.5 (Best)
// Opt 3: EV = (20-2)*(5/50) - 2*(45/50) = 1.8 - 1.8 = 0
export const CARD_OPTIONS2 = [
  { 
    id: "opt2_1", 
    label: "Small Deck (20 Cards)\n5 Face Cards\n$5 Buy-in → +$18 Payoff", 
    buyIn: 5, 
    payoff: 18, 
    faceCards: 5, 
    deckSize: 20 
  },
  { 
    id: "opt2_2", 
    label: "Standard Deck (52 Cards)\n13 Hearts\n$5 Buy-in → +$22 Payoff", 
    buyIn: 5, 
    payoff: 22, 
    faceCards: 13, 
    deckSize: 52 
  },
  { 
    id: "opt2_3", 
    label: "Stacked Deck (50 Cards)\n5 Face Cards\n$2 Buy-in → +$20 Payoff", 
    buyIn: 2, 
    payoff: 20, 
    faceCards: 5, 
    deckSize: 50 
  },
];

// 1 Heart (Hard Mode)
// Opt 1: EV = (110-10)*(1/10) - 10*(9/10) = 10 - 9 = +1.0 (Best)
// Opt 2: EV = (15-5)*(16/52) - 5*(36/52) = 3.07 - 3.46 = -0.38
// Opt 3: EV = (38-20)*(20/40) - 20*(20/40) = 9 - 10 = -1.0
export const CARD_OPTIONS3 = [
  { 
    id: "opt3_1", 
    label: "Small Deck (10 Cards)\n1 Face Card\n$10 Buy-in → +$110 Payoff", 
    buyIn: 10, 
    payoff: 110, 
    faceCards: 1, 
    deckSize: 10 
  },
  { 
    id: "opt3_2", 
    label: "Standard Deck (52 Cards)\n16 Face Cards\n$5 Buy-in → +$15 Payoff", 
    buyIn: 5, 
    payoff: 15, 
    faceCards: 16, 
    deckSize: 52 
  },
  { 
    id: "opt3_3", 
    label: "Stacked Deck (40 Cards)\n20 Face Cards\n$20 Buy-in → +$38 Payoff", 
    buyIn: 20, 
    payoff: 38, 
    faceCards: 20, 
    deckSize: 40 
  },
];

// For simulation 
export const ITERATIONS = 10000;

// Graph line colors for the three options
export const OPTIONS_COLORS = ["#CC3333", "#2F7A2F", "#3333CC"];

export const GAME1HINTMESSAGE =
  "Hint: Only ONE of these choices is actually good for you in the long run.\n\
For each option:\n\
- The buy-in is the cost of playing. You have no choice but to play the game.\n\
- The payoff is what you get only if you hit a winning slot.\n\
- The '# slots of your chosen color / total slots' tells you the chance to win.\n\n\
Remember how we calculate the expected return for each option:\n\
EV(profit per round) = Profit_win * Win_chance - Profit_loss * Loss_chance";

export const GAME2HINTMESSAGE =
  "Hint: Your goal is to draw a face card.\n\
Look at:\n\
- How many face cards are in the deck compared to the total number of cards\n\
- The buy-in cost\n\
- The payoff if you hit a face card\n\n\
Remember how we calculate the expected return for each option:\n\
EV(profit per round) = Profit_win * Win_chance - Profit_loss * Loss_chance";

export const GAME3HINTMESSAGE =
  "Hint: Every dice choice trades entry cost for a chance at a prize.\n\
Focus on three things:\n\
- How hard the condition is (for example, 'triple 6' vs 'sum ≥ 14').\n\
- How often that condition is likely to happen when rolling 3 dice.\n\
- How big the payoff is when it happens.\n\n\
A huge prize with a tiny chance can be worse than a smaller prize that happens much more often.\n\
Think about which condition will pay you the most on average for the entry fee you pay.";

export const HINT_BY_LEVEL: Record<number, string> = {
  1: GAME1HINTMESSAGE,
  2: GAME2HINTMESSAGE,
  3: GAME3HINTMESSAGE,
};
