// WinScreenController.ts
import { ScreenController } from "../../types";
import type { ScreenSwitcher } from "../../types";
import { Timer } from "../../gamestate";
import { WinScreenModel, LeaderboardEntry } from "./WinScreenModel";
import { WinScreenView } from "./WinScreenView";

const LEADERBOARD_KEY = "mathDungeonLeaderboard";
const MAX_LEADERBOARD_ENTRIES = 5;

/**
 * WinScreenController - Handles win screen interactions
 */
export class WinScreenController extends ScreenController {
  private model: WinScreenModel;
  private view: WinScreenView;
  private screenSwitcher: ScreenSwitcher;

  constructor(screenSwitcher: ScreenSwitcher) {
    super();
    this.screenSwitcher = screenSwitcher;
    this.model = new WinScreenModel();
    this.view = new WinScreenView(() => this.handleRestartClick());
  }

  /**
   * Called by game logic when the player wins.
   * Stops the timer, updates leaderboard, shows the win screen.
   */
  showWinScreen(): void {
    const elapsedSeconds = Timer.getSeconds();

    // Update model + view with final time
    this.model.setFinalTime(elapsedSeconds);
    this.view.updateFinalTime(elapsedSeconds);

    // Load and update leaderboard
    const entries = this.loadLeaderboard();
    entries.push({
      timeSeconds: elapsedSeconds,
      timestamp: new Date().toLocaleString(),
    });

    // sort ascending: smaller time = better
    entries.sort((a, b) => a.timeSeconds - b.timeSeconds);

    const top = entries.slice(0, MAX_LEADERBOARD_ENTRIES);
    this.saveLeaderboard(top);
    this.model.setLeaderboard(top);
    this.view.updateLeaderboard(top);

    this.view.show();
  }

  /**
   * Load leaderboard from localStorage
   */
  private loadLeaderboard(): LeaderboardEntry[] {
    const saved = localStorage.getItem(LEADERBOARD_KEY);
    if (saved === null) {
      return [];
    }
    try {
      const parsed = JSON.parse(saved);
      if (!Array.isArray(parsed)) return [];
      return parsed as LeaderboardEntry[];
    } catch {
      return [];
    }
  }

  /**
   * Save leaderboard to localStorage
   */
  private saveLeaderboard(entries: LeaderboardEntry[]): void {
    const jsonString = JSON.stringify(entries);
    localStorage.setItem(LEADERBOARD_KEY, jsonString);
  }

  /**
   * Handle restart button click
   */
  private handleRestartClick(): void {
    this.screenSwitcher.switchToScreen("menu");
  }

  /**
   * Get the view (for App to add its group to the Layer)
   */
  getView(): WinScreenView {
    return this.view;
  }

  hide(): void {
    this.view.hide();
  }
}

