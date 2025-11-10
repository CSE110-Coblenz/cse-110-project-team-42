import type { ScreenSwitcher } from "../../types";
import { GraphScreenModel } from "./GraphScreenModel";
import { GraphScreenView } from "./GraphScreenView";
import {
  GAME1RESULTSTEXT,
  type GraphDataConfig,
} from "../../constants";

export class GraphScreenController {
  private switcher: ScreenSwitcher;
  private model: GraphScreenModel;
  private view: GraphScreenView;

  constructor(switcher: ScreenSwitcher, data: GraphDataConfig) {
    this.switcher = switcher;
    this.model = new GraphScreenModel(data);
    this.view = new GraphScreenView(() => this.handleNext());
    this.view.updateGraph(this.model.getHistory());
  }

  private handleNext(): void {
    const [r, g, b] = this.model.getFinalValues().map((v) => v.toFixed(0));
    const idx = this.model.getSelectedOption();
    const name = idx === 0 ? "🔴Red" : idx === 1 ? "🟢Green" : "🔵Blue";

    const text = GAME1RESULTSTEXT.replace("{0}", r)
      .replace("{1}", g)
      .replace("{2}", b)
      .replace("{3}", name);

    this.switcher.switchToScreen("results");
    // @ts-ignore
    this.switcher["resultsController"].showResults(text, 3);
  }

  updateData(newData: GraphDataConfig): void {
    this.model.updateData(newData);
    this.view.updateGraph(this.model.getHistory());
  }

  getView(): GraphScreenView {
    return this.view;
  }

  show(): void {
    this.view.show();
  }

  hide(): void {
    this.view.hide();
  }
}

