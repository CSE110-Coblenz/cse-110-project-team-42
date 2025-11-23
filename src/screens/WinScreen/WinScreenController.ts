import { ScreenController } from "../../types";
import type { ScreenSwitcher } from "../../types";
import { WinScreenView } from "./WinScreenView";



export class WinScreenController extends ScreenController {
  private view: WinScreenView;
  private screenSwitcher: ScreenSwitcher;

  constructor(screenSwitcher: ScreenSwitcher) {
    super();
    this.screenSwitcher = screenSwitcher;
    this.view = new WinScreenView(); // no callback needed
  }

  getView(): WinScreenView {
    return this.view;
  }
}