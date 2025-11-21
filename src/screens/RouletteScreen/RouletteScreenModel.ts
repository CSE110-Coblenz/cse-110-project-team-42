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
}
