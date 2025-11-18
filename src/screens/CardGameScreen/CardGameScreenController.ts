import { ScreenController } from "../../types";
import type { ScreenSwitcher, CardGameOption } from "../../types";
import { CardGameScreenModel } from "./CardGameScreenModel";
import { CardGameScreenView } from "./CardGameScreenView";

export class CardGameScreenController extends ScreenController {
  private view: CardGameScreenView;
  private model: CardGameScreenModel;

  constructor(_screenSwitcher: ScreenSwitcher) {
    super();
    this.model = new CardGameScreenModel();
    this.view = new CardGameScreenView(
      this.model.getOptions(),
      this.handleOptionClick.bind(this)
    );
  }

  private handleOptionClick(option: CardGameOption): void {
    const result = this.model.simulate(option, 1000000);
    
    // For now, let's just log the result to the console.
    // Integration with ResultsScreen will happen later.
    console.log("Simulation Result:", result);

    alert(`
      Simulation Complete for ${option.label.replace("\n", " -> ")}
      - Profit: $${result.profit.toFixed(2)}
      - Loss: $${result.loss.toFixed(2)}
      - Net Result: $${result.netResult.toFixed(2)}
      - Theoretical EV (per play): $${result.expectedValue.toFixed(2)}
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
