import Konva from "konva";
import { STAGE_WIDTH } from "./constants";

export let currentLevel: number = 1;

export function setCurrentLevel(level: number): void {
  currentLevel = level;
}

export function resetCurrentLevel(): void {
  currentLevel = 1;
}

export class Hearts {
  private static heartsCount = 3;
  private static heartsByGroup: Map<Konva.Group, Konva.Path[]> = new Map();

  /** Draws the hearts in the top-right corner */
  static draw(group: Konva.Group): void {
    // Remove existing heart nodes from this specific group only
    const existing = this.heartsByGroup.get(group);
    existing?.forEach((h) => h.destroy());

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

    const newHearts: Konva.Path[] = [];
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
      newHearts.push(heart);
    }

    this.heartsByGroup.set(group, newHearts);
    group.getLayer()?.draw();
  }

  /** Decrease hearts by one, returns true if any remain, false if none left */
  static decrement(): boolean {
    if (this.heartsCount > 0) {
      this.heartsCount--;
    }
    // Redraw hearts on all registered groups to reflect new count
    const groups = Array.from(this.heartsByGroup.keys());
    groups.forEach((group) => this.draw(group));
    return this.heartsCount > 0;
  }

  static reset(): void {
    this.heartsCount = 3;
    // Redraw hearts on all registered groups to reflect reset count
    const groups = Array.from(this.heartsByGroup.keys());
    groups.forEach((group) => this.draw(group));
  }

  /** Returns current number of hearts */
  static get(): number {
    return this.heartsCount;
  }
}

export class Timer {
  // Total accumulated time when not running (in ms)
  private static accumulatedMs = 0;

  private static startMs: number | null = null;
  private static intervalId: number | null = null;

  // map each screen's Konva.Group to its timer label
  private static labelsByGroup: Map<Konva.Group, Konva.Text> = new Map();

  /** Compute total elapsed seconds from accumulatedMs + current run */
  private static getTotalSeconds(): number {
    let totalMs = this.accumulatedMs;
    if (this.startMs !== null) {
      totalMs += Date.now() - this.startMs;
    }
    return Math.floor(totalMs / 1000);
  }

  /** Get the current elapsed time in seconds */
  static getSeconds(): number {
    return this.getTotalSeconds();
  }

  /** Format seconds as HH:MM:SS */
  private static formatTime(totalSeconds: number): string {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const hh = hours.toString().padStart(2, "0");
    const mm = minutes.toString().padStart(2, "0");
    const ss = seconds.toString().padStart(2, "0");

    return `${hh}:${mm}:${ss}`;
  }

  /** Draws/creates the timer label on the given group */
  static draw(group: Konva.Group): void {
    const existing = this.labelsByGroup.get(group);
    existing?.destroy();

    const margin = 20;
    const timerX = STAGE_WIDTH / 2; 
    const timerY = margin;

    const seconds = this.getTotalSeconds();

    const label = new Konva.Text({
      x: timerX,
      y: timerY,
      text: this.formatTime(seconds),
      fontSize: 24,
      fontFamily: "Calibri",
      fill: "white",
      align: "center",
    });

    label.offsetX(label.width() / 2);

    group.add(label);
    this.labelsByGroup.set(group, label);
    group.getLayer()?.draw();
  }

  /** Start the timer called in mini-game1 */
  static start(): void {
    if (this.intervalId !== null) return; 

    this.startMs = Date.now();

    this.intervalId = window.setInterval(() => {
      this.updateAllLabels();
    }, 1000);
  }

  /** Stop/pause the timer */
  static stop(): void {
    if (this.startMs !== null) {
      // accumulate time since last start
      this.accumulatedMs += Date.now() - this.startMs;
      this.startMs = null;
    }

    if (this.intervalId !== null) {
      window.clearInterval(this.intervalId);
      this.intervalId = null;
    }

    this.updateAllLabels();
  }

  /** Reset timer to 0 seconds and update all labels (does not start it) */
  static reset(): void {
    this.accumulatedMs = 0;
    if (this.startMs !== null) {
      // if currently running, restart base time from now
      this.startMs = Date.now();
    }
    this.updateAllLabels();
  }

  /** Internal: update all labels' text across all groups */
  private static updateAllLabels(): void {
    const seconds = this.getTotalSeconds();
    const text = this.formatTime(seconds);

    this.labelsByGroup.forEach((label, group) => {
      // If label is no longer on a stage (group/layer removed), clean it up
      if (!label.getStage()) {
        this.labelsByGroup.delete(group);
        return;
      }

      label.text(text);
      // Re-center in case width changed (e.g., 09:59 -> 10:00)
      label.offsetX(label.width() / 2);

      group.getLayer()?.batchDraw();
    });
  }
}
