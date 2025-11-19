import Konva from "konva";
import { STAGE_WIDTH, STAGE_HEIGHT } from "../../constants";
import type { ScreenSwitcher } from "../../types.ts";

/**
 * Story Screen — shows the intro story and Continue button.
 */
export class StoryScreen {
  private group: Konva.Group;
  private bg: Konva.Image;
  private storyText: Konva.Text;
  private btnGroup: Konva.Group;
  private btnText: Konva.Text;
  private btnHit: Konva.Rect;

  private isVisible = false;
  private onContinue?: () => void;

  constructor(private switcher?: ScreenSwitcher) {
    this.group = new Konva.Group({ visible: false });

    // ---- Background ----
    this.bg = new Konva.Image({ listening: false, image: undefined });
    this.group.add(this.bg);
    this.loadBackground("/menu.png");

    // ---- Story Text ----
    const copy =
      "You are in a math dungeon and\n" +
      "you have to get through 2 gates in order to escape.\n" +
      "The gate keepers will try to play a game with you,\n" +
      "and you should use your knowledge of statistics\n" +
      "to choose the best odds.\n\nGood luck!";

    this.storyText = new Konva.Text({
      text: copy,
      width: Math.min(800, STAGE_WIDTH * 0.8),
      align: "center",
      fontSize: 48,
      lineHeight: 1.25,
      fontFamily: "Impact, Haettenschweiler, 'Arial Black', sans-serif",
      fill: "#ffffff",
      stroke: "#000000",
      strokeWidth: 2,
      shadowColor: "rgba(0,0,0,0.5)",
      shadowBlur: 8,
      shadowOffset: { x: 3, y: 3 },
      shadowOpacity: 0.6,
      listening: false,
    });
    this.storyText.x((STAGE_WIDTH - this.storyText.width()) / 2);
    this.storyText.y(100);
    this.group.add(this.storyText);

    // ---- Continue Button ----
    this.btnText = new Konva.Text({
      text: "Continue",
      fontSize: 64,
      fontFamily: "Impact, Haettenschweiler, 'Arial Black', sans-serif",
      fill: "#ffffff",
      stroke: "#000000",
      strokeWidth: 3,
      shadowColor: "rgba(0,0,0,0.5)",
      shadowBlur: 8,
      shadowOffset: { x: 3, y: 3 },
      shadowOpacity: 0.6,
    });

    this.btnHit = new Konva.Rect({
      width: this.btnText.width() + 40,
      height: this.btnText.height() + 22,
      cornerRadius: 14,
      fillEnabled: false,
      strokeEnabled: false,
    });

    this.btnGroup = new Konva.Group({ listening: true });
    this.btnText.position({
      x: (this.btnHit.width() - this.btnText.width()) / 2,
      y: (this.btnHit.height() - this.btnText.height()) / 2,
    });
    this.btnGroup.add(this.btnHit);
    this.btnGroup.add(this.btnText);
    this.group.add(this.btnGroup);

    // Center button horizontally at bottom
    const padBottom = 40;
    this.btnGroup.x((STAGE_WIDTH - this.btnHit.width()) / 2);
    this.btnGroup.y(STAGE_HEIGHT - this.btnHit.height() - padBottom);

    this.wireButton();
  }

  // ---------- Public ----------
  getGroup(): Konva.Group {
    return this.group;
  }

  show(): void {
    this.group.visible(true);
    this.isVisible = true;
    this.group.getLayer()?.batchDraw();
  }

  hide(): void {
    this.group.visible(false);
    this.isVisible = false;
    this.group.getLayer()?.batchDraw();
  }

  setOnContinue(cb: () => void): void {
    this.onContinue = cb;
  }

  // ---------- Private ----------
  private wireButton(): void {
    this.btnGroup.on("mouseenter", () => {
      const stage = this.group.getStage();
      if (stage) stage.container().style.cursor = "pointer";
      this.btnGroup.to({ scaleX: 1.05, scaleY: 1.05, duration: 0.08 });
    });

    this.btnGroup.on("mouseleave", () => {
      const stage = this.group.getStage();
      if (stage) stage.container().style.cursor = "default";
      this.btnGroup.to({ scaleX: 1, scaleY: 1, duration: 0.08 });
    });

    // --- Automatic screen switch or callback ---
    this.btnGroup.on("click tap", () => {
      if (!this.isVisible) return;

      if (this.onContinue) this.onContinue();
      else if (this.switcher) this.switcher.switchToScreen("results");
    });
  }

  private loadBackground(src: string): void {
    const img = new Image();
    img.onload = () => {
      const fit = this.coverFit(
        { width: img.width, height: img.height },
        { width: STAGE_WIDTH, height: STAGE_HEIGHT }
      );
      this.bg.image(img);
      this.bg.position({ x: fit.x, y: fit.y });
      this.bg.size({ width: fit.width, height: fit.height });
      this.group.getLayer()?.batchDraw();
    };
    img.src = src;
  }

  private coverFit(
    src: { width: number; height: number },
    dst: { width: number; height: number }
  ) {
    const sr = src.width / src.height;
    const dr = dst.width / dst.height;
    let width: number, height: number;
    if (sr > dr) {
      height = dst.height;
      width = height * sr;
    } else {
      width = dst.width;
      height = width / sr;
    }
    return { x: (dst.width - width) / 2, y: (dst.height - height) / 2, width, height };
  }
}
