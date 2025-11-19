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
export const ITERATIONS = 1000;

// Type for Graph Screen input
export interface GraphDataConfig {
  currentGame: number;
  selectedOption: number;
  simulateFns: (() => number)[];
}
