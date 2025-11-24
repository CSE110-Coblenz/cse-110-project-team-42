import { ScreenController } from "../../types";
import type { ScreenSwitcher } from "../../types";
import { ResultsScreenView } from "./ResultsScreenView";
import { ResultsScreenModel } from "./ResultsScreenModel";
import type { ResultsData } from "./ResultsScreenConstants";
import { Hearts } from "../../gamestate";

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
    if (this.model.userWon()) {
      // User won - proceed to next screen (implement later)
      alert("You won!");
      // this.screenSwitcher.switchToScreen("menu");
    } else {
      // User lost - decrement hearts and go to try again screen
      Hearts.decrement();
      this.screenSwitcher.switchToScreen("tryagain");
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

