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

export const ROULETTE_OPTIONS1 = [
  { 
    id: "r1_opt1", 
    label: "$1 Buy in\n+$10 Payoff", 
    buyIn: 1, 
    payoff: 10, 
    slots: 1, 
    total: 10, 
	color: "Red"
  },
  { 
    id: "r1_opt2", 
    label: "$1 Buy in\n+$2 Payoff", 
    buyIn: 1, 
    payoff: 2, 
    slots: 3, 
    total: 10, 
	color: "Black"
  },
  { 
    id: "r1_opt3", 
    label: "$1 Buy in\n+$0.5 Payoff", 
    buyIn: 1, 
    payoff: 0.5, 
    slots: 6, 
    total: 10, 
	color: "Blue"
  },
];


export const ROULETTE_OPTIONS2 = [
  {
    id: "r2_opt1",
    label: "$1 Buy in\n+$1.5 Payoff",
    buyIn: 1,
    payoff: 1.5,
    slots: 4,
    total: 12,
    color: "Yellow"
  },
  {
    id: "r2_opt2",
    label: "$1 Buy in\n+$6 Payoff",
    buyIn: 1,
    payoff: 6,
    slots: 2,
    total: 12,
    color: "Blue"
  },
  {
    id: "r2_opt3",
    label: "$1 Buy in\n+$0.5 Payoff",
    buyIn: 1,
    payoff: 0.5,
    slots: 6,
    total: 12,
    color: "Brown"
  }
];

export const ROULETTE_OPTIONS3 = [
  {
    id: "r3_opt1",
    label: "$1 Buy in\n+$8 Payoff",
    buyIn: 1,
    payoff: 8,
    slots: 1,
    total: 8,
    color: "Orange"
  },
  {
    id: "r3_opt2",
    label: "$1 Buy in\n+$1.5 Payoff",
    buyIn: 1,
    payoff: 1.5,
    slots: 3,
    total: 8,
    color: "Green"
  },
  {
    id: "r3_opt3",
    label: "$1 Buy in\n+$0.6 Payoff",
    buyIn: 1,
    payoff: 0.6,
    slots: 4,
    total: 8,
    color: "REd"
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
- The buy-in is what you always pay.\n\
- The payoff is what you get only if you hit a winning slot.\n\
- The 'slots / total' tells you the chance to win.\n\n\
Try to pick the option where:\n\
(chance to win x payoff) is bigger than the buy-in.";

export const GAME2HINTMESSAGE =
  "Hint: Your goal is to draw a face card.\n\
Look at:\n\
- How many face cards are in the deck (your chance)\n\
- The buy-in cost\n\
- The payoff if you hit\n\n\
The best choice is the one where:\n\
(chance x payoff) is greater than the buy-in.";

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
