import Konva from "konva";
import { STAGE_WIDTH, STAGE_HEIGHT } from "../../constants.ts";
import type { ScreenSwitcher } from "../../types.ts";

/**
 * Menu Screen — displays game title and Enter button.
 */
export class MenuScreen {
  private group: Konva.Group;
  private bg: Konva.Image;
  private title: Konva.Text;
  private enterGroup: Konva.Group;
  private enterText: Konva.Text;
  private enterHit: Konva.Rect;

  private isVisible = false;
  private onEnter?: () => void;

  constructor(private switcher?: ScreenSwitcher) {
    this.group = new Konva.Group({ visible: false });

    // ---- Background ----
    this.bg = new Konva.Image({
      x: 0,
      y: 0,
      width: STAGE_WIDTH,
      height: STAGE_HEIGHT,
      listening: false,
    });
    this.group.add(this.bg);
    this.loadBackground("/menu.png");

    // ---- Title ----
    this.title = new Konva.Text({
      text: "Math Dungeon",
      fontSize: 72,
      fontFamily: "Impact, Haettenschweiler, 'Arial Black', sans-serif",
      fill: "#ffffff",
      stroke: "#000000",
      strokeWidth: 4, // thinner border
      shadowColor: "rgba(0,0,0,0.5)",
      shadowBlur: 10,
      shadowOffset: { x: 4, y: 4 },
      shadowOpacity: 0.6,
      listening: false,
    });
    this.centerHorizontally(this.title);
    this.title.y(120);
    this.group.add(this.title);

    // ---- Enter Button ----
    this.enterText = new Konva.Text({
      text: "Enter",
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

    this.enterHit = new Konva.Rect({
      width: this.enterText.width() + 40,
      height: this.enterText.height() + 24,
      cornerRadius: 16,
      fillEnabled: false,
      strokeEnabled: false,
    });

    this.enterGroup = new Konva.Group({ listening: true });
    this.enterText.position({
      x: (this.enterHit.width() - this.enterText.width()) / 2,
      y: (this.enterHit.height() - this.enterText.height()) / 2,
    });
    this.enterGroup.add(this.enterHit);
    this.enterGroup.add(this.enterText);
    this.group.add(this.enterGroup);

    this.centerGroupHorizontally(this.enterGroup);
    this.enterGroup.y(STAGE_HEIGHT * 0.65 - this.enterHit.height() / 2);

    // ---- Hover & Click ----
    this.wireEnterInteractions();
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

  setOnEnter(cb: () => void): void {
    this.onEnter = cb;
  }

  // ---------- Private ----------
  private wireEnterInteractions(): void {
    this.enterGroup.on("mouseenter", () => {
      const stage = this.group.getStage();
      if (stage) stage.container().style.cursor = "pointer";
      this.enterGroup.to({ scaleX: 1.05, scaleY: 1.05, duration: 0.08 });
    });

    this.enterGroup.on("mouseleave", () => {
      const stage = this.group.getStage();
      if (stage) stage.container().style.cursor = "default";
      this.enterGroup.to({ scaleX: 1, scaleY: 1, duration: 0.08 });
    });

    // --- Automatic screen switch or callback ---
    this.enterGroup.on("click tap", () => {
      if (!this.isVisible) return;

      if (this.onEnter) this.onEnter();
      else if (this.switcher) this.switcher.switchToScreen("story");
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

  private centerHorizontally(node: Konva.Node): void {
    const w = (node as any).width ? (node as any).width() : 0;
    node.x((STAGE_WIDTH - w) / 2);
  }

  private centerGroupHorizontally(group: Konva.Group): void {
    this.enterHit.width(this.enterText.width() + 40);
    this.enterHit.height(this.enterText.height() + 24);
    this.enterText.position({
      x: (this.enterHit.width() - this.enterText.width()) / 2,
      y: (this.enterHit.height() - this.enterText.height()) / 2,
    });
    group.x((STAGE_WIDTH - this.enterHit.width()) / 2);
  }
}
