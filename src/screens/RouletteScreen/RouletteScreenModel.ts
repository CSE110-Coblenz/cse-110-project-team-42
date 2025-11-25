export type RouletteColor = "blue" | "green" | "red";

export interface ColorCounts {
	blue: number;
	green: number;
	red: number;
}

/**
 * Stores the user configurable counts for each roulette color segment.
 */
export class RouletteScreenModel {
	private counts: ColorCounts;
	private selectedOption: number = 0; // Default to 0 (Red) if not selected

	constructor(initialCounts: ColorCounts = { blue: 3, green: 2, red: 2 }) {
		this.counts = { ...initialCounts };
	}

	getCounts(): ColorCounts {
		return { ...this.counts };
	}

	updateCounts(partial: Partial<ColorCounts>): ColorCounts {
		const next = { ...this.counts };

		(["blue", "green", "red"] as RouletteColor[]).forEach((color) => {
			const incoming = partial[color];
			if (incoming !== undefined && !Number.isNaN(incoming)) {
				next[color] = Math.max(0, Math.floor(incoming));
			}
		});

		// At least one slice must remain so the wheel can render.
		if (next.blue + next.green + next.red === 0) {
			next.blue = 1;
		}

		this.counts = next;
		return this.getCounts();
	}

	setSelectedOption(index: number): void {
		this.selectedOption = index;
	}

	getSelectedOption(): number {
		return this.selectedOption;
	}

	/**
	 * Simulates a single spin for a given bet option.
	 * 0 = Red, 1 = Green, 2 = Blue
	 */
	simulateByIndex(index: number): number {
		const total = this.counts.blue + this.counts.green + this.counts.red;
		if (total === 0) return -1;

		let winningCount = 0;
		let payoff = 0;
		const buyIn = 1;

		// Mapping: 0 -> Red, 1 -> Green, 2 -> Blue
		if (index === 0) { // Red
			winningCount = this.counts.red;
			payoff = 6;
		} else if (index === 1) { // Green
			winningCount = this.counts.green;
			payoff = 5;
		} else if (index === 2) { // Blue
			winningCount = this.counts.blue;
			payoff = 1.4;
		}

		const probability = winningCount / total;
		const won = Math.random() < probability;

		if (won) {
			return payoff - buyIn;
		} else {
			return -buyIn;
		}
	}
}
