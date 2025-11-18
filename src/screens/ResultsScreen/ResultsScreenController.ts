import { ScreenController } from "../../types";
import type { ScreenSwitcher } from "../../types";
import { ResultsScreenView } from "./ResultsScreenView";

export class ResultsScreenController extends ScreenController {
  private view: ResultsScreenView;

  constructor(_screenSwitcher: ScreenSwitcher) {
    super();

    // default placeholder
    this.view = new ResultsScreenView("Loading results...", 0, () => this.handleProceed());
  }

  private handleProceed(): void {
    alert("Proceed clicked!");
    // this.screenSwitcher.switchToScreen("menu");
  }

  showResults(message: string, hearts: number): void {
    this.view.updateMessage(message);
    this.view.updateHearts(hearts);
    this.view.show(); 
  }

  hide(): void {
    this.view.hide();
  }

  getView(): ResultsScreenView {
    return this.view;
  }
}

