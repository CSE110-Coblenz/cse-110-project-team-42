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

  constructor(screenSwitcher: ScreenSwitcher) {
    super();
    this.screenSwitcher = screenSwitcher;

    // Initialize model with placeholder
    this.model = new ResultsScreenModel("Loading results...", 0);
    
    // default placeholder
    this.view = new ResultsScreenView("Loading results...", 0, () => this.handleProceed());
  }

  private handleProceed(): void {
    alert("Proceed clicked!");
    // this.screenSwitcher.switchToScreen("menu");
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
    this.view.updateHearts(this.model.getHearts());
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
    this.view.updateHearts(this.model.getHearts());
  }

  hide(): void {
    this.view.hide();
  }

  getView(): ResultsScreenView {
    return this.view;
  }
}

