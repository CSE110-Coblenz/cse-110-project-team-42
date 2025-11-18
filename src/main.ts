import Konva from "konva";
import type { ScreenSwitcher } from "./types.ts";
import { ResultsScreenController } from "./screens/ResultsScreen/ResultsScreenController";
import { GraphScreenController } from "./screens/GraphScreen/GraphScreenController";
import {
  STAGE_WIDTH,
  STAGE_HEIGHT,
  ITERATIONS,
  type GraphDataConfig,
} from "./constants";
import { CardGameScreenController } from "./screens/CardGameScreen/CardGameScreenController";

class App implements ScreenSwitcher {
  private stage: Konva.Stage;
  private layer: Konva.Layer;

    private resultsController: ResultsScreenController;
    private graphController: GraphScreenController;
	private cardGameController: CardGameScreenController;

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
    this.cardGameController = new CardGameScreenController(this);

    // Add view groups to the layer
    this.layer.add(this.cardGameController.getView().getGroup());
    this.layer.add(this.graphController.getView().getGroup());
    this.layer.add(this.resultsController.getView().getGroup());

    this.layer.draw();

    // Start on graph for now
    this.switchToScreen("graph");
  }

  switchToScreen(screen: string): void {
    // Hide all
    this.resultsController.hide();
    this.graphController.hide();

    if (screen === "graph") {
      this.graphController.getView().show();
    }

    if (screen === "results") {
      this.resultsController.getView().show();
    }

    if (screen === "cardGame") {
      this.cardGameController.getView().show();
    }
  }
}

new App("container");

