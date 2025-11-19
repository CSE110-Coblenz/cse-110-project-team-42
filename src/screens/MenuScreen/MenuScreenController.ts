import { ScreenController } from "../../types";
import type { ScreenSwitcher } from "../../types";
import { MenuScreenView } from "./MenuScreenView";

export class MenuScreenController extends ScreenController {
  private view: MenuScreenView;
  private screenSwitcher: ScreenSwitcher;

  constructor(screenSwitcher: ScreenSwitcher) {
    super();
    this.screenSwitcher = screenSwitcher;
    this.view = new MenuScreenView(() => this.handleStart());
  }

  private handleStart(): void {
    // Go to story first
    this.screenSwitcher.switchToScreen("story");
  }

  hide(): void {
    this.view.hide();
  }

  getView(): MenuScreenView {
    return this.view;
  }
}

