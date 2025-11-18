import Konva from "konva";
import type { View } from "../../types";
import { STAGE_WIDTH, STAGE_HEIGHT } from "../../constants";
import { Hearts as GameHearts } from "../../gamestate";

export class ResultsScreenView implements View {
	private group: Konva.Group;
	private messageText: Konva.Text;
	
	private proceedButton: Konva.Rect;
	private buttonText: Konva.Text;

	constructor(message: string, onProceedClick: () => void) {
		this.group = new Konva.Group({ visible: false });

		// Load background image
		const bgImage = new Image();
		bgImage.src = "/bg.png";
		const bg = new Konva.Image({
			x: 0,
			y: 0,
			width: STAGE_WIDTH,
			height: STAGE_HEIGHT,
			image: bgImage,
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
			image: scrollImage,
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
			fill: "#FFFFFF",
			align: "center",
		});
		this.group.add(this.messageText);

		// Draw hearts initially using current gamestate count
		GameHearts.draw(this.group);

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

	// Hearts are drawn by gamestate. Local heart array kept for compatibility but
	// drawing and count are managed by `gamestate.Hearts`.

	updateMessage(newMessage: string): void {
		this.messageText.text(newMessage);
		this.group.getLayer()?.draw();
	}

	updateHearts(): void {
		GameHearts.draw(this.group);
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

