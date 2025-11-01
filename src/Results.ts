import Konva from "konva";
import { GAME_CONFIG } from "./config";

interface ResultsOptions {
  containerId: string;
  resultText: string;
  hearts: number;
  onProceed?: () => void;
}

export class Results {
  private stage: Konva.Stage;
  private layer: Konva.Layer;
  private bg: Konva.Image;
  private scroll: Konva.Image;
  private text: Konva.Text;
  private hearts: Konva.Path[] = [];
  private button: Konva.Rect;
  private buttonText: Konva.Text;
  private heartCount: number;
  private resultTextValue: string;

  private bgLoaded = false;
  private scrollLoaded = false;

  constructor(private options: ResultsOptions) {
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
    this.text = new Konva.Text();
    this.button = new Konva.Rect();
    this.buttonText = new Konva.Text();

    this.heartCount = options.hearts;
    this.resultTextValue = options.resultText;

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
    if (this.bgLoaded && this.scrollLoaded) {
      this.drawScene();
    }
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

    // Result text
    this.text = new Konva.Text({
      text: this.resultTextValue,
      fontSize: 28,
      fontFamily: "'Times New Roman', serif",
      fill: "#2b1d0e",
      align: "center",
      width: WIDTH * 0.8,
      x: WIDTH * 0.1,
      y: HEIGHT * 0.3,
    });
    this.layer.add(this.text);

    // Hearts
    this.drawHearts(WIDTH, HEIGHT);

    // Proceed button
    const btnWidth = 160;
    const btnHeight = 50;

    this.button = new Konva.Rect({
      width: btnWidth,
      height: btnHeight,
      cornerRadius: 12,
      fill: "#422d1a",
      stroke: "#2b1d0e",
      strokeWidth: 3,
      x: WIDTH / 2 - btnWidth / 2,
      y: HEIGHT * 0.7,
    });

    this.buttonText = new Konva.Text({
      text: "Proceed",
      fontFamily: "'Times New Roman', serif",
      fontSize: 24,
      fill: "#fff",
      x: WIDTH / 2 - btnWidth / 2 + 35,
      y: HEIGHT * 0.7 + 12,
    });

    const handleClick = () => {
      if (this.options.onProceed) this.options.onProceed();
    };

    this.button.on("click", handleClick);
    this.buttonText.on("click", handleClick);

    this.button.on("mouseover", () => (document.body.style.cursor = "pointer"));
    this.button.on("mouseout", () => (document.body.style.cursor = "default"));

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

    for (let i = 0; i < this.heartCount; i++) {
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

  public setResultText(text: string) {
    this.resultTextValue = text;
    this.text.text(text);
    this.layer.batchDraw();
  }
}

