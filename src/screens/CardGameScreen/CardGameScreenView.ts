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
      y: 90,
      width: STAGE_WIDTH,
      align: "center",
      text: "Draw a card from a standard 52-card deck.\nIf you get a face card, you win!\nChoose one option to run 1000 times.",
      fontSize: 26,
      fontFamily: "serif",
      fill: "#f7e3c3",
      lineHeight: 1.5,
    });
    this.group.add(rules);

    // Add the new deck spread image
    const deckImage = new Image();
    deckImage.src = "/deck-spread.png";
    deckImage.onload = () => {
        const desiredWidth = 350;
        const scale = desiredWidth / deckImage.naturalWidth;
        const scaledHeight = deckImage.naturalHeight * scale;

        const deck = new Konva.Image({
            image: deckImage,
            x: STAGE_WIDTH / 2 - desiredWidth / 2,
            y: 240,
            width: desiredWidth,
            height: scaledHeight,
        });
        this.group.add(deck);
        this.group.getLayer()?.draw();
    };

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
    const spacing = 100;
    const totalWidth = groupWidth * 3 + spacing * 2;
    const startX = (STAGE_WIDTH - totalWidth) / 2;
    const panelX = startX + index * (groupWidth + spacing);

    const optionGroup = new Konva.Group({ x: panelX, y: 540 });

    const button = new Konva.Rect({
      x: 0,
      y: 0,
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
      y: 15,
      width: 200,
      align: "center",
      text: opt.label,
      fontSize: 18,
      fill: "#c93a32",
      fontFamily: "sans-serif",
      fontStyle: "bold",
      lineHeight: 1.2,
    });

    optionGroup.add(button, buttonText);

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
