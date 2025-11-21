import Konva from "konva";
import type { View } from "../../types";
import { STAGE_HEIGHT, STAGE_WIDTH } from "../../constants";
import type { ColorCounts, RouletteColor } from "./RouletteScreenModel";

type SpinHandler = () => void;

const COLOR_MAP: Record<RouletteColor, string> = {
	blue: "#1d8cf8",
	green: "#7cb342",
	red: "#c62828",
};

export class RouletteScreenView implements View {
	private group: Konva.Group;
	private wheelGroup: Konva.Group;
	private currentCounts: ColorCounts;
	private wheelRadius = 140;

	constructor(initialCounts: ColorCounts, onSpin?: SpinHandler) {
		this.group = new Konva.Group({ visible: false });
		this.wheelGroup = new Konva.Group();
		this.currentCounts = initialCounts;

		this.buildBackground();
		this.buildWheel();
		this.buildInstructionText();
		this.buildSpinButton(onSpin);
		this.drawWheel(initialCounts);
	}

	getGroup(): Konva.Group {
		return this.group;
	}

	show(): void {
		this.group.visible(true);
		this.group.getLayer()?.batchDraw();
	}

	hide(): void {
		this.group.visible(false);
		this.group.getLayer()?.batchDraw();
	}

	updateWheel(counts: ColorCounts): void {
		this.currentCounts = counts;
		this.drawWheel(counts);
	}

	private buildBackground(): void {
		const bgImage = new Image();
		bgImage.src = "/bg.png";
		const bg = new Konva.Image({
			x: 0,
			y: 0,
			width: STAGE_WIDTH,
			height: STAGE_HEIGHT,
			listening: false,
		});
		bgImage.onload = () => {
			bg.image(bgImage);
			this.group.getLayer()?.batchDraw();
		};
		this.group.add(bg);

		const scrollImage = new Image();
		scrollImage.src = "/scroll.png";
		const scroll = new Konva.Image({
			x: 0,
			y: 0,
			width: STAGE_WIDTH,
			height: STAGE_HEIGHT,
			opacity: 0.95,
			listening: false,
		});
		scrollImage.onload = () => {
			scroll.image(scrollImage);
			this.group.getLayer()?.batchDraw();
		};
		this.group.add(scroll);
	}

	private buildWheel(): void {
		this.wheelGroup.position({
			x: STAGE_WIDTH * 0.28,
			y: STAGE_HEIGHT * 0.5,
		});

		const outline = new Konva.Circle({
			x: 0,
			y: 0,
			radius: this.wheelRadius + 6,
			stroke: "#1b1206",
			strokeWidth: 3,
			shadowColor: "rgba(0,0,0,0.5)",
			shadowBlur: 10,
		});
		this.wheelGroup.add(outline);

		this.group.add(this.wheelGroup);
	}

	private buildInstructionText(): void {
		const heading = new Konva.Text({
			text: "Roulette rules",
			fontSize: 36,
			fontFamily: "Georgia, 'Times New Roman', serif",
			fill: "#fef6dc",
			x: STAGE_WIDTH * 0.48,
			y: 100,
		});

		const body = new Konva.Text({
			text:
				"Bet $1 to spin\n" +
				"Red color slots give you back $6\n" +
				"Green color slots give you $5\n" +
				"Blue color slots give you $1.4\n\n" +
				"Choose one color to spin 1000 times to earn $100",
			fontSize: 24,
			lineHeight: 1.3,
			fontFamily: "Georgia, 'Times New Roman', serif",
			fill: "#fef6dc",
			x: STAGE_WIDTH * 0.48,
			y: 150,
		});

		this.group.add(heading);
		this.group.add(body);
	}

	private buildSpinButton(onSpin?: SpinHandler): void {
		const buttonGroup = new Konva.Group({
			x: STAGE_WIDTH * 0.55,
			y: STAGE_HEIGHT * 0.72,
			listening: true,
		});

		const button = new Konva.Rect({
			width: 180,
			height: 70,
			fill: "#1b4d2b",
			cornerRadius: 12,
			shadowColor: "#000",
			shadowBlur: 10,
			shadowOpacity: 0.4,
		});
		const text = new Konva.Text({
			text: "SPIN",
			width: 180,
			align: "center",
			fontSize: 40,
			fontFamily: "Impact, Haettenschweiler, 'Arial Black', sans-serif",
			fill: "#ff2c2c",
			y: 15,
		});

		buttonGroup.add(button);
		buttonGroup.add(text);
		buttonGroup.on("mouseenter", () => {
			const stage = this.group.getStage();
			if (stage) stage.container().style.cursor = "pointer";
			buttonGroup.to({ scaleX: 1.05, scaleY: 1.05, duration: 0.1 });
		});
		buttonGroup.on("mouseleave", () => {
			const stage = this.group.getStage();
			if (stage) stage.container().style.cursor = "default";
			buttonGroup.to({ scaleX: 1, scaleY: 1, duration: 0.1 });
		});
		buttonGroup.on("click tap", () => {
			onSpin?.();
		});

		this.group.add(buttonGroup);
	}

	private drawWheel(counts: ColorCounts): void {
		// Remove existing wedges (keep outline at index 0)
		this.wheelGroup
			.getChildren()
			.slice(1)
			.forEach((child) => child.destroy());

		const total = counts.blue + counts.green + counts.red;
		if (total === 0) {
			this.group.getLayer()?.batchDraw();
			return;
		}

		const order = this.buildSegmentOrder(counts, total);
		const singleAngle = 360 / total;

		let rotation = -90; // start at top
		order.forEach((color) => {
			const wedge = new Konva.Wedge({
				x: 0,
				y: 0,
				radius: this.wheelRadius,
				angle: singleAngle,
				rotation,
				fill: COLOR_MAP[color],
				stroke: "#1b1206",
				strokeWidth: 2,
			});
			this.wheelGroup.add(wedge);
			rotation += singleAngle;
		});

		const hub = new Konva.Circle({
			x: 0,
			y: 0,
			radius: 10,
			fill: "#1b1206",
		});
		this.wheelGroup.add(hub);

		this.group.getLayer()?.batchDraw();
	}

	private buildSegmentOrder(counts: ColorCounts, total: number): RouletteColor[] {
		const remaining: Record<RouletteColor, number> = {
			blue: counts.blue,
			green: counts.green,
			red: counts.red,
		};
		const order: RouletteColor[] = [];
		const colors: RouletteColor[] = ["blue", "green", "red"];

		while (order.length < total) {
			let added = false;
			for (const color of colors) {
				if (remaining[color] > 0) {
					order.push(color);
					remaining[color]--;
					added = true;
				}
			}
			if (!added) break;
		}

		return order;
	}
}
