import Konva from "konva";
import type { ScreenSwitcher } from "./types";
import { ResultsScreenController } from "./screens/ResultsScreen/ResultsScreenController";
import { CardGameScreenController } from "./screens/CardGameScreen/CardGameScreenController";
import { MenuScreenController } from "./screens/MenuScreen/MenuScreenController";
import { StoryScreenController } from "./screens/StoryScreen/StoryScreenController";
import { STAGE_WIDTH, STAGE_HEIGHT, GAME1RESULTSTEXT } from "./constants";

class App implements ScreenSwitcher {
	private stage: Konva.Stage;
	private layer: Konva.Layer;

	private resultsController: ResultsScreenController;
	private cardGameController: CardGameScreenController;
	private menuController: MenuScreenController;
	private storyController: StoryScreenController;

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
		this.menuController = new MenuScreenController(this);
		this.storyController = new StoryScreenController(this);

		// Add view groups to the layer
		this.layer.add(this.resultsController.getView().getGroup());
		this.layer.add(this.cardGameController.getView().getGroup());
		this.layer.add(this.menuController.getView().getGroup());
		this.layer.add(this.storyController.getView().getGroup());

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

		if (screen === "results") {
			this.resultsController.getView().show();
			let resultText = GAME1RESULTSTEXT.replace("{0}", "-406")
						     .replace("{1}", "+545")
					       	     .replace("{2}", "-120");
			this.resultsController.showResults(resultText, 3);
		} else if (screen === "cardGame") {
			this.cardGameController.getView().show();
		} else if (screen === "menu") {
			this.menuController.getView().show();
		} else if (screen === "story") {
			this.storyController.getView().show();
		}
	}
}

new App("container");
