import Konva from "konva";
import type { View } from "../../types";
import { STAGE_WIDTH, STAGE_HEIGHT, FONT_TITLE, FONT_PRIMARY } from "../../constants";

export class LoseScreenView implements View {
  private group: Konva.Group;
  private background: Konva.Image;
  private overlay: Konva.Rect;
  private congratsText: Konva.Text;
  private restartButton: Konva.Group; // Changed to Group
  private onRestart: () => void;

  constructor(onRestart: () => void) {
    this.onRestart = onRestart;
    this.group = new Konva.Group();

    // === Background ===
    this.background = new Konva.Image({
      x: 0,
      y: 0,
      width: STAGE_WIDTH,
      height: STAGE_HEIGHT,
      image: undefined,
    });
    this.group.add(this.background);

    const bg = new Image();
    bg.src = "/win.jpg";
    bg.onload = () => {
      this.background.image(bg);
      this.group.getLayer()?.draw();
    };

    // === Soft Dark Overlay (美化效果) ===
    this.overlay = new Konva.Rect({
      x: 0,
      y: 0,
      width: STAGE_WIDTH,
      height: STAGE_HEIGHT,
      fill: "rgba(0,0,0,0.35)",
    });
    this.group.add(this.overlay);

    // === "You Lost" Text ===
    this.congratsText = new Konva.Text({
      text: "You Lost",
      fontSize: 64,
      fill: "#ffcc00", // Gold color
      stroke: "black",
      strokeWidth: 1,
      fontFamily: FONT_TITLE,
      fontStyle: "bold",
      width: STAGE_WIDTH,
      align: "center",
      y: STAGE_HEIGHT * 0.22,
      shadowColor: "black",
      shadowBlur: 20,
    });
    this.group.add(this.congratsText);

    // === Restart Button (Group) ===
    const buttonWidth = 240;
    const buttonHeight = 80;
    
    this.restartButton = new Konva.Group({
      x: STAGE_WIDTH / 2,
      y: STAGE_HEIGHT * 0.70 + buttonHeight / 2,
      offsetX: buttonWidth / 2,
      offsetY: buttonHeight / 2,
    });

    const buttonRect = new Konva.Rect({
      width: buttonWidth,
      height: buttonHeight,
      fill: "#26492b", // Greenish
      stroke: "#f7e3c3", // Cream
      strokeWidth: 2,
      cornerRadius: 10,
      shadowColor: "black",
      shadowBlur: 10,
      shadowOffsetY: 5,
    });

    const buttonText = new Konva.Text({
      text: "RESTART",
      width: 240,
      height: 80,
      align: "center",
      verticalAlign: "middle",
      fontSize: 24,
      fontFamily: FONT_PRIMARY,
      fill: "#f7e3c3",
      fontStyle: "bold",
    });

    this.restartButton.add(buttonRect, buttonText);
    this.group.add(this.restartButton);

    // === Button Interaction ===
    this.restartButton.on("mouseenter", () => {
      this.group.getStage()!.container().style.cursor = "pointer";
      buttonRect.fill("#3a6b40");
      this.restartButton.to({ scaleX: 1.05, scaleY: 1.05, duration: 0.1 });
    });

    this.restartButton.on("mouseleave", () => {
      this.group.getStage()!.container().style.cursor = "default";
      buttonRect.fill("#26492b");
      this.restartButton.to({ scaleX: 1, scaleY: 1, duration: 0.1 });
    });

    this.restartButton.on("click tap", () => {
        this.onRestart();
    });

    // === LOSE GIF ===
    const gifImg = document.createElement('img');
    gifImg.src = '/lose.gif';
    gifImg.style.position = 'absolute';
    gifImg.style.left = '50%';
    gifImg.style.top = '50%';
    gifImg.style.transform = 'translate(-50%, -50%)';
    gifImg.style.width = '300px';
    gifImg.style.height = 'auto';
    gifImg.style.pointerEvents = 'none';
    gifImg.style.filter = 'drop-shadow(0px 4px 18px rgba(0, 0, 0, 0.5))';
    gifImg.style.zIndex = '10';
    
    (this as any).gifElement = gifImg;
    
    const container = document.getElementById('container');
    if (container) {
      container.appendChild(gifImg);
      gifImg.style.display = 'none';
    }
  }

  getGroup(): Konva.Group {
    return this.group;
  }

  show(): void {
    this.group.visible(true);
    const gifElement = (this as any).gifElement as HTMLImageElement;
    if (gifElement) {
      gifElement.style.display = 'block';
    }
  }

  hide(): void {
    this.group.visible(false);
    const gifElement = (this as any).gifElement as HTMLImageElement;
    if (gifElement) {
      gifElement.style.display = 'none';
    }
  }
}
