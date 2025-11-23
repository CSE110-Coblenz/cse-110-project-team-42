// src/screens/DiceGameScreen/DiceGameScreenView.ts

import Konva from "konva";
import type { View } from "../../types.ts";
import { STAGE_WIDTH, STAGE_HEIGHT } from "../../constants.ts";
import { Hearts } from "../../gamestate";
type ButtonRefs = {
  group: Konva.Group;
  rect: Konva.Rect;
  label: Konva.Text;
};

export class DiceGameScreenView implements View {
  private group: Konva.Group;

  private aButton!: ButtonRefs;
  private bButton!: ButtonRefs;
  private cButton!: ButtonRefs;

  private onChoiceA: () => void;
  private onChoiceB: () => void;
  private onChoiceC: () => void;

  constructor(
    onChoiceA: () => void,
    onChoiceB: () => void,
    onChoiceC: () => void
  ) {
    this.group = new Konva.Group({ visible: false });
    this.onChoiceA = onChoiceA;
    this.onChoiceB = onChoiceB;
    this.onChoiceC = onChoiceC;

    // === BACKGROUND ===
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
      Hearts.draw(this.group)
    });

    // === TITLE (More elegant) ===
    const title = new Konva.Text({
      x: 0,
      y: STAGE_HEIGHT * 0.04,
      width: STAGE_WIDTH,
      align: "center",
      text: "🎲 Dice Strategy Game",
      fontFamily: "Georgia",
      fontSize: 46,
      fill: "#ffffff",
      shadowColor: "black",
      shadowBlur: 18,
      shadowOffsetY: 3,
      fontStyle: "bold",
    });
    this.group.add(title);

    // === SUBTITLE (More elegant) ===
    const subtitle = new Konva.Text({
      x: 0,
      y: STAGE_HEIGHT * 0.13,
      width: STAGE_WIDTH,
      align: "center",
      text:
        "Choose the best option using probability, intuition, and EV.\nSmall differences matter.",
      fontFamily: "Georgia",
      fontSize: 22,
      fill: "#f6f6f6",
      lineHeight: 1.35,
      shadowColor: "black",
      shadowBlur: 10,
      shadowOpacity: 0.6,
    });
    this.group.add(subtitle);

    // === DICE IMAGE — Bigger ===
    Konva.Image.fromURL("/dice.jpg", (img) => {
      const w = 210;
      const h = 155;

      img.setAttrs({
        width: w,
        height: h,
        x: STAGE_WIDTH / 2 - w / 2,
        y: STAGE_HEIGHT * 0.30,
        listening: false,
        shadowBlur: 18,
        shadowColor: "black",
        shadowOpacity: 0.35,
      });

      this.group.add(img);
      this.group.getLayer()?.draw();
    });

    // === BUTTONS — Slightly Smaller ===
    const btnWidth = 185;
    const btnHeight = 115;
    const gap = 34;
    const totalW = btnWidth * 3 + gap * 2;
    const startX = (STAGE_WIDTH - totalW) / 2;
    const btnY = STAGE_HEIGHT * 0.72;

    this.aButton = this.createButton(startX, btnY, "", () => this.onChoiceA());
    this.bButton = this.createButton(startX + btnWidth + gap, btnY, "", () =>
      this.onChoiceB()
    );
    this.cButton = this.createButton(
      startX + (btnWidth + gap) * 2,
      btnY,
      "",
      () => this.onChoiceC()
    );

    this.group.add(this.aButton.group);
    this.group.add(this.bButton.group);
    this.group.add(this.cButton.group);

    this.group.getLayer()?.draw();
  }

  // ------------------------------------------------------------
  // BUTTON LABEL INJECTION
  // ------------------------------------------------------------
  public setButtonLabels(aText: string, bText: string, cText: string): void {
    this.aButton.label.text(aText);
    this.bButton.label.text(bText);
    this.cButton.label.text(cText);
    this.group.getLayer()?.draw();
  }

  public resetColorsToDefault(): void {
    const defaultFill = "#1e5631"; // deeper green
    this.aButton.rect.fill(defaultFill);
    this.bButton.rect.fill(defaultFill);
    this.cButton.rect.fill(defaultFill);
    this.group.getLayer()?.draw();
  }

  // ------------------------------------------------------------
  // BUTTON CREATION — SMALLER + CLEANER STYLE
  // ------------------------------------------------------------
  private createButton(
    x: number,
    y: number,
    textValue: string,
    onClick: () => void
  ): ButtonRefs {
    const group = new Konva.Group({ x, y, listening: true });

    const rect = new Konva.Rect({
      width: 185,
      height: 115,
      cornerRadius: 14,
      fill: "#1e5631",
      stroke: "#0f2d1c",
      strokeWidth: 2,
      shadowBlur: 12,
      shadowOpacity: 0.33,
      shadowColor: "black",
    });

    const label = new Konva.Text({
      text: textValue,
      fontFamily: "Arial",
      fontSize: 13.5,
      fill: "white",
      align: "center",
      width: rect.width() - 14,
      x: 7,
      y: 8,
      lineHeight: 1.2,
      shadowColor: "black",
      shadowBlur: 2,
    });

    group.add(rect, label);

    group.on("pointerdown", () => {
      group.scale({ x: 0.95, y: 0.95 });
      onClick();
      this.group.getLayer()?.draw();
    });

    group.on("pointerup pointerleave", () => {
      group.scale({ x: 1, y: 1 });
      this.group.getLayer()?.draw();
    });

    return { group, rect, label };
  }

  // ------------------------------------------------------------
  // HIGHLIGHT COLORS
  // ------------------------------------------------------------
  public setAActive(): void {
    this.aButton.rect.fill("#c62828");
    this.bButton.rect.fill("#1e5631");
    this.cButton.rect.fill("#1e5631");
    this.group.getLayer()?.draw();
  }

  public setBActive(): void {
    this.bButton.rect.fill("#7cb342");
    this.aButton.rect.fill("#1e5631");
    this.cButton.rect.fill("#1e5631");
    this.group.getLayer()?.draw();
  }

  public setCActive(): void {
    this.cButton.rect.fill("#1e88e5");
    this.aButton.rect.fill("#1e5631");
    this.bButton.rect.fill("#1e5631");
    this.group.getLayer()?.draw();
  }

  // ------------------------------------------------------------
  public show(): void {
    this.group.visible(true);
  }

  public hide(): void {
    this.group.visible(false);
  }

  public getGroup(): Konva.Group {
    return this.group;
  }
}
