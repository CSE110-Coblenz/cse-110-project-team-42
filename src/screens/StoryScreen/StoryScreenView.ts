import Konva from "konva";
import type { View } from "../../types";
import { STAGE_WIDTH, STAGE_HEIGHT, FONT_TITLE, FONT_PRIMARY, COLOR_MINIGAME_TEXT } from "../../constants";
import { Hearts } from "../../gamestate";

type ContinueCallback = () => void;

export class StoryScreenView implements View {
  private group: Konva.Group;
  private onContinue: ContinueCallback;

  constructor(onContinue: ContinueCallback) {
    this.group = new Konva.Group({ visible: false });
    this.onContinue = onContinue;
    this.setupUI();
    Hearts.draw(this.group);
  }

  private setupUI(): void {
    // 1. Background
    const bgImage = new Image();
    bgImage.src = "/menu.png"; 
    
    const bg = new Konva.Image({
      x: 0,
      y: 0,
      width: STAGE_WIDTH,
      height: STAGE_HEIGHT,
      image: undefined,
    });
    this.group.add(bg);

    bgImage.onload = () => {
      const scale = Math.max(STAGE_WIDTH / bgImage.width, STAGE_HEIGHT / bgImage.height);
      const w = bgImage.width * scale;
      const h = bgImage.height * scale;
      bg.image(bgImage);
      bg.width(w);
      bg.height(h);
      bg.x((STAGE_WIDTH - w) / 2);
      bg.y((STAGE_HEIGHT - h) / 2);
      this.group.getLayer()?.batchDraw();
    };

    // Dark overlay for readability
    const overlay = new Konva.Rect({
        width: STAGE_WIDTH,
        height: STAGE_HEIGHT,
        fill: "rgba(0,0,0,0.7)",
    });
    this.group.add(overlay);

    // 2. Story Text
    const storyText = 
      "Welcome to the Math Dungeon.\n\n" +
"To escape, you must conquer three challenges that will test your mind, not just your luck.\n" +
"In each challenge, you must use your knowledge of Expected Value to choose the best odds and come out ahead.\n\n" +
"You begin with a set number of lives. Be warned: failing a challenge will cost you one.\n" +
"Should you lose a life, you'll get a chance to try the challenge again.\n" +
"But if you run out of lives completely, your quest is over.\n\n" +
"Analyze every option carefully. Your survival depends on it. Good luck!"

    const textNode = new Konva.Text({
        x: STAGE_WIDTH / 2 - 500,
        y: 120,
        width: 1000,
        text: storyText,
        align: "center",
        fontSize: 24,
        fontFamily: FONT_PRIMARY,
        fill: COLOR_MINIGAME_TEXT,
        lineHeight: 1.35,
        shadowColor: "black",
        shadowBlur: 5,
        shadowOffset: { x: 2, y: 2 },
    });
    this.group.add(textNode);

    // 3. Continue Button
    const buttonWidth = 240;
    const buttonHeight = 80;

    const buttonGroup = new Konva.Group({ 
        x: STAGE_WIDTH / 2, 
        y: STAGE_HEIGHT - 150 + buttonHeight / 2,
        offsetX: buttonWidth / 2,
        offsetY: buttonHeight / 2
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
    });

    const buttonText = new Konva.Text({
      text: "CONTINUE",
      width: 240,
      height: 80,
      align: "center",
      verticalAlign: "middle",
      fontSize: 24,
      fontFamily: FONT_PRIMARY,
      fill: "#f7e3c3",
      fontStyle: "bold",
    });

    buttonGroup.add(buttonRect, buttonText);

    buttonGroup.on("click tap", () => this.onContinue());
    buttonGroup.on("mouseenter", () => {
        this.group.getStage()!.container().style.cursor = "pointer";
        buttonRect.fill("#3a6b40");
        buttonGroup.to({ scaleX: 1.05, scaleY: 1.05, duration: 0.1 });
    });
    buttonGroup.on("mouseleave", () => {
        this.group.getStage()!.container().style.cursor = "default";
        buttonRect.fill("#26492b");
        buttonGroup.to({ scaleX: 1, scaleY: 1, duration: 0.1 });
    });

    this.group.add(buttonGroup);
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

