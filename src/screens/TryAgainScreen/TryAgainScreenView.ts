import Konva from "konva";
import type { View } from "../../types";
import { STAGE_WIDTH, STAGE_HEIGHT } from "../../constants";
import { Hearts } from "../../gamestate"; 

export class TryAgainScreenView implements View {
  private group: Konva.Group;
  private titleText: Konva.Text;
  private subtitleText: Konva.Text;
  private hintText: Konva.Text;
  private restartButton: Konva.Rect;
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

    // Title 
    this.titleText = new Konva.Text({
      x: STAGE_WIDTH / 2 - 320,
      y: STAGE_HEIGHT * 0.30 - 40,
      width: 640,
      text: "OOPS! Try Again!",
      fontSize: 40,
      fontFamily: "Georgia",
      fill: "#ffffffff",
      align: "center",
      shadowColor: "#2b1d0e",
      shadowBlur: 4,
      shadowOpacity: 0.25,
    });
    this.group.add(this.titleText);

    // Subtitle
    this.subtitleText = new Konva.Text({
      x: STAGE_WIDTH / 2 - 320,
      y: STAGE_HEIGHT * 0.42,
      width: 640,
      text: "You chose the wrong option and lost money!",
      fontSize: 24,
      fontFamily: "Georgia",
      fill: "#ffffffff",
      align: "center",
    });
    this.group.add(this.subtitleText);

    // Hint will take message to display
    this.hintText = new Konva.Text({
      x: STAGE_WIDTH / 2 - 340,
      y: STAGE_HEIGHT * 0.50,
      width: 680,
      text: message, 
      fontSize: 20,
      fontFamily: "Georgia",
      fill: "#ffffffff",
      align: "center",
      lineHeight: 1.35,
    });
    this.group.add(this.hintText);

    // Hearts (top-right) drawn by Hearts class
    Hearts.draw(this.group);

    // Restart button
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

  refreshHearts(): void {
    Hearts.draw(this.group);
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
