import { ScreenController } from "../../types";
import type { ScreenSwitcher } from "../../types";
import { TryAgainScreenView } from "./TryAgainScreenView";
import { TryAgainScreenModel } from "./TryAgainScreenModel";
import { currentLevel } from "../../gamestate";
import { HINT_BY_LEVEL } from "../../constants";

export class TryAgainController extends ScreenController {
  private view: TryAgainScreenView;
  private model: TryAgainScreenModel;

  constructor(_screenSwitcher: ScreenSwitcher) {
    super();

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
    alert("Restart clicked!");
  }
}
