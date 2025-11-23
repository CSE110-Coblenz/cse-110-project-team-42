import Konva from "konva";
import type { View } from "../../types";
import { STAGE_WIDTH, STAGE_HEIGHT } from "../../constants";


export class WinScreenView implements View {
  private group: Konva.Group;
  private background: Konva.Image;
  private congratsText: Konva.Text;
  private restartButton: Konva.Rect;
  private restartText: Konva.Text;

  constructor() {
    this.group = new Konva.Group();

    // === Background ===
    this.background = new Konva.Image({
      x: 0,
      y: 0,
      width: STAGE_WIDTH,
      height: STAGE_HEIGHT,
    });

    // ✅ directly load win.png from /public
    Konva.Image.fromURL("/win.jpg", (imgNode) => {
      imgNode.setAttrs({
        width: STAGE_WIDTH,
        height: STAGE_HEIGHT,
      });
      this.background.image(imgNode.image());
      this.group.draw(); // refresh after image loads
    });

    // === "Congratulations!" Text (upper middle) ===
    this.congratsText = new Konva.Text({
      text: "Congratulations!",
      fontSize: 48,
      fill: "white",
      x: 0,
      y: STAGE_HEIGHT * 0.2,
      width: STAGE_WIDTH,
      align: "center",
      fontStyle: "bold",
      shadowColor: "black",
      shadowBlur: 10,
    });

    // === Restart Button (bottom middle) ===
    const buttonWidth = 200;
    const buttonHeight = 60;

    this.restartButton = new Konva.Rect({
      x: (STAGE_WIDTH - buttonWidth) / 2,
      y: STAGE_HEIGHT * 0.75,
      width: buttonWidth,
      height: buttonHeight,
      fill: "white",
      cornerRadius: 12,
      shadowBlur: 8,
      shadowColor: "black",
    });

    this.restartText = new Konva.Text({
      text: "Restart",
      fontSize: 24,
      fill: "black",
      width: STAGE_WIDTH,
      align: "center",
      x: 0,
      y: STAGE_HEIGHT * 0.75 + (buttonHeight - 24) / 2,
      fontStyle: "bold",
    });

    // === Button Interaction ===
    this.restartButton.on("pointerdown", () => {
      const newColor = this.restartButton.fill() === "white" ? "black" : "white";
      const newTextColor = newColor === "white" ? "black" : "white";
      this.restartButton.fill(newColor);
      this.restartText.fill(newTextColor);
      this.group.draw();
    });

    // === Add all elements to group ===
    this.group.add(this.background);
    this.group.add(this.congratsText);
    this.group.add(this.restartButton);
    this.group.add(this.restartText);
  }

  // ===== View Interface Methods =====
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