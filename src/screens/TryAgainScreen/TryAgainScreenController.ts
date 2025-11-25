import { ScreenController } from "../../types";
import type { ScreenSwitcher } from "../../types";
import { TryAgainScreenView } from "./TryAgainScreenView";
import { TryAgainScreenModel } from "./TryAgainScreenModel";
import { currentLevel } from "../../gamestate";
import { HINT_BY_LEVEL } from "../../constants";

export class TryAgainController extends ScreenController {
  private view: TryAgainScreenView;
  private model: TryAgainScreenModel;
  private screenSwitcher: ScreenSwitcher;

  constructor(screenSwitcher: ScreenSwitcher) {
    super();
    this.screenSwitcher = screenSwitcher;

    // default placeholder
    this.model = new TryAgainScreenModel("Loading TryAgainScreen...");
    this.view = new TryAgainScreenView("Hint message will be displayed here", () => this.handleRestart());
  }

  showTryAgain(): void {
    const hint = 
       HINT_BY_LEVEL[currentLevel] ?? "Hint not assigned correctly"
    this.model.updateMessage(hint);
    this.view.updateMessage(this.model.getMessage());
    this.view.show();
  }

  hide(): void {
    this.view.hide();
  }

  getView(): TryAgainScreenView {
    return this.view;
  }

  private handleRestart(): void { 
    // Restart the current level
    if (currentLevel === 1) {
      // Game 1: Roulette
      this.screenSwitcher.switchToScreen("roulette");
    } else if (currentLevel === 2) {
      // Game 2: Card Game
      this.screenSwitcher.switchToScreen("cardGame");
    } else if (currentLevel === 3) {
      // Game 3: Dice Game
      this.screenSwitcher.switchToScreen("diceGame");
    } else {
      // Default fallback
      this.screenSwitcher.switchToScreen("roulette");
    }
  }
}
