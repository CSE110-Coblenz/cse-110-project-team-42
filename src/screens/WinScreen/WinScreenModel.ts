export type LeaderboardEntry = {
  timeSeconds: number;  
  timestamp: string;     
};

/**
 * WinScreenModel - Stores final clear time and leaderboard
 */
export class WinScreenModel {
  private finalTimeSeconds = 0;
  private leaderboard: LeaderboardEntry[] = [];

  /**
   * Set the final time (in seconds)
   */
  setFinalTime(timeSeconds: number): void {
    this.finalTimeSeconds = timeSeconds;
  }

  /**
   * Get the final time
   */
  getFinalTime(): number {
    return this.finalTimeSeconds;
  }

  /**
   * Set the leaderboard entries
   */
  setLeaderboard(entries: LeaderboardEntry[]): void {
    this.leaderboard = entries;
  }

  /**
   * Get the leaderboard entries
   */
  getLeaderboard(): LeaderboardEntry[] {
    return this.leaderboard;
  }
}
