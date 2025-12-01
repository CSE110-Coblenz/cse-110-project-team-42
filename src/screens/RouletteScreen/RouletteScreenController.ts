import { ScreenController } from "../../types";
import type { ScreenSwitcher } from "../../types";
import { RouletteScreenModel } from "./RouletteScreenModel";
import { RouletteScreenView } from "./RouletteScreenView";
import { Timer } from "../../gamestate";

export class RouletteScreenController extends ScreenController {
	private readonly model: RouletteScreenModel;
	private readonly view: RouletteScreenView;

	constructor(private screenSwitcher?: ScreenSwitcher) {
		super();
		this.model = new RouletteScreenModel();
        const options = this.model.getOptions();
        const counts = this.model.getCounts();
        const total = this.model.getTotalSlots();
        
		this.view = new RouletteScreenView(options, counts, total, (index) => this.handleOptionSelect(index));
	}


	getView(): RouletteScreenView {
		return this.view;
	}

	show(): void {
        // Refresh state when shown (e.g. after retry)
        const options = this.model.getOptions();
        const counts = this.model.getCounts();
        const total = this.model.getTotalSlots();
        
        this.view.updateOptions(options);
        this.view.updateWheel(counts, total);
		this.view.show();
	}

	hide(): void {
		this.view.hide();
	}

	private handleOptionSelect(index: number): void {
        this.model.setSelectedOption(index);
		this.screenSwitcher?.switchToScreen("graph");
		Timer.stop(); //pauses timer while in graph/results/tryagain screens
	}

    getModel(): RouletteScreenModel {
        return this.model;
    }
}
