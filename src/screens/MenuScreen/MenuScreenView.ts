import Konva from "konva";
import type { View } from "../../types";
import { STAGE_WIDTH, STAGE_HEIGHT } from "../../constants";
import { Hearts } from "../../gamestate";

type StartCallback = () => void;

export class MenuScreenView implements View {
  private group: Konva.Group;
  private startCallback: StartCallback;

  constructor(onStart: StartCallback) {
    this.group = new Konva.Group({ visible: false });
    this.startCallback = onStart;
    this.setupUI();
    Hearts.draw(this.group);
  }

  private setupUI(): void {
    // 1. Background Image
    const bgImage = new Image();
    bgImage.src = "/menu.png"; // Assuming menu.png exists in public based on partner's code
    
    // Create placeholder
    const bg = new Konva.Image({
      x: 0,
      y: 0,
      width: STAGE_WIDTH,
      height: STAGE_HEIGHT,
      image: undefined,
    });
    this.group.add(bg);

    bgImage.onload = () => {
      // Cover fit logic
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

    // 2. Title
    // Add a dark semi-transparent box behind title for readability
    const titleBg = new Konva.Rect({
        width: STAGE_WIDTH,
        height: 120,
        y: 80,
        fill: 'rgba(0,0,0,0.6)',
    });
    this.group.add(titleBg);

    const title = new Konva.Text({
      x: 0,
      y: 100,
      width: STAGE_WIDTH,
      align: "center",
      text: "Math Dungeon",
      fontSize: 80,
      fill: "#ffcc00", // Gold color
      stroke: "black",
      strokeWidth: 2,
      fontFamily: "Impact, serif",
      shadowColor: "black",
      shadowBlur: 10,
      shadowOffset: { x: 5, y: 5 },
      shadowOpacity: 0.8,
    });
    this.group.add(title);

    // 3. Start Button
    const buttonGroup = new Konva.Group({ 
        x: STAGE_WIDTH / 2 - 120, 
        y: STAGE_HEIGHT * 0.7 
    });

    const buttonRect = new Konva.Rect({
      width: 240,
      height: 80,
      fill: "#5c2626", // Dark red/brown
      stroke: "#ffcc00", // Gold border
      strokeWidth: 4,
      cornerRadius: 15,
      shadowColor: "black",
      shadowBlur: 15,
      shadowOffsetY: 5,
    });

    const buttonText = new Konva.Text({
      text: "ENTER",
      width: 240,
      height: 80,
      align: "center",
      verticalAlign: "middle",
      fontSize: 32,
      fontFamily: "serif",
      fill: "#ffcc00",
      fontStyle: "bold",
    });

    buttonGroup.add(buttonRect, buttonText);

    buttonGroup.on("click tap", () => this.startCallback());
    
    buttonGroup.on("mouseenter", () => {
      this.group.getStage()!.container().style.cursor = "pointer";
      buttonRect.fill("#7a3333"); // Lighter red
      buttonGroup.to({ scaleX: 1.05, scaleY: 1.05, duration: 0.1 });
    });

    buttonGroup.on("mouseleave", () => {
      this.group.getStage()!.container().style.cursor = "default";
      buttonRect.fill("#5c2626"); // Original color
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
