import type { ScreenSwitcher } from "../../types";
import { GraphScreenModel } from "./GraphScreenModel";
import { GraphScreenView } from "./GraphScreenView";
import type { ResultsData } from "../ResultsScreen/ResultsScreenConstants";
import { Level } from "../../gamestate";

export class GraphScreenController {
  private switcher: ScreenSwitcher;
  private model: GraphScreenModel;
  private view: GraphScreenView;

  constructor(switcher: ScreenSwitcher) {
    this.switcher = switcher;
    this.model = new GraphScreenModel();
    this.view = new GraphScreenView(() => this.handleNext());
  }

  /** Called when graph screen is shown - runs simulation based on current game */
  show(): void {
    // Run simulation based on current game level
    if (Level.get() === 1) {
      // @ts-ignore - access rouletteController on the switcher
      const rouletteModel = this.switcher["rouletteController"].getModel();
      const selectedOption = rouletteModel.getSelectedOption();
      
      this.model.runSimulation(selectedOption, (index) => rouletteModel.simulateByIndex(index));
      this.view.updateGraph(this.model.getRunningAverages());

    } else if (Level.get() === 2) {
      // @ts-ignore - access cardGameController on the switcher
      const cardModel = this.switcher["cardGameController"].getModel();
      const selectedOption = cardModel.getSelectedOption();
      
      // Run simulation and update view
      this.model.runSimulation(selectedOption, (index) => cardModel.simulateByIndex(index));
      this.view.updateGraph(this.model.getRunningAverages());

    } else if (Level.get() === 3) {
      // @ts-ignore - access diceController on the switcher
      const diceModel = this.switcher["diceController"].getModel();
      const selectedOption = diceModel.getSelectedOption();

      this.model.runSimulation(selectedOption, (index) => diceModel.simulateByIndex(index));
      this.view.updateGraph(this.model.getRunningAverages());
    }
    
    this.view.show();
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

    // Create structured results data
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

  getView(): GraphScreenView {
    return this.view;
  }

  hide(): void {
    this.view.hide();
  }
}
