// Stage dimensions
export const STAGE_WIDTH = 1200;
export const STAGE_HEIGHT = 700;

export const GAME1RESULTSTEXT =
	"RESULTS\n\n\n\n\
	🔴Red ➡️ {0}\n\
	🟢Green ➡️ {1}\n\
	🔵Blue ➡️ {2}\n\n\
	Your choice of green won!";

// For simulation 
export const ITERATIONS = 1000;

// Type for Graph Screen input
export interface GraphDataConfig {
  currentGame: number;
  selectedOption: number;
  simulateFns: (() => number)[];
}
