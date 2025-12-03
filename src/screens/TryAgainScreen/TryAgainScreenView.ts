import Konva from "konva";
import type { View } from "../../types";
import { STAGE_WIDTH, STAGE_HEIGHT, FONT_PRIMARY, FONT_TITLE, COLOR_MINIGAME_TEXT } from "../../constants";
import { Hearts } from "../../gamestate"; 

export class TryAgainScreenView implements View {
  private group: Konva.Group;
  private titleText: Konva.Text;
  private subtitleText: Konva.Text;
  private hintText: Konva.Text;
  private restartButton: Konva.Group;
  private buttonText: Konva.Text;

  constructor(message: string, onRestartClick: () => void) {
    this.group = new Konva.Group({ visible: false });

    // Background
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

    // Scroll overlay
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

    // Title 
    this.titleText = new Konva.Text({
      x: STAGE_WIDTH / 2 - 320,
      y: STAGE_HEIGHT * 0.30 - 40,
      width: 640,
      text: "OOPS! Try Again!",
      fontSize: 48,
      fontFamily: FONT_TITLE,
      fill: "#ffcc00",
      stroke: "black",
      strokeWidth: 1,
      align: "center",
      shadowColor: "#2b1d0e",
      shadowBlur: 4,
      shadowOpacity: 0.25,
    });
    this.group.add(this.titleText);

    // Subtitle
    this.subtitleText = new Konva.Text({
      x: STAGE_WIDTH / 2 - 320,
      y: STAGE_HEIGHT * 0.33,
      width: 640,
      text: "You chose the wrong option and lost money!",
      fontSize: 24,
      fontFamily: FONT_PRIMARY,
      fill: COLOR_MINIGAME_TEXT,
      align: "center",
    });
    this.group.add(this.subtitleText);

    // Hint will take message to display
    this.hintText = new Konva.Text({
      x: STAGE_WIDTH / 2 - 340,
      y: STAGE_HEIGHT * 0.40,
      width: 680,
      text: message, 
      fontSize: 20,
      fontFamily: FONT_PRIMARY,
      fill: COLOR_MINIGAME_TEXT,
      align: "left",
      lineHeight: 1.35,
    });
    this.group.add(this.hintText);

    // Hearts (top-right) drawn by Hearts class
    Hearts.draw(this.group);

    // Restart button
    const btnWidth = 180;
    const btnHeight = 50;
    const btnX = STAGE_WIDTH / 2;
    const btnY = STAGE_HEIGHT - 175 + btnHeight / 2;

    this.restartButton = new Konva.Group({
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
      text: "RESTART",
      fontSize: 22,
      fontFamily: FONT_PRIMARY,
      fill: "#f7e3c3",
      fontStyle: "bold",
    });

    this.restartButton.add(btnRect);
    this.restartButton.add(this.buttonText);
    this.group.add(this.restartButton);

    const click = onRestartClick;
    this.restartButton.on("click", click);

    // Hover effects
    this.restartButton.on("mouseenter", () => {
      this.group.getStage()!.container().style.cursor = "pointer";
      btnRect.fill("#3a6b40");
      this.restartButton.to({ scaleX: 1.05, scaleY: 1.05, duration: 0.1 });
    });
    this.restartButton.on("mouseleave", () => {
      this.group.getStage()!.container().style.cursor = "default";
      btnRect.fill("#26492b");
      this.restartButton.to({ scaleX: 1, scaleY: 1, duration: 0.1 });
    });
  }
  
  
  updateMessage(newMessage: string): void {
    this.hintText.text(newMessage);
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
