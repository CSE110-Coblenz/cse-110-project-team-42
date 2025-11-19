import Konva from "konva";
import type { View } from "../../types";
import { STAGE_WIDTH, STAGE_HEIGHT } from "../../constants";
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
      "You are in a math dungeon and\n" +
      "you have to get through 2 gates in order to escape.\n\n" +
      "The gate keepers will try to play a game with you,\n" +
      "and you should use your knowledge of statistics\n" +
      "to choose the best odds.\n\n" +
      "Good luck!";

    const textNode = new Konva.Text({
        x: STAGE_WIDTH / 2 - 400,
        y: 150,
        width: 800,
        text: storyText,
        align: "center",
        fontSize: 32,
        fontFamily: "Georgia, serif",
        fill: "#e0e0e0",
        lineHeight: 1.5,
        shadowColor: "black",
        shadowBlur: 5,
        shadowOffset: { x: 2, y: 2 },
    });
    this.group.add(textNode);

    // 3. Continue Button
    const buttonGroup = new Konva.Group({ 
        x: STAGE_WIDTH / 2 - 100, 
        y: STAGE_HEIGHT - 150 
    });

    const buttonRect = new Konva.Rect({
      width: 200,
      height: 60,
      fill: "#26492b", // Greenish
      stroke: "#f7e3c3",
      strokeWidth: 2,
      cornerRadius: 10,
      shadowColor: "black",
      shadowBlur: 10,
    });

    const buttonText = new Konva.Text({
      text: "CONTINUE",
      width: 200,
      height: 60,
      align: "center",
      verticalAlign: "middle",
      fontSize: 24,
      fontFamily: "serif",
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

