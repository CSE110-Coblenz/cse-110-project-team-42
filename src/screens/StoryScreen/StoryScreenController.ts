import { ScreenController } from "../../types";
import type { ScreenSwitcher } from "../../types";
import { StoryScreenView } from "./StoryScreenView";

export class StoryScreenController extends ScreenController {
  private view: StoryScreenView;
  private screenSwitcher: ScreenSwitcher;

  constructor(screenSwitcher: ScreenSwitcher) {
    super();
    this.screenSwitcher = screenSwitcher;
    this.view = new StoryScreenView(() => this.handleContinue());
  }

  private handleContinue(): void {
    this.screenSwitcher.switchToScreen("cardGame");
  }

  hide(): void {
    this.view.hide();
  }

  getView(): StoryScreenView {
    return this.view;
  }
}

