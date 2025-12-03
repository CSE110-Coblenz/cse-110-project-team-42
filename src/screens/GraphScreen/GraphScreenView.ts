import Konva from "konva";
import { STAGE_WIDTH, STAGE_HEIGHT, OPTIONS_COLORS, FONT_PRIMARY, COLOR_MINIGAME_TEXT } from "../../constants";
import { Hearts } from "../../gamestate";

export class GraphScreenView {
  private group: Konva.Group;
  private bg: Konva.Image;
  private lines: Konva.Line[] = [];
  private axes: Konva.Line[] = [];
  private legendItems: Konva.Text[] = [];
  private axisLabels: Konva.Text[] = [];
  private nextButton: Konva.Group;
  private nextText: Konva.Text;
  private axisTitles: Konva.Text[] = [];

  constructor(onNextClick: () => void) {
    this.group = new Konva.Group({ visible: false });

    const bgImage = new Image();
    bgImage.src = "/bg.png";
    this.bg = new Konva.Image({
      x: 0,
      y: 0,
      width: STAGE_WIDTH,
      height: STAGE_HEIGHT,
      image: bgImage,
    });
    bgImage.onload = () => {
      this.bg.image(bgImage);
      this.group.getLayer()?.draw();
    };
    this.group.add(this.bg);

    this.drawAxes();
    this.drawLegend();

    const btnW = 180;
    const btnH = 50;
    const btnX = STAGE_WIDTH / 2;
    const btnY = STAGE_HEIGHT - 100 + btnH / 2;

    this.nextButton = new Konva.Group({
      x: btnX,
      y: btnY,
      offsetX: btnW / 2,
      offsetY: btnH / 2,
    });

    const btnRect = new Konva.Rect({
      width: btnW,
      height: btnH,
      fill: "#26492b", // Greenish
      stroke: "#f7e3c3", // Cream
      strokeWidth: 2,
      cornerRadius: 10,
      shadowColor: "black",
      shadowBlur: 10,
      shadowOffsetY: 5,
    });

    this.nextText = new Konva.Text({
      width: btnW,
      height: btnH,
      y: (btnH - 22) / 2, // Center vertically
      align: "center",
      text: "NEXT",
      fontSize: 22,
      fontFamily: FONT_PRIMARY,
      fill: "#f7e3c3",
      fontStyle: "bold",
    });

    this.nextButton.add(btnRect);
    this.nextButton.add(this.nextText);
    this.group.add(this.nextButton);

    this.nextButton.on("click", onNextClick);
    
    // Hover effects
    this.nextButton.on("mouseenter", () => {
      this.group.getStage()!.container().style.cursor = "pointer";
      btnRect.fill("#3a6b40");
      this.nextButton.to({ scaleX: 1.05, scaleY: 1.05, duration: 0.1 });
    });
    this.nextButton.on("mouseleave", () => {
      this.group.getStage()!.container().style.cursor = "default";
      btnRect.fill("#26492b");
      this.nextButton.to({ scaleX: 1, scaleY: 1, duration: 0.1 });
    });

    // Draw hearts last so they appear above other UI elements
    Hearts.draw(this.group);
  }

  private drawAxes(): void {
    const axisColor = COLOR_MINIGAME_TEXT;
    const margin = 60;

    // Placeholder axes, updated dynamically in updateGraph
    const xAxis = new Konva.Line({
      points: [margin, STAGE_HEIGHT / 2, STAGE_WIDTH - margin, STAGE_HEIGHT / 2],
      stroke: axisColor,
      strokeWidth: 3,
    });

    const yAxis = new Konva.Line({
      points: [margin, 80, margin, STAGE_HEIGHT - 120],
      stroke: axisColor,
      strokeWidth: 3,
    });

    this.group.add(xAxis);
    this.group.add(yAxis);
    this.axes = [xAxis, yAxis];
  }

  private drawAxisLabelsDynamic(
    margin: number,
    numPoints: number,
    minY: number,
    maxY: number,
    zeroY: number
  ): void {
    this.axisLabels.forEach((t) => t.destroy());
    this.axisTitles.forEach((t) => t.destroy());
    this.axisLabels = [];
    this.axisTitles = [];

    const labelColor = COLOR_MINIGAME_TEXT;
    const numXLabels = 10;
    const numYLabels = 10;
    const graphW = STAGE_WIDTH - margin * 2;
    const graphH = STAGE_HEIGHT - 180;

    // X-axis labels
    for (let i = 0; i <= numXLabels; i++) {
      const x = margin + (i / numXLabels) * graphW;
      const value = Math.round((i / numXLabels) * (numPoints - 1));
      const text = new Konva.Text({
        x: x - 10,
        y: zeroY + 15,
        text: `${value}`,
        fontSize: 16,
        fontFamily: "Arial",
        fill: labelColor,
      });
      this.group.add(text);
      this.axisLabels.push(text);
    }

    // Y-axis labels
    for (let i = 0; i <= numYLabels; i++) {
      const y = STAGE_HEIGHT - 120 - (i / numYLabels) * graphH;
      const value = (minY + (i / numYLabels) * (maxY - minY)).toFixed(1);
      const text = new Konva.Text({
        x: margin - 50,
        y: y - 8,
        text: `${value}`,
        fontSize: 16,
        fontFamily: "Arial",
        fill: labelColor,
      });
      this.group.add(text);
      this.axisLabels.push(text);
    }

    // Axis titles
    const xTitle = new Konva.Text({
      x: STAGE_WIDTH / 2 - 60,
      y: zeroY + 50,
      text: "Game Iterations",
      fontSize: 18,
      fontFamily: "Arial",
      fill: labelColor,
    });

    const yTitle = new Konva.Text({
      x: margin - 40,
      y: 20,
      text: "Running Avg Profit",
      fontSize: 18,
      fontFamily: "Arial",
      fill: labelColor,
    });

    this.group.add(xTitle);
    this.group.add(yTitle);
    this.axisTitles.push(xTitle, yTitle);
  }

  private drawLegend(): void {
    const labels = ["🔴 Option 1", "🟢 Option 2", "🔵 Option 3"];
    labels.forEach((label, i) => {
      const text = new Konva.Text({
        x: 100,
        y: 60 + i * 25,
        text: label,
        fontSize: 18,
        fontFamily: "Arial",
        fill: COLOR_MINIGAME_TEXT,
      });
      this.group.add(text);
      this.legendItems.push(text);
    });
  }

  updateGraph(data: number[][]): void {
    // Data is expected to be running-average series from the model
    const margin = 60;
    const graphW = STAGE_WIDTH - margin * 2;
    const graphH = STAGE_HEIGHT - 180;
    const allVals = data.flat();
    let minY = allVals.length ? Math.min(...allVals) : 0;
    let maxY = allVals.length ? Math.max(...allVals) : 1;
    const numPoints = data[0]?.length || 0;

    this.lines.forEach((l) => l.destroy());
    this.lines = [];

    // Guard against flat range
    let adjustedMinY = minY;
    let adjustedMaxY = maxY;
    if (adjustedMaxY === adjustedMinY) {
      adjustedMaxY = adjustedMinY + 1;
      adjustedMinY = adjustedMinY - 1;
    }

    // Compute scaling
    const scaleY = (val: number) =>
      STAGE_HEIGHT - 120 - ((val - adjustedMinY) / (adjustedMaxY - adjustedMinY)) * graphH;

    // Calculate y=0 line position
    const zeroY =
      0 >= adjustedMinY && 0 <= adjustedMaxY ? scaleY(0) : scaleY(adjustedMinY > 0 ? adjustedMinY : adjustedMaxY);

    // Update axes
    this.axes.forEach((a) => a.destroy());
    const xAxis = new Konva.Line({
      points: [margin, zeroY, STAGE_WIDTH - margin, zeroY],
      stroke: COLOR_MINIGAME_TEXT,
      strokeWidth: 3,
    });
    const yAxis = new Konva.Line({
      points: [margin, 80, margin, STAGE_HEIGHT - 120],
      stroke: COLOR_MINIGAME_TEXT,
      strokeWidth: 3,
    });
    this.group.add(xAxis);
    this.group.add(yAxis);
    this.axes = [xAxis, yAxis];

    // Redraw labels
    this.drawAxisLabelsDynamic(margin, numPoints, adjustedMinY, adjustedMaxY, zeroY);

    // Draw animated lines using dash animation
    data.forEach((points, idx) => {
      const scaled: number[] = [];
      for (let i = 0; i < points.length; i++) {
        const x = margin + (i / (points.length - 1)) * graphW;
        const y = scaleY(points[i]);
        scaled.push(x, y);
      }

      const totalLength = scaled.length * 2;
      const line = new Konva.Line({
        points: scaled,
        stroke: OPTIONS_COLORS[idx],
        strokeWidth: 3,
        lineJoin: "round",
        dashEnabled: true,
        dash: [0, totalLength], // Start fully invisible
      });

      this.group.add(line);
      this.lines.push(line);

      // Animate all lines at the same time (no delay)
      line.to({
        dash: [totalLength, 0], // End fully visible
        duration: 30,
      });
    });

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

  getGroup(): Konva.Group {
    return this.group;
  }
}

