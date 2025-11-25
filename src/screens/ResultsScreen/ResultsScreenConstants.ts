/**
 * Data structure for passing results information from GraphScreen to ResultsScreen
 */
export interface ResultsData {
  profits: [number, number, number]; // [red, green, blue]
  selectedOption: number; // 0=red, 1=green, 2=blue
}

/**
 * Results text templates for different games.
 * Use {0}, {1}, {2} for red/green/blue profits, and the screen will add the winner message.
 */
export const RESULTS_TEMPLATES: { [key: number]: string } = {
  1: "RESULTS\n\n\n\n\
\t🔴 Red ➡️ {0}\n\
\t🟢 Green ➡️ {1}\n\
\t🔵 Blue ➡️ {2}\n\n\
\t{winnerMessage}",
  
  2: "GAME 2 RESULTS\n\n\n\n\
\t🔴Option A ➡️ {0}\n\
\t🟢Option B ➡️ {1}\n\
\t🔵Option C ➡️ {2}\n\n\
\t{winnerMessage}",
  
  // Add more game templates as needed
};
