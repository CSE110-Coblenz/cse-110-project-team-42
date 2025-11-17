// Stage dimensions
export const STAGE_WIDTH = 1200;
export const STAGE_HEIGHT = 700;

// For simulation 
export const ITERATIONS = 1000;

// Type for Graph Screen input
export interface GraphDataConfig {
  currentGame: number;
  selectedOption: number;
  simulateFns: (() => number)[];
}
