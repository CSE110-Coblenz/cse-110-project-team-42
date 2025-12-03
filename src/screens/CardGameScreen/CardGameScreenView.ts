import Konva from "konva";
import type { View, CardGameOption } from "../../types";
import { STAGE_WIDTH, STAGE_HEIGHT, OPTIONS_COLORS, FONT_TITLE, FONT_PRIMARY, COLOR_MINIGAME_TEXT, FONT_SIZE_BUTTON } from "../../constants";
import { Hearts, Timer } from "../../gamestate";

type OptionClickCallback = (index: number) => void;

export class CardGameScreenView implements View {
  private group: Konva.Group;
  private buttonsGroup: Konva.Group;
  private onOptionClick: OptionClickCallback;
  private options: CardGameOption[];

  constructor(options: CardGameOption[], onOptionClick: OptionClickCallback) {
    this.group = new Konva.Group({ visible: false });
    this.buttonsGroup = new Konva.Group();
    this.options = options;
    this.onOptionClick = onOptionClick;
    
    this.setupUI();
    this.group.add(this.buttonsGroup);
    
    // Initial build
    this.buildOptionButtons();
    
    Hearts.draw(this.group);
    Timer.draw(this.group);

    // === DEALER GIF ===
    const gifImg = document.createElement('img');
    gifImg.src = '/dealer.gif';
    gifImg.style.position = 'absolute';
    gifImg.style.left = '50%';
    gifImg.style.top = '50%';
    gifImg.style.transform = 'translate(-50%, -50%)';
    gifImg.style.width = '320px';
    gifImg.style.height = 'auto';
    gifImg.style.pointerEvents = 'none';
    gifImg.style.filter = 'drop-shadow(0px 4px 18px rgba(0, 0, 0, 0.35))';
    gifImg.style.zIndex = '10';
    gifImg.style.border = '3px solid #fef6dc';
    gifImg.style.borderRadius = '7px';
    
    (this as any).gifElement = gifImg;
    
    const container = document.getElementById('container');
    if (container) {
      container.appendChild(gifImg);
      gifImg.style.display = 'none';
    }
  }

  private setupUI(): void {
    // 1. Create and add the background image placeholder first
    const bg = new Konva.Image({
      x: 0,
      y: 0,
      width: STAGE_WIDTH,
      height: STAGE_HEIGHT,
      image: undefined,
    });
    this.group.add(bg);

    // 2. Add all other elements on top of it
    const title = new Konva.Text({
      x: 0,
      y: 50,
      width: STAGE_WIDTH,
      align: "center",
      text: "Card Game Rules",
      fontSize: 32,
      fontFamily: FONT_TITLE,
      fontStyle: "bold",
      fill: COLOR_MINIGAME_TEXT,
    });
    this.group.add(title);

    const rules = new Konva.Text({
      x: 0,
      y: 90,
      width: STAGE_WIDTH,
      align: "center",
      text: "Draw a card from the deck.\nIf you get a face card, you win!\nWhich game setup would you choose to play 10,000 rounds?.",
      fontSize: 26,
      fontFamily: FONT_PRIMARY,
      fill: COLOR_MINIGAME_TEXT,
      lineHeight: 1.5,
    });
    this.group.add(rules);


    // Add decorative money images
    const moneyImage = new Image();
    moneyImage.src = "/money.png";
    moneyImage.onload = () => {
        const leftMoney = new Konva.Image({
            image: moneyImage,
            x: 50,
            y: 50,
            width: 150,
            height: 150,
            opacity: 0.8,
            rotation: -5,
        });
        const rightMoney = new Konva.Image({
            image: moneyImage,
            x: STAGE_WIDTH - 200,
            y: 50,
            width: 150,
            height: 150,
            opacity: 0.8,
            rotation: 5,
        });
        this.group.add(leftMoney, rightMoney);
        leftMoney.zIndex(2);
        rightMoney.zIndex(2);

        const jiggle = (image: Konva.Image, rotation: number) => {
            image.to({
                rotation: -rotation,
                duration: 1,
                easing: Konva.Easings.EaseInOut,
                onFinish: () => jiggle(image, -rotation),
            });
        };

        jiggle(leftMoney, -5);
        jiggle(rightMoney, 5);

        this.group.getLayer()?.draw();
    };
    
    // 3. Load the image and set it on the placeholder
    const bgImage = new Image();
    bgImage.src = "/bg.png";
    bgImage.onload = () => {
      bg.image(bgImage);
      this.group.getLayer()?.draw();
    };
  }

  // Follows RouletteScreenView pattern: destroy children and rebuild
  private buildOptionButtons(): void {
    this.buttonsGroup.destroyChildren();

    const groupWidth = 240;
    const spacing = 50;
    const totalWidth = groupWidth * 3 + spacing * 2;
    const startX = (STAGE_WIDTH - totalWidth) / 2;

    this.options.forEach((opt, index) => {
        const panelX = startX + index * (groupWidth + spacing);
        const optionGroup = new Konva.Group({ x: panelX, y: 540 });

        const button = new Konva.Rect({
          x: 0,
          y: 0,
          width: 240,
          height: 100,
          fill: OPTIONS_COLORS[index],
          cornerRadius: 8,
          shadowColor: "black",
          shadowBlur: 10,
          shadowOffsetY: 5,
        });

        const buttonText = new Konva.Text({
          x: 0,
          y: 15,
          width: 240,
          align: "center",
          text: opt.label,
          fontSize: FONT_SIZE_BUTTON,
          fill: COLOR_MINIGAME_TEXT,
          fontFamily: FONT_PRIMARY,
          fontStyle: "bold",
          lineHeight: 1.4,
          shadowColor: "black",
          shadowBlur: 2
        });

        optionGroup.add(button, buttonText);
        
        // Interaction logic
        optionGroup.on("click tap", () => {
            this.onOptionClick(index);
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

        this.buttonsGroup.add(optionGroup);
    });
  }

  updateOptions(options: CardGameOption[]): void {
      this.options = options;
      this.buildOptionButtons();
      this.group.getLayer()?.batchDraw();
  }

  show(): void {
    this.group.show();
    this.group.getLayer()?.batchDraw();
    const gifElement = (this as any).gifElement as HTMLImageElement;
    if (gifElement) {
      gifElement.style.display = 'block';
    }
  }

  hide(): void {
    this.group.hide();
    this.group.getLayer()?.batchDraw();
    const gifElement = (this as any).gifElement as HTMLImageElement;
    if (gifElement) {
      gifElement.style.display = 'none';
    }
  }

  getGroup(): Konva.Group {
    return this.group;
  }
}
