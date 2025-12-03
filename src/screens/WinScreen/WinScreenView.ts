import Konva from "konva";
import type { View } from "../../types";
import type { LeaderboardEntry } from "./WinScreenModel";
import { STAGE_WIDTH, STAGE_HEIGHT, FONT_TITLE, FONT_PRIMARY, COLOR_MINIGAME_TEXT } from "../../constants";
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
      y: STAGE_HEIGHT * 0.12,
      text: "Congratulations!",
      fontSize: 64,
      fontFamily: FONT_TITLE,
      fill: "#ffcc00",
      stroke: "black",
      strokeWidth: 1,
      fontStyle: "bold",
      align: "center",
      shadowColor: "black",
      shadowBlur: 10,
    });
    this.congratsText.offsetX(this.congratsText.width() / 2);
    this.group.add(this.congratsText);

    // === Motivational message ===
    const motivationalText = new Konva.Text({
      x: STAGE_WIDTH / 2,
      y: STAGE_HEIGHT * 0.28,
      text: "You're the best at EV calculations! But are you the fastest?",
      fontSize: 22,
      fontFamily: FONT_PRIMARY,
      fill: COLOR_MINIGAME_TEXT,
      fontStyle: "italic",
      align: "center",
      shadowColor: "black",
      shadowBlur: 5,
    });
    motivationalText.offsetX(motivationalText.width() / 2);
    this.group.add(motivationalText);

    // === Final time display ===
    this.finalTimeText = new Konva.Text({
      x: STAGE_WIDTH / 2,
      y: STAGE_HEIGHT * 0.38,
      text: "Final Time: 00:00",
      fontSize: 32,
      fontFamily: FONT_PRIMARY,
      fill: "#ffcc00",
      align: "center",
      fontStyle: "bold",
      shadowColor: "black",
      shadowBlur: 5,
    });
    this.finalTimeText.offsetX(this.finalTimeText.width() / 2);
    this.group.add(this.finalTimeText);

    // === Leaderboard text (multi-line) ===
    this.leaderboardText = new Konva.Text({
      x: STAGE_WIDTH / 2,
      y: STAGE_HEIGHT * 0.48,
      text: "Best Times:\n(Play to see your records!)",
      fontSize: 20,
      fontFamily: FONT_PRIMARY,
      fill: COLOR_MINIGAME_TEXT,
      align: "center",
      lineHeight: 1.5,
      shadowColor: "black",
      shadowBlur: 5,
    });
    this.leaderboardText.offsetX(this.leaderboardText.width() / 2);
    this.group.add(this.leaderboardText);

    // === Restart button (group) ===
    const buttonWidth = 240;
    const buttonHeight = 80;
    const buttonY = STAGE_HEIGHT * 0.78;

    this.restartButtonGroup = new Konva.Group({
      x: STAGE_WIDTH / 2,
      y: buttonY + buttonHeight / 2,
      offsetX: buttonWidth / 2,
      offsetY: buttonHeight / 2,
    });

    const restartRect = new Konva.Rect({
      width: buttonWidth,
      height: buttonHeight,
      cornerRadius: 10,
      fill: "#26492b", // Greenish
      stroke: "#f7e3c3", // Cream
      strokeWidth: 2,
      shadowColor: "black",
      shadowBlur: 10,
    });

    const restartText = new Konva.Text({
      width: buttonWidth,
      height: buttonHeight,
      y: (buttonHeight - 24) / 2, // Center based on fontSize 24
      text: "RESTART",
      fontSize: 24,
      fontFamily: FONT_PRIMARY,
      fill: "#f7e3c3",
      fontStyle: "bold",
      align: "center",
    });

    this.restartButtonGroup.add(restartRect);
    this.restartButtonGroup.add(restartText);

    // Button interaction
    this.restartButtonGroup.on("mouseenter", () => {
      this.group.getStage()!.container().style.cursor = "pointer";
      restartRect.fill("#3a6b40");
      this.restartButtonGroup.to({ scaleX: 1.05, scaleY: 1.05, duration: 0.1 });
    });
    this.restartButtonGroup.on("mouseleave", () => {
      this.group.getStage()!.container().style.cursor = "default";
      restartRect.fill("#26492b");
      this.restartButtonGroup.to({ scaleX: 1, scaleY: 1, duration: 0.1 });
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
