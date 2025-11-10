import Konva from "konva";
import { STAGE_WIDTH, STAGE_HEIGHT } from "../../constants";

export class GraphScreenView {
  private group: Konva.Group;
  private bg: Konva.Image;
  private lines: Konva.Line[] = [];
  private axes: Konva.Line[] = [];
  private legendItems: Konva.Text[] = [];
  private axisLabels: Konva.Text[] = [];
  private nextButton: Konva.Rect;
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
    const btnX = STAGE_WIDTH / 2 - btnW / 2;
    const btnY = STAGE_HEIGHT - 100;

    this.nextButton = new Konva.Rect({
      x: btnX,
      y: btnY,
      width: btnW,
      height: btnH,
      fill: "#8b4513",
      cornerRadius: 12,
      shadowColor: "black",
      shadowBlur: 10,
      shadowOffsetY: 3,
      shadowOpacity: 0.3,
    });

    this.nextText = new Konva.Text({
      x: btnX,
      y: btnY + 12,
      width: btnW,
      align: "center",
      text: "Next",
      fontSize: 22,
      fontFamily: "Arial",
      fill: "white",
    });

    this.group.add(this.nextButton);
    this.group.add(this.nextText);

    this.nextButton.on("click", onNextClick);
    this.nextText.on("click", onNextClick);
  }

  private drawAxes(): void {
    const axisColor = "white";
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

    const labelColor = "white";
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
      text: "Profit",
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
        fill: "white",
      });
      this.group.add(text);
      this.legendItems.push(text);
    });
  }

  updateGraph(data: number[][]): void {
    const margin = 60;
    const graphW = STAGE_WIDTH - margin * 2;
    const graphH = STAGE_HEIGHT - 180;
    const allVals = data.flat();
    const minY = Math.min(...allVals);
    const maxY = Math.max(...allVals);
    const numPoints = data[0]?.length || 0;
    const colors = ["red", "green", "blue"];

    this.lines.forEach((l) => l.destroy());
    this.lines = [];

    // Compute scaling
    const scaleY = (val: number) =>
      STAGE_HEIGHT - 120 - ((val - minY) / (maxY - minY)) * graphH;

    // Calculate y=0 line position
    const zeroY =
      0 >= minY && 0 <= maxY ? scaleY(0) : scaleY(minY > 0 ? minY : maxY);

    // Update axes
    this.axes.forEach((a) => a.destroy());
    const xAxis = new Konva.Line({
      points: [margin, zeroY, STAGE_WIDTH - margin, zeroY],
      stroke: "white",
      strokeWidth: 3,
    });
    const yAxis = new Konva.Line({
      points: [margin, 80, margin, STAGE_HEIGHT - 120],
      stroke: "white",
      strokeWidth: 3,
    });
    this.group.add(xAxis);
    this.group.add(yAxis);
    this.axes = [xAxis, yAxis];

    // Redraw labels
    this.drawAxisLabelsDynamic(margin, numPoints, minY, maxY, zeroY);

    // Draw lines
    data.forEach((points, idx) => {
      const scaled: number[] = [];
      for (let i = 0; i < points.length; i++) {
        const x = margin + (i / (points.length - 1)) * graphW;
        const y = scaleY(points[i]);
        scaled.push(x, y);
      }

      const line = new Konva.Line({
        points: scaled,
        stroke: colors[idx],
        strokeWidth: 3,
        lineCap: "round",
        lineJoin: "round",
      });

      this.group.add(line);
      this.lines.push(line);
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

