import { ScreenController } from "../../types";
import type { ScreenSwitcher } from "../../types";
import { ResultsScreenView } from "./ResultsScreenView";
import { ResultsScreenModel } from "./ResultsScreenModel";
import type { ResultsData } from "./ResultsScreenConstants";
import { Hearts, currentLevel, setCurrentLevel } from "../../gamestate";

export class ResultsScreenController extends ScreenController {
  private view: ResultsScreenView;
  private model: ResultsScreenModel;
  private screenSwitcher: ScreenSwitcher;

  constructor(_screenSwitcher: ScreenSwitcher) {
    super();
    this.screenSwitcher = _screenSwitcher;

    // Initialize model with placeholder
    this.model = new ResultsScreenModel("Loading results...", 0);
    
    // default placeholder
    this.view = new ResultsScreenView("Loading results...", () => this.handleProceed());
  }

  private handleProceed(): void {
    if (this.model.didPlayerWin()) {
      // --- Player Won ---
      if (currentLevel === 1) { // Finished Roulette
        setCurrentLevel(2);
        this.screenSwitcher.switchToScreen("cardGame");
      } else if (currentLevel === 2) { // Finished Card Game
        setCurrentLevel(3);
        this.screenSwitcher.switchToScreen("diceGame");
      } else if (currentLevel === 3) { // Finished Dice Game
        this.screenSwitcher.switchToScreen("win");
      } else {
        // Fallback for any other state
        alert("No more levels");
        //this.screenSwitcher.switchToScreen("lose");
      }
    } else {
      // --- Player Lost ---
      Hearts.decrement(); // Use the correct method name

      if (Hearts.get() > 0) {
        // The TryAgainScreen will handle routing back to the correct minigame
        this.screenSwitcher.switchToScreen("tryagain");
      } else {
        // Note: A 'lose' screen needs to be created and handled in main.ts
        this.screenSwitcher.switchToScreen("cardGame");
      }
    }
  }

  /**
   * Show results with structured data.
   * The model will format the message based on current game from Hearts.
   */
  showResults(data: ResultsData): void {
    const hearts = Hearts.get();
    this.model.setResultsData(data);
    this.model.setHearts(hearts);
    
    this.view.updateMessage(this.model.getMessage());
    this.view.updateHearts();
    this.view.show(); 
  }

  /**
   * Update the results data and view but do not show the view.
   * This allows the previous screen to prepare the results before switching.
   */
  updateResults(data: ResultsData): void {
    const hearts = Hearts.get();
    this.model.setResultsData(data);
    this.model.setHearts(hearts);

    this.view.updateMessage(this.model.getMessage());
    this.view.updateHearts();
  }

  hide(): void {
    this.view.hide();
  }

  getView(): ResultsScreenView {
    return this.view;
  }
}

