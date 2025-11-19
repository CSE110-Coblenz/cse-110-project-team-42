import type { ScreenSwitcher } from "../../types";
import { GraphScreenModel } from "./GraphScreenModel";
import { GraphScreenView } from "./GraphScreenView";
import type { GraphDataConfig } from "../../constants";
import type { ResultsData } from "../ResultsScreen/ResultsScreenConstants";

export class GraphScreenController {
  private switcher: ScreenSwitcher;
  private model: GraphScreenModel;
  private view: GraphScreenView;

  constructor(switcher: ScreenSwitcher, data: GraphDataConfig) {
    this.switcher = switcher;
    this.model = new GraphScreenModel(data);
    this.view = new GraphScreenView(() => this.handleNext());
    this.view.updateGraph(this.model.getRunningAverages());
  }

  private handleNext(): void {
    const selectedOption = this.model.getSelectedOption();

    // Prefer end-of-simulation running-average profits when available
    const running = this.model.getRunningAverages();
    let profits: [number, number, number];
    if (running && running.length >= 3 && running[0].length > 0) {
      profits = [
        running[0][running[0].length - 1],
        running[1][running[1].length - 1],
        running[2][running[2].length - 1],
      ];
    } else {
      const finalValues = this.model.getFinalValues();
      profits = [finalValues[0], finalValues[1], finalValues[2]];
    }

    // Create structured results data (use actual selectedOption if available,
    // otherwise pass a dummy - here we use selectedOption from model)
    const resultsData: ResultsData = {
      profits,
      selectedOption: selectedOption,
    };

    // Update results controller with data before switching screens
    // @ts-ignore - access resultsController on the switcher
    this.switcher["resultsController"].updateResults(resultsData);

    // Now switch to the results screen
    this.switcher.switchToScreen("results");
  }

  updateData(newData: GraphDataConfig): void {
    this.model.updateData(newData);
    this.view.updateGraph(this.model.getRunningAverages());
  }

  getView(): GraphScreenView {
    return this.view;
  }

  show(): void {
    this.view.show();
  }

  hide(): void {
    this.view.hide();
  }
}

