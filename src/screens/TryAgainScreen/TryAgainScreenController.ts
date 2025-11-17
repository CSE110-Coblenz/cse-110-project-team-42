import { ScreenController } from "../../types";
import type { ScreenSwitcher } from "../../types";
import { TryAgainScreenView } from "./TryAgainScreenView";
import { TryAgainScreenModel } from "./TryAgainScreenModel";

export class TryAgainController extends ScreenController {
  private view: TryAgainScreenView;
  private model: TryAgainScreenModel;
  private screenSwitcher: ScreenSwitcher;

  constructor(screenSwitcher: ScreenSwitcher) {
    super();
    this.screenSwitcher = screenSwitcher;

    // default placeholder
    this.model = new TryAgainScreenModel("Loading TryAgainScreen...", 0);
    this.view = new TryAgainScreenView("Loading TryAgainScreen...", 0, () => this.handleRestart());
  }

  // Inject hearts and show the screen 
  showTryAgain(message: string, hearts: number): void {
    this.view.updateMessage(message);
    this.model.updateHearts(hearts);
    this.view.updateHearts(this.model.getHearts());
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
