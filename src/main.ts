import Konva from "konva";
import type { ScreenSwitcher } from "./types";
import { ResultsScreenController } from "./screens/ResultsScreen/ResultsScreenController";
import { CardGameScreenController } from "./screens/CardGameScreen/CardGameScreenController";
import { MenuScreenController } from "./screens/MenuScreen/MenuScreenController";
import { StoryScreenController } from "./screens/StoryScreen/StoryScreenController";
import { STAGE_WIDTH, STAGE_HEIGHT, GAME1RESULTSTEXT } from "./constants";
import { GraphScreenController } from "./screens/GraphScreen/GraphScreenController";
import { TryAgainController } from "./screens/TryAgainScreen/TryAgainScreenController";
import { STAGE_WIDTH, STAGE_HEIGHT, GAME1RESULTSTEXT, GAME1HINTMESSAGE } from "./constants"; 
import type { GraphDataConfig } from "./constants";

class App implements ScreenSwitcher {
  private stage: Konva.Stage;
  private layer: Konva.Layer;

	private resultsController: ResultsScreenController;
	private cardGameController: CardGameScreenController;
	private menuController: MenuScreenController;
	private storyController: StoryScreenController;
  private tryAgainController : TryAgainController;
  private graphController: GraphScreenController;


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
		this.cardGameController = new CardGameScreenController(this);
		this.menuController = new MenuScreenController(this);
		this.storyController = new StoryScreenController(this);

		// Add view groups to the layer
		this.layer.add(this.cardGameController.getView().getGroup());
		this.layer.add(this.menuController.getView().getGroup());
		this.layer.add(this.storyController.getView().getGroup());
    this.layer.add(this.graphController.getView().getGroup());
    this.layer.add(this.resultsController.getView().getGroup());
	  this.layer.add(this.tryAgainController.getView().getGroup());

		this.layer.draw();

		// Start with the menu
		this.switchToScreen("menu");
	}

	switchToScreen(screen: string): void {
		// Hide everything 
		this.resultsController.hide();
		this.cardGameController.hide();
		this.menuController.hide();
		this.storyController.hide();
    this.graphController.hide();
	  this.tryAgainController.hide();

		if (screen === "results") {
			this.resultsController.getView().show();
		} else if (screen === "cardGame") {
			this.cardGameController.getView().show();
		} else if (screen === "menu") {
			this.menuController.getView().show();
		} else if (screen === "story") {
			this.storyController.getView().show();
		} else if (screen === "tryagain") {
      this.tryAgainController.showTryAgain();
    } else if (screen === "graph") {
      this.graphController.getView().show();
    }
  }
}

new App("container");

