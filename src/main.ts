import Konva from "konva";
import type { ScreenSwitcher } from "./types.ts";
import { ResultsScreenController } from "./screens/ResultsScreen/ResultsScreenController.ts";
import { GraphScreenController } from "./screens/GraphScreen/GraphScreenController.ts";
import { TryAgainController } from "./screens/TryAgainScreen/TryAgainScreenController.js";
import {
  STAGE_WIDTH,
  STAGE_HEIGHT,
  ITERATIONS,
  type GraphDataConfig,
} from "./constants.ts";

class App implements ScreenSwitcher {
  private stage: Konva.Stage;
  private layer: Konva.Layer;

  private resultsController: ResultsScreenController;
  private graphController: GraphScreenController;
  private tryAgainController : TryAgainController;

  constructor(container: string) {
    // Create stage
    this.stage = new Konva.Stage({
      container,
      width: STAGE_WIDTH,
      height: STAGE_HEIGHT,
    });

    this.layer = new Konva.Layer();
    this.stage.add(this.layer);

    // FOR TESTING
    const simulateA = () => Math.random() * 15 - 7; // Option 1
    const simulateB = () => Math.random() * 1 - 3;  // Option 2
    const simulateC = () => Math.random() - 1; // Option 3
    const graphData: GraphDataConfig = {
      currentGame: 1,
      selectedOption: 2,
      simulateFns: [simulateA, simulateB, simulateC],
    };

    // Initialize controllers
    this.graphController = new GraphScreenController(this, graphData);
    this.resultsController = new ResultsScreenController(this);
	this.tryAgainController = new TryAgainController(this);

    // Add both to layer
    this.layer.add(this.graphController.getView().getGroup());
    this.layer.add(this.resultsController.getView().getGroup());
	this.layer.add(this.tryAgainController.getView().getGroup());


    this.layer.draw();

    // Start on tryagain for now
    this.switchToScreen("tryagain");
  }

  switchToScreen(screen: string): void {
    // Hide all
    this.resultsController.hide();
    this.graphController.hide();
	this.tryAgainController.hide();

    if (screen === "graph") {
      this.graphController.getView().show();
    }

    if (screen === "results") {
      this.resultsController.getView().show();
    }

	if (screen === "tryagain") {
		this.tryAgainController.getView().show();
	}
  }
}

new App("container");

