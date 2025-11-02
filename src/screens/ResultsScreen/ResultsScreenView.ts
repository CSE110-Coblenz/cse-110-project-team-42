import Konva from "konva";
import type { View } from "../../types";
import { STAGE_WIDTH, STAGE_HEIGHT } from "../../constants";

export class ResultsScreenView implements View {
	private group: Konva.Group;
	private messageText: Konva.Text;
	private hearts: Konva.Path[] = [];
	private proceedButton: Konva.Rect;
	private buttonText: Konva.Text;

	constructor(message: string, hearts: number, onProceedClick: () => void) {
		this.group = new Konva.Group({ visible: false });

		// Load background image
		const bgImage = new Image();
		bgImage.src = "/bg.png";
		const bg = new Konva.Image({
			x: 0,
			y: 0,
			width: STAGE_WIDTH,
			height: STAGE_HEIGHT,
		});
		bgImage.onload = () => {
			bg.image(bgImage);
			this.group.getLayer()?.draw();
		};
		this.group.add(bg);

		// Load scroll image
		const scrollImage = new Image();
		scrollImage.src = "/scroll.png";
		const scroll = new Konva.Image({
			x: 0,
			y: 0,
			width: STAGE_WIDTH,
			height: STAGE_HEIGHT,
		});
		scrollImage.onload = () => {
			scroll.image(scrollImage);
			this.group.getLayer()?.draw();
		};
		this.group.add(scroll);

		// Message text (centered on scroll)
		this.messageText = new Konva.Text({
			x: STAGE_WIDTH / 2 - 300,
			y: STAGE_HEIGHT / 2 - 150,
			width: 600,
			text: message,
			fontSize: 28,
			fontFamily: "Georgia",
			fill: "#3e2f1c",
			align: "center",
		});
		this.group.add(this.messageText);

		// Draw hearts initially
		this.drawHearts(hearts);

		// Proceed button
		const btnWidth = 180;
		const btnHeight = 50;
		const btnX = STAGE_WIDTH / 2 - btnWidth / 2;
		const btnY = STAGE_HEIGHT - 175;

		this.proceedButton = new Konva.Rect({
			x: btnX,
			y: btnY,
			width: btnWidth,
			height: btnHeight,
			fill: "#8b4513",
			cornerRadius: 12,
			shadowColor: "black",
			shadowBlur: 10,
			shadowOffsetY: 3,
			shadowOpacity: 0.3,
		});

		this.buttonText = new Konva.Text({
			x: btnX,
			y: btnY + 12,
			width: btnWidth,
			align: "center",
			text: "Proceed",
			fontSize: 22,
			fontFamily: "Arial",
			fill: "white",
		});

		this.group.add(this.proceedButton);
		this.group.add(this.buttonText);

		// Controller handles this callback
		this.proceedButton.on("click", onProceedClick);
		this.buttonText.on("click", onProceedClick);
	}

	private drawHearts(count: number): void {
		// Remove any existing hearts
		this.hearts.forEach((h) => h.destroy());
		this.hearts = [];

		const heartPath =
		"M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 " +
		"4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 " +
		"14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 " +
		"6.86-8.55 11.54L12 21.35z";

		const heartSize = 40;
		const spacing = 1;
		const margin = 20;

		// Align to top-right corner
		const totalWidth = count * (heartSize + spacing) - spacing;
		const startX = STAGE_WIDTH - totalWidth - margin;
		const heartY = margin; // top margin

		for (let i = 0; i < count; i++) {
			const heart = new Konva.Path({
				x: startX + i * (heartSize + spacing),
				y: heartY,
				data: heartPath,
				scale: { x: 1.2, y: 1.2 },
				fill: "red",
				stroke: "#7a0000",
				strokeWidth: 1,
			});
			this.group.add(heart);
			this.hearts.push(heart);
		}
	}

	updateMessage(newMessage: string): void {
		this.messageText.text(newMessage);
		this.group.getLayer()?.draw();
	}

	updateHearts(newHearts: number): void {
		this.drawHearts(newHearts);
		this.group.getLayer()?.draw();
	}

	show(): void {
		this.group.visible(true);
		this.group.getLayer()?.draw();
	}

	hide(): void {
		this.group.visible(false);
		this.group.getLayer()?.draw();
	}

	getGroup(): Konva.Group {
		return this.group;
	}
}

