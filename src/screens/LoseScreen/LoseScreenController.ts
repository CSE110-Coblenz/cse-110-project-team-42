import { ScreenController } from "../../types";
import type { ScreenSwitcher } from "../../types";
import { LoseScreenView } from "./LoseScreenView";

export class LoseScreenController extends ScreenController {
  private view: LoseScreenView;
  private screenSwitcher: ScreenSwitcher;

  constructor(screenSwitcher: ScreenSwitcher) {
    super();
    this.screenSwitcher = screenSwitcher;

    this.view = new LoseScreenView(() => this.handleRestart());
  }

  private handleRestart() {
    this.screenSwitcher.switchToScreen("menu");
  }

  getView(): LoseScreenView {
    return this.view;
  }
}
