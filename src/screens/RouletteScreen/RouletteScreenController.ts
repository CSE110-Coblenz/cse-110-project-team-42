import { ScreenController } from "../../types";
import type { ScreenSwitcher } from "../../types";
import { RouletteScreenModel, type ColorCounts } from "./RouletteScreenModel";
import { RouletteScreenView } from "./RouletteScreenView";

export class RouletteScreenController extends ScreenController {
	private readonly model: RouletteScreenModel;
	private readonly view: RouletteScreenView;

	constructor(private screenSwitcher?: ScreenSwitcher) {
		super();
		this.model = new RouletteScreenModel();
		this.view = new RouletteScreenView(this.model.getCounts(), () => this.handleSpin());
	}

	getView(): RouletteScreenView {
		return this.view;
	}

	show(): void {
		this.view.show();
		this.view.updateWheel(this.model.getCounts());
	}

	hide(): void {
		this.view.hide();
	}

	private handleSpin(): void {
        // For now, since there is no UI to select color, we default to Green (index 1)
        // as a placeholder "user choice".
        this.model.setSelectedOption(1);

		this.screenSwitcher?.switchToScreen("graph");
	}

    getModel(): RouletteScreenModel {
        return this.model;
    }

	/**
	 * Allows developers to configure the wheel counts programmatically.
	 */
	setColorCounts(counts: Partial<ColorCounts>): void {
		const updated = this.model.updateCounts(counts);
		this.view.updateWheel(updated);
	}
}
