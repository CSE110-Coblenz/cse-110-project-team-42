import Konva from "konva";
import type { View } from "../../types";
import type { LeaderboardEntry } from "./winScreenModel";
import { STAGE_WIDTH, STAGE_HEIGHT } from "../../constants";
import { Timer } from "../../gamestate";

// helper for formatting seconds as MM:SS or HH:MM:SS
function formatTime(secondsTotal: number): string {
  const hours = Math.floor(secondsTotal / 3600);
  const minutes = Math.floor((secondsTotal % 3600) / 60);
  const seconds = secondsTotal % 60;

  const mm = minutes.toString().padStart(2, "0");
  const ss = seconds.toString().padStart(2, "0");

  if (hours > 0) {
    const hh = hours.toString().padStart(2, "0");
    return `${hh}:${mm}:${ss}`;
  }
  return `${mm}:${ss}`;
}

/**
 * WinScreenView - Renders the win screen
 */
export class WinScreenView implements View {
  private group: Konva.Group;

  private congratsText: Konva.Text;
  private finalTimeText: Konva.Text;
  private leaderboardText: Konva.Text;

  private restartButtonGroup: Konva.Group;

  constructor(onRestart: () => void) {
    this.group = new Konva.Group({ visible: false });

    // === Background image ===
    const background = new Konva.Image({
      x: 0,
      y: 0,
      width: STAGE_WIDTH,
      height: STAGE_HEIGHT,
      image: undefined,
    });
    this.group.add(background);

    const bg = new Image();
    bg.src = "/win.jpg";
    bg.onload = () => {
      background.image(bg);
      this.group.getLayer()?.draw();
    };

    // === Soft overlay ===
    const overlay = new Konva.Rect({
      x: 0,
      y: 0,
      width: STAGE_WIDTH,
      height: STAGE_HEIGHT,
      fill: "rgba(0,0,0,0.35)",
    });
    this.group.add(overlay);

    // === "Congratulations" title ===
    this.congratsText = new Konva.Text({
      x: STAGE_WIDTH / 2,
      y: STAGE_HEIGHT * 0.18,
      text: "🎉 Congratulations! 🎉",
      fontSize: 48,
      fontFamily: "Arial",
      fill: "white",
      fontStyle: "bold",
      align: "center",
      shadowColor: "black",
      shadowBlur: 10,
    });
    this.congratsText.offsetX(this.congratsText.width() / 2);
    this.group.add(this.congratsText);

    // === Final time display ===
    this.finalTimeText = new Konva.Text({
      x: STAGE_WIDTH / 2,
      y: STAGE_HEIGHT * 0.30,
      text: "Final Time: 00:00",
      fontSize: 32,
      fontFamily: "Arial",
      fill: "white",
      align: "center",
    });
    this.finalTimeText.offsetX(this.finalTimeText.width() / 2);
    this.group.add(this.finalTimeText);

    // === Leaderboard text (multi-line) ===
    this.leaderboardText = new Konva.Text({
      x: STAGE_WIDTH / 2,
      y: STAGE_HEIGHT * 0.40,
      text: "Best Times:\n(Play to see your records!)",
      fontSize: 20,
      fontFamily: "Arial",
      fill: "#f0f0f0",
      align: "center",
      lineHeight: 1.5,
    });
    this.leaderboardText.offsetX(this.leaderboardText.width() / 2);
    this.group.add(this.leaderboardText);

    // === Restart button (group) ===
    this.restartButtonGroup = new Konva.Group();

    const buttonWidth = 240;
    const buttonHeight = 70;
    const buttonY = STAGE_HEIGHT * 0.70;

    const restartRect = new Konva.Rect({
      x: STAGE_WIDTH / 2 - buttonWidth / 2,
      y: buttonY,
      width: buttonWidth,
      height: buttonHeight,
      cornerRadius: 16,
      fill: "white",
      stroke: "#444",
      strokeWidth: 2,
      shadowBlur: 10,
      shadowColor: "black",
      shadowOpacity: 0.3,
    });

    const restartText = new Konva.Text({
      x: STAGE_WIDTH / 2,
      y: buttonY + (buttonHeight - 28) / 2,
      text: "Restart",
      fontSize: 28,
      fontFamily: "Arial",
      fill: "black",
      fontStyle: "bold",
      align: "center",
    });
    restartText.offsetX(restartText.width() / 2);

    this.restartButtonGroup.add(restartRect);
    this.restartButtonGroup.add(restartText);

    // Button interaction
    this.restartButtonGroup.on("pointerover", () => {
      this.restartButtonGroup.scale({ x: 1.01, y: 1.01 });
      this.group.getLayer()?.batchDraw();
    });
    this.restartButtonGroup.on("pointerout", () => {
      this.restartButtonGroup.scale({ x: 1, y: 1 });
      this.group.getLayer()?.batchDraw();
    });
    this.restartButtonGroup.on("click", onRestart);

    this.group.add(this.restartButtonGroup);

    // Optional: show timer text at top
    Timer.draw(this.group);
  }

  getGroup(): Konva.Group {
    return this.group;
  }

  /**
   * Update the final time text (seconds -> formatted string)
   */
  updateFinalTime(timeSeconds: number): void {
    this.finalTimeText.text(`Final Time: ${formatTime(timeSeconds)}`);
    this.finalTimeText.offsetX(this.finalTimeText.width() / 2);
    this.group.getLayer()?.draw();
  }

  /**
   * Update the leaderboard multi-line text
   */
  updateLeaderboard(entries: LeaderboardEntry[]): void {
    if (entries.length === 0) {
      this.leaderboardText.text("Best Times:\n(No runs yet!)");
    } else {
      let text = "Best Times:\n";
      entries.forEach((entry, index) => {
        text += `${index + 1}. ${formatTime(entry.timeSeconds)} — ${entry.timestamp}\n`;
      });
      this.leaderboardText.text(text);
    }
    this.leaderboardText.offsetX(this.leaderboardText.width() / 2);
    this.group.getLayer()?.draw();
  }

  show(): void {
    this.group.visible(true);
    this.group.getLayer()?.draw();
  }

  hide(): void {
    this.group.visible(false);
    this.group.getLayer()?.draw();
  }
}
