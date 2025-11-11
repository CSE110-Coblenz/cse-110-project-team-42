import Konva from "konva";
import type { View } from "../../types.ts";
import { STAGE_WIDTH, STAGE_HEIGHT } from "../../constants.ts";

type ButtonRefs = {
  group: Konva.Group;
  rect: Konva.Rect;
  label: Konva.Text;
};

export class DiceGameScreenView implements View {
  private group: Konva.Group;

  private aButton!: ButtonRefs;
  private bButton!: ButtonRefs;

  constructor() {
    this.group = new Konva.Group({ visible: false });

    // --- BACKGROUND IMAGE (added first, behind everything) ---
    Konva.Image.fromURL("/bg.png", (img) => {
      img.setAttrs({
        x: 0,
        y: 0,
        width: STAGE_WIDTH,
        height: STAGE_HEIGHT,
        listening: false,
      });
      this.group.add(img);
      img.moveToBottom();
      this.group.getLayer()?.draw();
    });

    // --- TOP TEXTS ("a" and "b" in upper-left and upper-right middle) ---
    const topY = STAGE_HEIGHT * 0.12;
    const margin = 40;
    const halfWidth = STAGE_WIDTH / 2 - margin;

    // Left (Choice A)
    const aText = new Konva.Text({
      x: margin,
      y: topY,
      width: halfWidth - margin,
      align: "left",
      text: "Choice A: Roll 3 dice — for every even, you get $5 back. Entry cost $10.",
      fontFamily: "Arial",
      fontSize: 26,
      fill: "#fff",
      shadowColor: "black",
      shadowBlur: 8,
    });

    // Right (Choice B)
    const bText = new Konva.Text({
      x: STAGE_WIDTH / 2 + margin,
      y: topY,
      width: halfWidth - margin,
      align: "right",
      text: "Choice B: Roll 5 dice — for every '2', you get $5 back. Entry cost $4.",
      fontFamily: "Arial",
      fontSize: 26,
      fill: "#fff",
      shadowColor: "black",
      shadowBlur: 8,
    });

    this.group.add(aText);
    this.group.add(bText);

    // --- LOWER-MIDDLE BUTTONS (side-by-side, centered) ---
    const btnWidth = 120;
    const btnHeight = 60;
    const gap = 180;
    const totalW = btnWidth * 2 + gap;
    const leftX = (STAGE_WIDTH - totalW) / 2;
    const y = STAGE_HEIGHT * 0.78;

    this.aButton = this.createButton(leftX, y, "A", "white", "#000", () => this.setAActive());
    this.group.add(this.aButton.group);

    this.bButton = this.createButton(leftX + btnWidth + gap, y, "B", "white", "#000", () => this.setBActive());
    this.group.add(this.bButton.group);

    this.group.getLayer()?.draw();
  }

  private createButton(
    x: number,
    y: number,
    label: string,
    fill: string,
    textColor: string,
    onClick: () => void
  ): ButtonRefs {
    const group = new Konva.Group({ x, y, listening: true });

    const rect = new Konva.Rect({
      width: 120,
      height: 60,
      cornerRadius: 10,
      fill,
      stroke: "#333",
      strokeWidth: 2,
      shadowBlur: 6,
      shadowOpacity: 0.25,
      shadowColor: "black",
    });

    const text = new Konva.Text({
      text: label,
      fontFamily: "Arial",
      fontSize: 28,
      fill: textColor,
      width: rect.width(),
      align: "center",
      shadowColor: "black",
      shadowBlur: 4,
    });
    text.x(0);
    text.y((rect.height() - text.height()) / 2);

    group.add(rect, text);
    group.on("pointerdown", onClick);
    rect.on("pointerdown", onClick);
    text.on("pointerdown", onClick);

    return { group, rect, label: text };
  }

  private setAActive(): void {
    this.aButton.rect.fill("red");
    this.aButton.label.fill("#fff");
    this.bButton.rect.fill("white");
    this.bButton.label.fill("#000");
    this.group.getLayer()?.draw();
  }

  private setBActive(): void {
    this.bButton.rect.fill("green");
    this.bButton.label.fill("#fff");
    this.aButton.rect.fill("white");
    this.aButton.label.fill("#000");
    this.group.getLayer()?.draw();
  }

  show(): void {
    this.group.visible(true);
   // this.group.getLayer()?.draw();
  }

  hide(): void {
    this.group.visible(false);
    //this.group.getLayer()?.draw();
  }

  getGroup(): Konva.Group {
    return this.group;
  }
}
