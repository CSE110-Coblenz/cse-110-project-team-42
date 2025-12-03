import Konva from "konva";
import type { View } from "../../types";
import { STAGE_WIDTH, STAGE_HEIGHT, FONT_PRIMARY, COLOR_MINIGAME_TEXT } from "../../constants";
import { Hearts as GameHearts } from "../../gamestate";

export class ResultsScreenView implements View {
	private group: Konva.Group;
	private messageText: Konva.Text;
	
	private proceedButton: Konva.Group;
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
			image: undefined,
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
			image: undefined,
		});
		scrollImage.onload = () => {
			scroll.image(scrollImage);
			this.group.getLayer()?.draw();
		};
		this.group.add(scroll);

		// Message text (centered on scroll)
		this.messageText = new Konva.Text({
			x: STAGE_WIDTH / 2 - 400,
			y: STAGE_HEIGHT / 2 - 150,
			width: 800,
			text: message,
			fontSize: 28,
			fontFamily: "Georgia",
			fill: COLOR_MINIGAME_TEXT,
			align: "center",
		});
		this.group.add(this.messageText);

		// Draw hearts initially using current gamestate count
		GameHearts.draw(this.group);

		// Proceed button
		const btnWidth = 180;
		const btnHeight = 50;
		const btnX = STAGE_WIDTH / 2;
		const btnY = STAGE_HEIGHT - 175 + btnHeight / 2;

		this.proceedButton = new Konva.Group({
			x: btnX,
			y: btnY,
			offsetX: btnWidth / 2,
			offsetY: btnHeight / 2,
		});

		const btnRect = new Konva.Rect({
			width: btnWidth,
			height: btnHeight,
			fill: "#26492b", // Greenish
			stroke: "#f7e3c3", // Cream
			strokeWidth: 2,
			cornerRadius: 10,
			shadowColor: "black",
			shadowBlur: 10,
			shadowOffsetY: 5,
		});

		this.buttonText = new Konva.Text({
			width: btnWidth,
			height: btnHeight,
			y: (btnHeight - 22) / 2, // Center vertically
			align: "center",
			text: "PROCEED",
			fontSize: 22,
			fontFamily: FONT_PRIMARY,
			fill: "#f7e3c3",
			fontStyle: "bold",
		});

		this.proceedButton.add(btnRect);
		this.proceedButton.add(this.buttonText);
		this.group.add(this.proceedButton);

		// Controller handles this callback
		this.proceedButton.on("click", onProceedClick);
		
		// Hover effects
		this.proceedButton.on("mouseenter", () => {
			this.group.getStage()!.container().style.cursor = "pointer";
			btnRect.fill("#3a6b40");
			this.proceedButton.to({ scaleX: 1.05, scaleY: 1.05, duration: 0.1 });
		});
		this.proceedButton.on("mouseleave", () => {
			this.group.getStage()!.container().style.cursor = "default";
			btnRect.fill("#26492b");
			this.proceedButton.to({ scaleX: 1, scaleY: 1, duration: 0.1 });
		});
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

