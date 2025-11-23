import Konva from "konva";
import type { ScreenSwitcher } from "./types";
import { ResultsScreenController } from "./screens/ResultsScreen/ResultsScreenController";
import { CardGameScreenController } from "./screens/CardGameScreen/CardGameScreenController";
import { GraphScreenController } from "./screens/GraphScreen/GraphScreenController";
import { TryAgainController } from "./screens/TryAgainScreen/TryAgainScreenController";
import { RouletteScreenController } from "./screens/RouletteScreen/RouletteScreenController";
import { STAGE_WIDTH, STAGE_HEIGHT } from "./constants";

class App implements ScreenSwitcher {
    private stage: Konva.Stage;
    private layer: Konva.Layer;

	private resultsController: ResultsScreenController;
	private cardGameController: CardGameScreenController;
    private tryAgainController : TryAgainController;
    private graphController: GraphScreenController;
    private rouletteController: RouletteScreenController;


    constructor(container: string) {
        // Create stage
        this.stage = new Konva.Stage({
            container,
            width: STAGE_WIDTH,
            height: STAGE_HEIGHT,
        });

        this.layer = new Konva.Layer();
        this.stage.add(this.layer);

        // Initialize controllers
        this.graphController = new GraphScreenController(this);
        this.resultsController = new ResultsScreenController(this);
        this.tryAgainController = new TryAgainController(this);
        this.cardGameController = new CardGameScreenController(this);
        this.rouletteController = new RouletteScreenController(this);

        // Add view groups to the layer
        this.layer.add(this.cardGameController.getView().getGroup());
        this.layer.add(this.graphController.getView().getGroup());
        this.layer.add(this.resultsController.getView().getGroup());
        this.layer.add(this.tryAgainController.getView().getGroup());
        this.layer.add(this.rouletteController.getView().getGroup());

        // Start with the card game
        this.switchToScreen("cardGame");
    }

	switchToScreen(screen: string): void {
		// Hide everything 
		this.resultsController.hide();
		this.cardGameController.hide();
        this.graphController.hide();
        this.tryAgainController.hide();
        this.rouletteController.hide();

		if (screen === "results") {
			this.resultsController.getView().show();
		} else if (screen === "cardGame") {
			this.cardGameController.getView().show();
		} else if (screen === "tryagain") {
            this.tryAgainController.showTryAgain();
        } else if (screen === "graph") {
            this.graphController.getView().show();
        } else if (screen === "roulette") {
            this.rouletteController.show();
        }
  }
}

new App("container");

