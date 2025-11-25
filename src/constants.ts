// Stage dimensions
export const STAGE_WIDTH = 1200;
export const STAGE_HEIGHT = 700;

export const GAME1RESULTSTEXT =
	"RESULTS\n\n\n\n\
	🔴Red ➡️ {0}\n\
	🟢Green ➡️ {1}\n\
	🔵Blue ➡️ {2}\n\n\
	Your choice of green won!";

export const CARD_OPTIONS = [
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

// For simulation 
export const ITERATIONS = 10000;


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
