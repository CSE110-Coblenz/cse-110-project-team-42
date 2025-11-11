import { ScreenController } from "../../types.ts";
import { DiceGameScreenModel } from "./DiceGameScreenModel.ts";
import { DiceGameScreenView } from "./DiceGameScreenView.ts";

/**
 * Minimal controller: no calculations.
 * Shows/hides the view; buttons handle their own color changes in the View.
 */
export class DiceGameScreenController extends ScreenController {
  private model: DiceGameScreenModel;
  private view: DiceGameScreenView;

  constructor() {
    super();
    this.model = new DiceGameScreenModel();
    this.view = new DiceGameScreenView();
  }
/* 
  this.view = new DiceGameScreenView(
      () => this.handleAClick(),
      () => this.handleBClick()
    );
  }

  // when A clicked → show DiceExplainScreen 
  private handleAClick(): void {
    this.screenSwitcher.switchToScreen({ type: "diceExplain" });
  }

  // when B clicked → do nothing 
  private handleBClick(): void {
    // intentionally blank
  }
  */

  start(): void {
    this.model.reset(); // no-op
    this.view.show();
  }

  getView(): DiceGameScreenView {
    return this.view;
  }
}
