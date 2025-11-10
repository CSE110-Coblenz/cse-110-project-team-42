import Konva from "konva";
import type { View } from "../../types";
import { STAGE_WIDTH, STAGE_HEIGHT } from "../../constants";

export class TryAgainScreenView implements View {
  private group: Konva.Group;
  private titleText: Konva.Text;
  private subtitleText: Konva.Text;
  private hintText: Konva.Text;
  private hearts: Konva.Path[] = [];
  private restartButton: Konva.Rect;
  private buttonText: Konva.Text;

  constructor(message: string, hearts: number, onRestartClick: () => void) {
    this.group = new Konva.Group({ visible: false });

    // Background
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

    // Scroll overlay
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

    // Title (use same palette as Results; serif like a parchment)
    this.titleText = new Konva.Text({
      x: STAGE_WIDTH / 2 - 320,
      y: STAGE_HEIGHT * 0.30 - 40,
      width: 640,
      text: "OOPS! Try Again!",
      fontSize: 40,
      fontFamily: "Georgia",
      fill: "#3e2f1c",
      align: "center",
      shadowColor: "#2b1d0e",
      shadowBlur: 4,
      shadowOpacity: 0.25,
    });
    this.group.add(this.titleText);

    // Subtitle
    this.subtitleText = new Konva.Text({
      x: STAGE_WIDTH / 2 - 320,
      y: STAGE_HEIGHT * 0.42 - 30,
      width: 640,
      text: "You chose the wrong option and lost money!",
      fontSize: 24,
      fontFamily: "Georgia",
      fill: "#3e2f1c",
      align: "center",
    });
    this.group.add(this.subtitleText);

    // Hint (multi-line, centered)
    this.hintText = new Konva.Text({
      x: STAGE_WIDTH / 2 - 340,
      y: STAGE_HEIGHT * 0.50,
      width: 680,
      text: message, 
      fontSize: 20,
      fontFamily: "Georgia",
      fill: "#3e2f1c",
      align: "center",
      lineHeight: 1.35,
    });
    this.group.add(this.hintText);

    // Hearts (top-right; same style as Results)
    this.drawHearts(hearts);

    // Restart button — match Results button styling
    const btnWidth = 180;
    const btnHeight = 50;
    const btnX = STAGE_WIDTH / 2 - btnWidth / 2;
    const btnY = STAGE_HEIGHT - 175;

    this.restartButton = new Konva.Rect({
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
      text: "Restart",
      fontSize: 22,
      fontFamily: "Arial",
      fill: "white",
    });

    this.group.add(this.restartButton);
    this.group.add(this.buttonText);

    const click = onRestartClick;
    this.restartButton.on("click", click);
    this.buttonText.on("click", click);

    // nicer cursor on hover (limit side-effects to the stage container)
    const pointerOn = () => this.group.getStage()?.container().style && (this.group.getStage()!.container().style.cursor = "pointer");
    const pointerOff = () => this.group.getStage()?.container().style && (this.group.getStage()!.container().style.cursor = "default");
    this.restartButton.on("mouseover", pointerOn);
    this.restartButton.on("mouseout", pointerOff);
    this.buttonText.on("mouseover", pointerOn);
    this.buttonText.on("mouseout", pointerOff);
  }

  private drawHearts(count: number): void {
    // cleanup
    this.hearts.forEach(h => h.destroy());
    this.hearts = [];

    const heartPath =
      "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 " +
      "4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 " +
      "14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 " +
      "6.86-8.55 11.54L12 21.35z";

    const heartSize = 40;
    const spacing = 1;
    const margin = 20;

    const totalWidth = count * (heartSize + spacing) - spacing;
    const startX = STAGE_WIDTH - totalWidth - margin;
    const heartY = margin;

    for (let i = 0; i < count; i++) {
      const heart = new Konva.Path({
        x: startX + i * (heartSize + spacing),
        y: heartY,
        data: heartPath,
        scale: { x: 1.2, y: 1.2 }, // match Results style
        fill: "red",
        stroke: "#7a0000",
        strokeWidth: 1,
      });
      this.group.add(heart);
      this.hearts.push(heart);
    }
  }

  updateMessage(newMessage: string): void {
    this.hintText.text(newMessage);
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
