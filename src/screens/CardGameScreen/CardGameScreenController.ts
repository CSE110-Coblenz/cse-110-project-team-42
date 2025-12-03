import { ScreenController } from "../../types";
import type { ScreenSwitcher } from "../../types";
import { CardGameScreenModel } from "./CardGameScreenModel";
import { CardGameScreenView } from "./CardGameScreenView";
import { Timer } from "../../gamestate";

export class CardGameScreenController extends ScreenController {
  private view: CardGameScreenView;
  private model: CardGameScreenModel;
  private screenSwitcher: ScreenSwitcher;

  constructor(screenSwitcher: ScreenSwitcher) {
    super();
    this.screenSwitcher = screenSwitcher;
    this.model = new CardGameScreenModel();
    this.view = new CardGameScreenView(
      this.model.getOptions(),
      (index) => this.handleOptionClick(index)
    );
  }

  // Called when the screen is shown
  show(): void {
      // Refresh options from the model in case game state (hearts) has changed
      const currentOptions = this.model.getOptions();
      this.view.updateOptions(currentOptions);
      this.view.show();
  }

  private handleOptionClick(index: number): void {
    // Store the selection in the model
    this.model.setSelectedOption(index);
    
    // Switch to graph screen
    this.screenSwitcher.switchToScreen("graph");
    Timer.stop(); //pauses timer while in graph/results/tryagain screens
  }

  getModel(): CardGameScreenModel {
    return this.model;
  }

  hide(): void {
    this.view.hide();
  }

  getView(): CardGameScreenView {
    return this.view;
  }
}
