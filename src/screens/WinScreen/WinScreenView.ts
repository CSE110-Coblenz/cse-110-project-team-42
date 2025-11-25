import Konva from "konva";
import type { View } from "../../types";
import { STAGE_WIDTH, STAGE_HEIGHT } from "../../constants";

export class WinScreenView implements View {
  private group: Konva.Group;
  private background: Konva.Image;
  private overlay: Konva.Rect;
  private congratsText: Konva.Text;
  private restartButton: Konva.Rect;
  private restartText: Konva.Text;
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

    // === Congratulations Text (金色渐变效果) ===
    this.congratsText = new Konva.Text({
      text: "🎉 Congratulations! 🎉",
      fontSize: 54,
      fillLinearGradientColorStops: [0, "#ffeb3b", 1, "#ff9800"],
      fillLinearGradientStartPoint: { x: 0, y: 0 },
      fillLinearGradientEndPoint: { x: 0, y: 50 },
      fontStyle: "bold",
      width: STAGE_WIDTH,
      align: "center",
      y: STAGE_HEIGHT * 0.22,
      shadowColor: "black",
      shadowBlur: 20,
    });
    this.group.add(this.congratsText);

    // === Restart Button ===
    const buttonWidth = 240;
    const buttonHeight = 70;

    this.restartButton = new Konva.Rect({
      x: (STAGE_WIDTH - buttonWidth) / 2,
      y: STAGE_HEIGHT * 0.70,
      width: buttonWidth,
      height: buttonHeight,
      cornerRadius: 16,
      fillLinearGradientColorStops: [0, "#ffffff", 1, "#e0e0e0"],
      fillLinearGradientStartPoint: { x: 0, y: 0 },
      fillLinearGradientEndPoint: { x: 0, y: buttonHeight },
      shadowBlur: 15,
      shadowColor: "black",
      shadowOpacity: 0.3,
    });

    this.restartText = new Konva.Text({
      text: "Restart",
      fontSize: 28,
      fill: "black",
      fontStyle: "bold",
      width: STAGE_WIDTH,
      align: "center",
      y: STAGE_HEIGHT * 0.70 + (buttonHeight - 28) / 2,
    });

    this.group.add(this.restartButton);
    this.group.add(this.restartText);

    // === Button Interaction ===
    this.restartButton.on("pointerover", () => {
      this.restartButton.scale({ x: 1.05, y: 1.05 });
      this.group.getLayer()?.batchDraw();
    });

    this.restartButton.on("pointerout", () => {
      this.restartButton.scale({ x: 1, y: 1 });
      this.group.getLayer()?.batchDraw();
    });

    this.restartButton.on("pointerdown", () => {
      this.restartButton.to({
        scaleX: 0.92,
        scaleY: 0.92,
        duration: 0.05,
      });
    });

    this.restartButton.on("pointerup", () => {
      // Small click animation
      this.restartButton.to({
        scaleX: 1,
        scaleY: 1,
        duration: 0.1,
      });

      // Call user-provided callback
      this.onRestart();
    });
  }

  getGroup(): Konva.Group {
    return this.group;
  }

  show(): void {
    this.group.visible(true);
  }

  hide(): void {
    this.group.visible(false);
  }
}
