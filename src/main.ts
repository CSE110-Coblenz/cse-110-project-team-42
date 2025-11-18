import Konva from "konva";
import type { ScreenSwitcher } from "./types.ts";
import { ResultsScreenController } from "./screens/ResultsScreen/ResultsScreenController.ts";
import { WinScreenController } from "./screens/WinScreen/WinScreenController.ts";
import { DiceGameScreenController } from "./screens/DiceGameScreen/DiceGameScreenController.ts";
import { DiceExplainScreenController } from "./screens/DiceExplainScreen/DiceExplainScreenController.ts";
import { STAGE_WIDTH, STAGE_HEIGHT, GAME1RESULTSTEXT } from "./constants.ts";

class App implements ScreenSwitcher {
	private stage: Konva.Stage;
	private layer: Konva.Layer;

	private resultsController: ResultsScreenController;

	//Aodong added
	private winController: WinScreenController;
	private diceController: DiceGameScreenController;
	private diceExplain: DiceExplainScreenController;

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
		//Aodong added
		this.winController = new WinScreenController(this);
		this.diceController = new DiceGameScreenController(this);
		this.diceExplain = new DiceExplainScreenController(this);
		this.layer.add(this.diceController.getView().getGroup());
		// Add view groups to the layer
		this.layer.add(this.resultsController.getView().getGroup());
		//aodong added:
		this.layer.add(this.winController.getView().getGroup());
		this.layer.add(this.diceExplain.getView().getGroup());
		this.layer.draw();

		// Start (results for now)
		//needs work here to test for finish screen
		this.diceController.start();
		//this.switchToScreen("results");
		
		this.switchToScreen("results");
	}

	switchToScreen(screen: string): void {
		// Hide everything 
		this.resultsController.hide();
		//add
		this.winController.hide();
		this.diceExplain.hide();
		this.diceController.hide();

		this.diceController.show();
		//this.winController.show();
		//this.diceExplain.show();
	
	
	
	//left over code:
		//this.diceExplain.show();
		/*if (screen === "results") {
			this.resultsController.getView().show();
			let resultText = GAME1RESULTSTEXT.replace("{0}", "-406")
						     .replace("{1}", "+545")
					       	     .replace("{2}", "-120");
			this.resultsController.showResults(resultText, 3);
		}*/
		//if (screen == "win"){
			//this.winController.show();
		//}
	}
}

new App("container");
