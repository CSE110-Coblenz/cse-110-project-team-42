import { ScreenController } from "../../types";
import type { ScreenSwitcher } from "../../types";
import { StoryScreenView } from "./StoryScreenView";
import { Timer } from "../../gamestate";

export class StoryScreenController extends ScreenController {
  private view: StoryScreenView;
  private screenSwitcher: ScreenSwitcher;

  constructor(screenSwitcher: ScreenSwitcher) {
    super();
    this.screenSwitcher = screenSwitcher;
    this.view = new StoryScreenView(() => this.handleContinue());
  }

  private handleContinue(): void {
    this.screenSwitcher.switchToScreen("roulette");
    Timer.reset();
    Timer.start(); // Start the timer when this screen is created

  }

  hide(): void {
    this.view.hide();
  }

  getView(): StoryScreenView {
    return this.view;
  }
}

