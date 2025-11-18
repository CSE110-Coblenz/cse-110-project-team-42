import type { Group } from "konva/lib/Group";

export interface View {
	getGroup(): Group;
	show(): void;
	hide(): void;
}

export abstract class ScreenController {
	abstract getView(): View;

	show(): void {
		this.getView().show();
	}

	hide(): void {
		this.getView().hide();
	}
}

export interface ScreenSwitcher {
	switchToScreen(screen: string): void;
}

export interface CardGameOption {
  id: string;
  label: string;
  buyIn: number;
  payoff: number;
  faceCards: number;
  deckSize: number;
}

export interface SimulationResult {
  option: CardGameOption;
  runs: number;
  wins: number;
  losses: number;
  netResult: number;
  expectedValue: number;
  verdict: string;
}