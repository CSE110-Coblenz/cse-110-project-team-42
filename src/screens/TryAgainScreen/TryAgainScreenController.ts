import { ScreenController } from "../../types";
import type { ScreenSwitcher } from "../../types";
import { TryAgainScreenView } from "./TryAgainScreenView";
import { TryAgainScreenModel } from "./TryAgainScreenModel";
import { currentLevel } from "../../gamestate";

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

  // Inject hearts and show the screen 
  showTryAgain(message: string): void {
    this.model.updateMessage(message);
    this.view.updateMessage(this.model.getMessage());
    this.view.refreshHearts();
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
