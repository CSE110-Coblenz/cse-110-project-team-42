import Konva from "konva";
import { STAGE_WIDTH } from "./constants";

export let currentLevel: number = 1;

export class Hearts {
  private static heartsCount = 3;
  private static hearts: Konva.Path[] = [];

  /** Draws the hearts in the top-right corner */
  static draw(group: Konva.Group): void {
    // Remove existing heart nodes from previous draws
    this.hearts.forEach((h) => h.destroy());
    this.hearts = [];

    const heartPath =
      "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 " +
      "4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 " +
      "14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 " +
      "6.86-8.55 11.54L12 21.35z";

    const heartSize = 40;
    const spacing = 10;
    const margin = 20;

    const count = this.heartsCount;
    const totalWidth = count * (heartSize + spacing) - spacing;
    const startX = STAGE_WIDTH - totalWidth - margin;
    const heartY = margin;

    for (let i = 0; i < count; i++) {
      const heart = new Konva.Path({
        x: startX + i * (heartSize + spacing),
        y: heartY,
        data: heartPath,
        scale: { x: 1.2, y: 1.2 },
        fill: "red",
        stroke: "#7a0000",
        strokeWidth: 1,
      });
      group.add(heart);
      this.hearts.push(heart);
    }

    group.getLayer()?.draw();
  }

  /** Decrease hearts by one, returns true if any remain, false if none left */
  static decrement(): boolean {
    if (this.heartsCount > 0) {
      this.heartsCount--;
    }
    return this.heartsCount > 0;
  }

  /** Returns current number of hearts */
  static get(): number {
    return this.heartsCount;
  }
}

