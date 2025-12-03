// src/screens/DiceGameScreen/DiceGameScreenView.ts

import Konva from "konva";
import type { View } from "../../types.ts";
import { STAGE_WIDTH, STAGE_HEIGHT, OPTIONS_COLORS, FONT_TITLE, FONT_PRIMARY, COLOR_MINIGAME_TEXT, FONT_SIZE_BUTTON } from "../../constants.ts";
import { Hearts, Timer } from "../../gamestate";
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
    const background = new Konva.Image({
      x: 0,
      y: 0,
      width: STAGE_WIDTH,
      height: STAGE_HEIGHT,
      listening: false,
      image: undefined,
    });
    this.group.add(background);
    background.moveToBottom();

    const bgImage = new Image();
    bgImage.src = "/bg.png";
    bgImage.onload = () => {
      background.image(bgImage);
      this.group.getLayer()?.draw();
    };

    Hearts.draw(this.group);
    Timer.draw(this.group);

    // === TITLE (More elegant) ===
    const title = new Konva.Text({
      x: 0,
      y: STAGE_HEIGHT * 0.08,
      width: STAGE_WIDTH,
      align: "center",
      text: "🎲 Dice Strategy Game",
      fontFamily: FONT_TITLE,
      fontSize: 46,
      fill: COLOR_MINIGAME_TEXT,
      shadowColor: "black",
      shadowBlur: 18,
      shadowOffsetY: 3,
      fontStyle: "bold",
    });
    this.group.add(title);

    // === SUBTITLE (More elegant) ===
    const subtitle = new Konva.Text({
      x: 0,
      y: STAGE_HEIGHT * 0.16,
      width: STAGE_WIDTH,
      align: "center",
      text:
        "Choose the best option using probability, intuition, and EV.\nSmall differences matter.",
      fontFamily: FONT_PRIMARY,
      fontSize: 22,
      fill: COLOR_MINIGAME_TEXT,
      lineHeight: 1.35,
      shadowColor: "black",
      shadowBlur: 10,
      shadowOpacity: 0.6,
    });
    this.group.add(subtitle);

    // === DICE animation setup ===
    const diceGroup = new Konva.Group({
      x: STAGE_WIDTH / 2,
      y: STAGE_HEIGHT * 0.50,
      listening: false,
    });
    this.group.add(diceGroup);

    // helper to create a single die with a value (1–6)
    const createDie = (
      offsetX: number,
      offsetY: number,
      size: number,
      value: number
    ) => {
      const dieGroup = new Konva.Group({ x: offsetX, y: offsetY });

      const rect = new Konva.Rect({
        x: -size / 2,
        y: -size / 2,
        width: size,
        height: size,
        cornerRadius: 10,
        fill: "#fdfdfd",
        stroke: "#222222",
        strokeWidth: 3,
        shadowColor: "black",
        shadowBlur: 12,
        shadowOpacity: 0.35,
      });
      dieGroup.add(rect);

      const pipRadius = size * 0.08;
      const pipOffset = size * 0.2;

      const addPip = (px: number, py: number) => {
        dieGroup.add(
          new Konva.Circle({
            x: px,
            y: py,
            radius: pipRadius,
            fill: "#222222",
          })
        );
      };

      // simple layout for values 1–6
      if (value === 1) {
        addPip(0, 0);
      } else if (value === 2) {
        addPip(-pipOffset, -pipOffset);
        addPip(pipOffset, pipOffset);
      } else if (value === 3) {
        addPip(-pipOffset, -pipOffset);
        addPip(0, 0);
        addPip(pipOffset, pipOffset);
      } else if (value === 4) {
        addPip(-pipOffset, -pipOffset);
        addPip(pipOffset, -pipOffset);
        addPip(-pipOffset, pipOffset);
        addPip(pipOffset, pipOffset);
      } else if (value === 5) {
        addPip(-pipOffset, -pipOffset);
        addPip(pipOffset, -pipOffset);
        addPip(0, 0);
        addPip(-pipOffset, pipOffset);
        addPip(pipOffset, pipOffset);
      } else if (value === 6) {
        addPip(-pipOffset, -pipOffset);
        addPip(pipOffset, -pipOffset);
        addPip(-pipOffset, 0);
        addPip(pipOffset, 0);
        addPip(-pipOffset, pipOffset);
        addPip(pipOffset, pipOffset);
      }

      return dieGroup;
    };

    const dieSize = 70;

    // three dice with different faces, slightly offset
    diceGroup.add(createDie(-90, 0, dieSize, 2));
    diceGroup.add(createDie(0, -10, dieSize, 5));
    diceGroup.add(createDie(90, 5, dieSize, 3));

    // === DICE ANIMATION (gentle bob + tilt) ===
    const startDiceAnimation = () => {
      const layer = this.group.getLayer();
      if (!layer) return;

      const baseY = diceGroup.y();
      const baseRotation = diceGroup.rotation();

      const anim = new Konva.Animation((frame) => {
        if (!frame) return;
        const t = frame.time / 1000;
        diceGroup.y(baseY + Math.sin(t * 2) * 6);
        diceGroup.rotation(baseRotation + Math.sin(t * 1.5) * 4);
      }, layer);

      anim.start();
    };

    // defer until the group is actually on a layer
    setTimeout(startDiceAnimation, 0);


    // === BUTTONS ===
    const btnWidth = 210;
    const btnHeight = 125;
    const gap = 30;
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
    this.aButton.rect.fill(OPTIONS_COLORS[0]);
    this.bButton.rect.fill(OPTIONS_COLORS[1]);
    this.cButton.rect.fill(OPTIONS_COLORS[2]);
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
      width: 210,
      height: 125,
      cornerRadius: 14,
      fill: OPTIONS_COLORS[0],
      stroke: "#0f2d1c",
      strokeWidth: 2,
      shadowBlur: 12,
      shadowOpacity: 0.33,
      shadowColor: "black",
    });

    const label = new Konva.Text({
      text: textValue,
      fontFamily: FONT_PRIMARY,
      fontSize: FONT_SIZE_BUTTON,
      fontStyle: "bold",
      fill: COLOR_MINIGAME_TEXT,
      align: "center",
      width: rect.width() - 10,
      x: 5,
      y: 10,
      lineHeight: 1.3,
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
    this.aButton.rect.fill(OPTIONS_COLORS[0]);
    this.bButton.rect.fill("#333333");
    this.cButton.rect.fill("#333333");
    this.group.getLayer()?.draw();
  }

  public setBActive(): void {
    this.bButton.rect.fill(OPTIONS_COLORS[1]);
    this.aButton.rect.fill("#333333");
    this.cButton.rect.fill("#333333");
    this.group.getLayer()?.draw();
  }

  public setCActive(): void {
    this.cButton.rect.fill(OPTIONS_COLORS[2]);
    this.aButton.rect.fill("#333333");
    this.bButton.rect.fill("#333333");
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
