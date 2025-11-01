import Konva from "konva";
import { GAME_CONFIG } from "./config";

interface TryAgainOptions {
  containerId: string;
  hearts: number;
  onRestart?: () => void; 
}

export class TryAgain {
  private stage: Konva.Stage;
  private layer: Konva.Layer;

  private bg: Konva.Image;
  private scroll: Konva.Image;

  private title!: Konva.Text;
  private subtitle!: Konva.Text;
  private hint!: Konva.Text;

  private hearts: Konva.Path[] = [];
  private heartCount: number;

  private button!: Konva.Rect;
  private buttonText!: Konva.Text;

  private bgLoaded = false;
  private scrollLoaded = false;

  constructor(private options: TryAgainOptions) {
    const { WIDTH, HEIGHT } = GAME_CONFIG;

    this.stage = new Konva.Stage({
      container: options.containerId,
      width: WIDTH,
      height: HEIGHT,
    });

    this.layer = new Konva.Layer();
    this.stage.add(this.layer);

    this.bg = new Konva.Image();
    this.scroll = new Konva.Image();

    this.heartCount = options.hearts;

    this.loadAssets();
  }

  private loadAssets() {
    const bgImage = new Image();
    const scrollImage = new Image();

    bgImage.src = GAME_CONFIG.ASSETS.BACKGROUND;
    scrollImage.src = GAME_CONFIG.ASSETS.SCROLL;

    bgImage.onload = () => {
      this.bg.image(bgImage);
      this.bgLoaded = true;
      this.tryDrawScene();
    };

    scrollImage.onload = () => {
      this.scroll.image(scrollImage);
      this.scrollLoaded = true;
      this.tryDrawScene();
    };
  }

  private tryDrawScene() {
    if (this.bgLoaded && this.scrollLoaded) this.drawScene();
  }

  private drawScene() {
    const { WIDTH, HEIGHT } = GAME_CONFIG;

    this.bg.width(WIDTH);
    this.bg.height(HEIGHT);

    this.scroll.width(WIDTH);
    this.scroll.height(HEIGHT);

    this.layer.destroyChildren();
    this.layer.add(this.bg);
    this.layer.add(this.scroll);

    // Title
    this.title = new Konva.Text({
      text: "OOPS! Try Again!",
      fontSize: 42,
      fontFamily: "'Times New Roman', serif",
      fill: "#e6d5c3",
      align: "center",
      width: WIDTH * 0.8,
      x: WIDTH * 0.1,
      y: HEIGHT * 0.30,
      shadowColor: "#2b1d0e",
      shadowBlur: 4,
      shadowOpacity: 0.35,
    });
    this.layer.add(this.title);

    // Subtitle
    this.subtitle = new Konva.Text({
      text: "You chose the wrong option and lost money!",
      fontSize: 26,
      fontFamily: "'Times New Roman', serif",
      fill: "#e6d5c3",
      align: "center",
      width: WIDTH * 0.85,
      x: WIDTH * 0.075,
      y: HEIGHT * 0.45,
    });
    this.layer.add(this.subtitle);

    // Hint
    this.hint = new Konva.Text({
      text:
        "Hint: Expected Value = (Payoff)(Probability of winning)\n" +
        "       − (Buy in)(Probability of losing)",
      fontSize: 22,
      fontFamily: "'Times New Roman', serif",
      fill: "#e6d5c3",
      align: "center",
      lineHeight: 1.35,
      width: WIDTH * 0.9,
      x: WIDTH * 0.05,
      y: HEIGHT * 0.50,
    });
    this.layer.add(this.hint);

    // Hearts 
    this.drawHearts(WIDTH, HEIGHT);

    // Restart button (green with red text like the screenshot)
    const btnWidth = 200;
    const btnHeight = 60;
    const btnX = WIDTH / 2 - btnWidth / 2;
    const btnY = HEIGHT * 0.68;

    this.button = new Konva.Rect({
      x: btnX,
      y: btnY,
      width: btnWidth,
      height: btnHeight,
      cornerRadius: 12,
      fill: "#5e8a5c",
      stroke: "#2b1d0e",
      strokeWidth: 3,
      shadowColor: "#000",
      shadowBlur: 8,
      shadowOpacity: 0.25,
      shadowOffset: { x: 0, y: 3 },
    });

    this.buttonText = new Konva.Text({
      text: "RESTART",
      fontFamily: "'Times New Roman', serif",
      fontSize: 28,
      fill: "#c43b33",
      x: btnX,
      y: btnY + (btnHeight - 28) / 2 - 2,
      width: btnWidth,
      align: "center",
    });

    const handleClick = () => {
      if (this.options.onRestart) {
        this.options.onRestart();
      } else {
        alert("Restart clicked");
      }
    };

    this.button.on("click", handleClick);
    this.buttonText.on("click", handleClick);

    this.button.on("mouseover", () => (document.body.style.cursor = "pointer"));
    this.button.on("mouseout", () => (document.body.style.cursor = "default"));
    this.buttonText.on("mouseover", () => (document.body.style.cursor = "pointer"));
    this.buttonText.on("mouseout", () => (document.body.style.cursor = "default"));

    this.layer.add(this.button);
    this.layer.add(this.buttonText);

    this.layer.batchDraw();
  }

  private drawHearts(width: number, height: number) {
    const heartSize = 30;
    const spacing = 10;
    const startX = width - (heartSize + spacing) * this.heartCount - 20;
    const y = 20;

    const heartPath =
      "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 " +
      "4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 " +
      "14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 " +
      "6.86-8.55 11.54L12 21.35z";

    this.hearts = [];
    for (let i = 1; i < this.heartCount; i++) {
      const heart = new Konva.Path({
        x: startX + i * (heartSize + spacing),
        y: y,
        scaleX: heartSize / 24,
        scaleY: heartSize / 24,
        data: heartPath,
        fill: "red",
        stroke: "darkred",
        strokeWidth: 1.5,
      });
      this.hearts.push(heart);
      this.layer.add(heart);
    }
  }

  public setHearts(count: number) {
    this.heartCount = count;
    this.drawScene();
  }
}
