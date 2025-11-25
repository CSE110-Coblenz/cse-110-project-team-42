import Konva from "konva";
import type { ScreenSwitcher } from "./types";
import { ResultsScreenController } from "./screens/ResultsScreen/ResultsScreenController";
import { CardGameScreenController } from "./screens/CardGameScreen/CardGameScreenController";
import { MenuScreenController } from "./screens/MenuScreen/MenuScreenController";
import { StoryScreenController } from "./screens/StoryScreen/StoryScreenController";
import { GraphScreenController } from "./screens/GraphScreen/GraphScreenController";
import { TryAgainController } from "./screens/TryAgainScreen/TryAgainScreenController";
import { RouletteScreenController } from "./screens/RouletteScreen/RouletteScreenController";
import { DiceGameScreenController } from "./screens/DiceGameScreen/DiceGameScreenController";
import { WinScreenController } from "./screens/WinScreen/WinScreenController";
import { LoseScreenController } from "./screens/LoseScreen/LoseScreenController";
import { STAGE_WIDTH, STAGE_HEIGHT } from "./constants";


class App implements ScreenSwitcher {
    private stage: Konva.Stage;
    private layer: Konva.Layer;

	  private resultsController: ResultsScreenController;
	  private cardGameController: CardGameScreenController;
    private menuController: MenuScreenController;
	  private storyController: StoryScreenController;
    private tryAgainController : TryAgainController;
    private graphController: GraphScreenController;
    private rouletteController: RouletteScreenController;
    private diceController : DiceGameScreenController;
    private winController : WinScreenController;
    private loseController : LoseScreenController;

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
        this.menuController = new MenuScreenController(this);
		    this.storyController = new StoryScreenController(this);
        this.resultsController = new ResultsScreenController(this);
        this.tryAgainController = new TryAgainController(this);
        this.cardGameController = new CardGameScreenController(this);
        this.rouletteController = new RouletteScreenController(this);
        this.diceController = new DiceGameScreenController(this);
        this.winController = new WinScreenController(this);
        this.loseController = new LoseScreenController(this);

        // Add view groups to the layer
        this.layer.add(this.cardGameController.getView().getGroup());
        this.layer.add(this.menuController.getView().getGroup());
		    this.layer.add(this.storyController.getView().getGroup());
        this.layer.add(this.graphController.getView().getGroup());
        this.layer.add(this.resultsController.getView().getGroup());
        this.layer.add(this.tryAgainController.getView().getGroup());
        this.layer.add(this.rouletteController.getView().getGroup());
        this.layer.add(this.diceController.getView().getGroup());
        this.layer.add(this.winController.getView().getGroup());
        this.layer.add(this.loseController.getView().getGroup());

        // Start with the menu screen
        this.switchToScreen("lose");
    }

	switchToScreen(screen: string): void {
		// Hide everything
		this.resultsController.hide();
		this.cardGameController.hide();
    this.menuController.hide();
		this.storyController.hide();
    this.graphController.hide();
    this.tryAgainController.hide();
    this.rouletteController.hide();
    this.diceController.hide();
    this.winController.hide();
    this.loseController.hide();

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
            this.graphController.show();
        } else if (screen === "roulette") {
            this.rouletteController.show();
        } else if (screen === "diceGame"){
            this.diceController.start();
        } else if (screen === "win"){
            this.winController.getView().show();
        } else if (screen === "lose"){
            this.loseController.getView().show();
        }
    }
}

new App("container");

