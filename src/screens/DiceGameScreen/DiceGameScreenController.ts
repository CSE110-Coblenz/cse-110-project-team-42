// src/screens/DiceGameScreen/DiceGameScreenController.ts

import { ScreenController } from "../../types.ts";
import type { ScreenSwitcher } from "../../types.ts";
import { DiceGameScreenModel } from "./DiceGameScreenModel.ts";
import { DiceGameScreenView } from "./DiceGameScreenView.ts";
import { Timer } from "../../gamestate.ts";

/**
 * DiceGameScreenController
 * - asks the Model for a random set of three options
 * - injects them into the View
 * - View is responsible only for rendering and simple color highlights
 */
export class DiceGameScreenController extends ScreenController {
  private model: DiceGameScreenModel;
  private view: DiceGameScreenView;
  private screenSwitcher?: ScreenSwitcher;   //  keep a reference

  constructor(screenSwitcher?: ScreenSwitcher) {
    super();
    this.screenSwitcher = screenSwitcher;    //  save it

    this.model = new DiceGameScreenModel();
    this.view = new DiceGameScreenView(
      () => this.handleChoiceA(),
      () => this.handleChoiceB(),
      () => this.handleChoiceC()
    );
  }

  /**
   * Called when the screen is entered.
   * Picks a random set from the model and updates the view.
   */
// DiceGameScreenController.ts
// DiceGameScreenController.ts

start(): void {
  const [a, b, c] = this.model.getSet();//getRandomSet();
  this.view.setButtonLabels(a, b, c); // ⬅ 把整段文字塞进按钮
  this.view.resetColorsToDefault();
  this.view.show();
}



  // Simple handlers: right now they just highlight in the View.
  // Later you can add logic here (e.g., go to DiceExplainScreen, record answers, etc.)
  private handleChoiceA(): void {
    this.model.setSelectedOption(0);
    this.screenSwitcher?.switchToScreen("graph");
    Timer.stop(); //pauses timer while in graph/results/tryagain screens
  }

  private handleChoiceB(): void {
    this.model.setSelectedOption(1);
    this.screenSwitcher?.switchToScreen("graph");
    Timer.stop(); //pauses timer while in graph/results/tryagain screens

  }

  private handleChoiceC(): void {
    this.model.setSelectedOption(2);
    this.screenSwitcher?.switchToScreen("graph");
    Timer.stop(); //pauses timer while in graph/results/tryagain screens

  }

  simulateOpt1(): number {
    return this.model.simulateOpt1();
  }

  simulateOpt2(): number {
    return this.model.simulateOpt2();
  }

  simulateOpt3(): number {
    return this.model.simulateOpt3();
  }

  // Required by ScreenController
  getView(): DiceGameScreenView {
    return this.view;
  }

  getModel(): DiceGameScreenModel {
    return this.model;
  }
}
