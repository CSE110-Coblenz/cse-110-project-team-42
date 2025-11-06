import Konva from "konva";
import type { View, CardGameOption } from "../../types";
import { STAGE_WIDTH, STAGE_HEIGHT } from "../../constants";

type OptionClickCallback = (option: CardGameOption) => void;

export class CardGameScreenView implements View {
  private group: Konva.Group;
  private onOptionClick: OptionClickCallback;

  constructor(options: CardGameOption[], onOptionClick: OptionClickCallback) {
    this.group = new Konva.Group({ visible: false });
    this.onOptionClick = onOptionClick;
    this.setupUI(options);
  }

  private setupUI(options: CardGameOption[]): void {
    // 1. Create and add the background image placeholder first
    const bg = new Konva.Image({
      x: 0,
      y: 0,
      width: STAGE_WIDTH,
      height: STAGE_HEIGHT,
    });
    this.group.add(bg);

    // 2. Add all other elements on top of it
    const title = new Konva.Text({
      x: 0,
      y: 30,
      width: STAGE_WIDTH,
      align: "center",
      text: "Card Game Rules",
      fontSize: 32,
      fontFamily: "serif",
      fill: "#f7e3c3",
    });
    this.group.add(title);

    const rules = new Konva.Text({
      x: 0,
      y: 80,
      width: STAGE_WIDTH,
      align: "center",
      text: "Draw a card from the deck.\nIf you get a face card, you win!\nChoose one option to run 1000 times.",
      fontSize: 18,
      fill: "#f7e3c3",
      lineHeight: 1.4,
    });
    this.group.add(rules);

    options.forEach((opt, i) => {
      const optionGroup = this.createOptionPanel(opt, i);
      this.group.add(optionGroup);
    });
    
    // 3. Load the image and set it on the placeholder
    const bgImage = new Image();
    bgImage.src = "/bg.png";
    bgImage.onload = () => {
      bg.image(bgImage);
      this.group.getLayer()?.draw();
    };
  }

  private createOptionPanel(opt: CardGameOption, index: number): Konva.Group {
    const groupWidth = 200;
    const totalWidth = groupWidth * 3 + 100;
    const startX = (STAGE_WIDTH - totalWidth) / 2;
    const panelX = startX + index * (groupWidth + 50);

    const optionGroup = new Konva.Group({ x: panelX, y: 170 });

    const cardPlaceholder = new Konva.Rect({
      x: 30,
      y: 0,
      width: 140,
      height: 200,
      fill: "#fff",
      cornerRadius: 10,
      stroke: "#000",
      strokeWidth: 3,
    });

    const cardText = new Konva.Text({
      x: 30,
      y: 70,
      width: 140,
      align: "center",
      text: `${opt.card} ♠`,
      fontSize: 60,
      fontFamily: "serif",
      fill: "#000",
    });

    const button = new Konva.Rect({
      x: 0,
      y: 220,
      width: 200,
      height: 80,
      fill: "#26492b",
      cornerRadius: 8,
      shadowColor: "black",
      shadowBlur: 10,
      shadowOffsetY: 5,
    });

    const buttonText = new Konva.Text({
      x: 0,
      y: 235,
      width: 200,
      align: "center",
      text: opt.label,
      fontSize: 18,
      fill: "#c93a32",
      fontFamily: "sans-serif",
      fontStyle: "bold",
      lineHeight: 1.2,
    });

    optionGroup.add(cardPlaceholder, cardText, button, buttonText);

    optionGroup.on("click", () => {
      this.onOptionClick(opt);
    });

    optionGroup.on("mouseenter", () => {
      this.group.getStage()!.container().style.cursor = "pointer";
      button.to({
        scaleX: 1.05,
        scaleY: 1.05,
        duration: 0.2,
      });
      optionGroup.getLayer()?.draw();
    });

    optionGroup.on("mouseleave", () => {
      this.group.getStage()!.container().style.cursor = "default";
      button.to({
        scaleX: 1,
        scaleY: 1,
        duration: 0.2,
      });
      optionGroup.getLayer()?.draw();
    });

    return optionGroup;
  }

  show(): void {
    this.group.show();
    this.group.getLayer()?.batchDraw();
  }

  hide(): void {
    this.group.hide();
    this.group.getLayer()?.batchDraw();
  }

  getGroup(): Konva.Group {
    return this.group;
  }
}
