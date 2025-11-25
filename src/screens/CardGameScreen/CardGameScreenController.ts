import { ScreenController } from "../../types";
import type { ScreenSwitcher, CardGameOption } from "../../types";
import { CardGameScreenModel } from "./CardGameScreenModel";
import { CardGameScreenView } from "./CardGameScreenView";

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
      this.handleOptionClick.bind(this)
    );
  }

  private handleOptionClick(option: CardGameOption): void {
    // Find the index of the selected option
    const index = this.model.getOptions().findIndex(opt => opt.id === option.id);
    
    // Store the selection in the model
    this.model.setSelectedOption(index);
    
    // Switch to graph screen
    this.screenSwitcher.switchToScreen("graph");
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
