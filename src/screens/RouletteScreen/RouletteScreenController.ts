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
		// Placeholder action — hook up to game flow later.
		this.screenSwitcher?.switchToScreen("results");
	}

	/**
	 * Allows developers to configure the wheel counts programmatically.
	 */
	setColorCounts(counts: Partial<ColorCounts>): void {
		const updated = this.model.updateCounts(counts);
		this.view.updateWheel(updated);
	}
}
