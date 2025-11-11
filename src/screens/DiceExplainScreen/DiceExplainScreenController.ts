import { ScreenController } from "../../types";
import type { ScreenSwitcher } from "../../types";
import { DiceExplainScreenView } from "./DiceExplainScreenView";



export class DiceExplainScreenController extends ScreenController {
  private view: DiceExplainScreenView;
  private screenSwitcher: ScreenSwitcher;

  constructor(screenSwitcher: ScreenSwitcher) {
    super();
    this.screenSwitcher = screenSwitcher;
    this.view = new DiceExplainScreenView(); // no callback needed
  }

  getView(): DiceExplainScreenView {
    return this.view;
  }
}
