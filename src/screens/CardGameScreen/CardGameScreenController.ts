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
    const result = this.model.simulate(option, 1000);
    
    // For now, let's just log the result to the console.
    // Integration with ResultsScreen will happen later.
    console.log("Simulation Result:", result);

    alert(`
      Simulation Complete for ${option.label.replace("\n", " -> ")}
      - Wins: ${result.wins}
      - Losses: ${result.losses}
      - Net Result: $${result.netResult.toFixed(2)}
      - Verdict: ${result.verdict}
    `);

    // Here you would switch to the results screen, passing the result data.
    // e.g., this.screenSwitcher.switchToScreen("results", result);
  }

  hide(): void {
    this.view.hide();
  }

  getView(): CardGameScreenView {
    return this.view;
  }
}
