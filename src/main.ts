import Konva from "konva";
import type { ScreenSwitcher } from "./types";
import { ResultsScreenController } from "./screens/ResultsScreen/ResultsScreenController";
import { CardGameScreenController } from "./screens/CardGameScreen/CardGameScreenController";
import { STAGE_WIDTH, STAGE_HEIGHT, GAME1RESULTSTEXT } from "./constants";

class App implements ScreenSwitcher {
	private stage: Konva.Stage;
	private layer: Konva.Layer;

	private resultsController: ResultsScreenController;
	private cardGameController: CardGameScreenController;

	constructor(container: string) {
		// make stage 
		this.stage = new Konva.Stage({
			container,
			width: STAGE_WIDTH,
			height: STAGE_HEIGHT,
		});

		this.layer = new Konva.Layer();
		this.stage.add(this.layer);

		// Initialize controllers
		this.resultsController = new ResultsScreenController(this);
		this.cardGameController = new CardGameScreenController(this);

		// Add view groups to the layer
		this.layer.add(this.resultsController.getView().getGroup());
		this.layer.add(this.cardGameController.getView().getGroup());

		this.layer.draw();

		// Start with the card game
		this.switchToScreen("cardGame");
	}

	switchToScreen(screen: string): void {
		// Hide everything 
		this.resultsController.hide();
		this.cardGameController.hide();

		if (screen === "results") {
			this.resultsController.getView().show();
			let resultText = GAME1RESULTSTEXT.replace("{0}", "-406")
						     .replace("{1}", "+545")
					       	     .replace("{2}", "-120");
			this.resultsController.showResults(resultText, 3);
		} else if (screen === "cardGame") {
			this.cardGameController.getView().show();
		}
	}
}

new App("container");
