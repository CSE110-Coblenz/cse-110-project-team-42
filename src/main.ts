import Konva from "konva";
import type { ScreenSwitcher } from "./types.ts";
import { ResultsScreenController } from "./screens/ResultsScreen/ResultsScreenController.ts";
import { STAGE_WIDTH, STAGE_HEIGHT, GAME1RESULTSTEXT } from "./constants.ts";

class App implements ScreenSwitcher {
	private stage: Konva.Stage;
	private layer: Konva.Layer;

	private resultsController: ResultsScreenController;

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

		// Add view groups to the layer
		this.layer.add(this.resultsController.getView().getGroup());

		this.layer.draw();

		// Start (results for now)
		this.switchToScreen("results");
	}

	switchToScreen(screen: string): void {
		// Hide everything 
		this.resultsController.hide();

		if (screen === "results") {
			this.resultsController.getView().show();
			let resultText = GAME1RESULTSTEXT.replace("{0}", "-406")
						     .replace("{1}", "+545")
					       	     .replace("{2}", "-120");
			this.resultsController.showResults(resultText, 3);
		}
	}
}

new App("container");
