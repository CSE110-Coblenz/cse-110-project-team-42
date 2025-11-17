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

export interface RouletteOption {
  id: string;
  label: string;
  buyIn: number;
  payoff: number;
  slots: number;
  total: number;
  color?: string;
}

export interface SimulationResultRoullet{
  option: RouletteOption;
  runs: number;
  wins: number;
  losses: number;
  netResult: number;
  expectedValue: number;
  verdict: string;
}
