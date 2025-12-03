/// <reference types="vitest" />

import { describe, it, expect, vi, afterEach, Mock } from "vitest";

// Mock global Image for Node/Vitest environment
(globalThis as any).Image = class {
  src = "";
  onload: (() => void) | null = null;

  constructor() {}

  // Trigger onload manually in tests if needed
  fakeLoad() {
    if (this.onload) this.onload();
  }
};

// Minimal Konva mock
vi.mock("konva", () => {
  class Group {
    private _v = false;
    children: any[] = [];
    handlers: Record<string, Function[]> = {};
    constructor(_: any = {}) {}
    add(c: any) {
      this.children.push(c);
    }
    visible(v?: boolean) {
      if (v === undefined) return this._v;
      this._v = v;
    }
    getLayer() { return undefined; }
    getStage() {
      return { container: () => ({ style: { cursor: "default" } }) };
    }
    on(ev: string, fn: Function) {
      (this.handlers[ev] ||= []).push(fn);
    }
    to(cfg: any) { /* mock animation */ }
    simulateClick() {
      (this.handlers["click"] || []).forEach((h) => h());
    }
  }

  class Text {
    cfg: any;
    handlers: Record<string, Function[]> = {};
    constructor(cfg: any) { this.cfg = { ...cfg }; }
    text(v?: string) {
      if (v === undefined) return this.cfg.text;
      this.cfg.text = v;
    }
    on(ev: string, fn: Function) {
      (this.handlers[ev] ||= []).push(fn);
    }
    simulateClick() {
      (this.handlers["click"] || []).forEach((h) => h());
    }
  }

  class Rect {
    cfg: any;
    handlers: Record<string, Function[]> = {};
    constructor(cfg: any) { this.cfg = { ...cfg }; }
    on(ev: string, fn: Function) {
      (this.handlers[ev] ||= []).push(fn);
    }
    simulateClick() {
      (this.handlers["click"] || []).forEach((h) => h());
    }
  }

  class ImageNode { constructor(cfg: any) {} }

  return {
    default: { Group, Text, Rect, Image: ImageNode },
  };
});

// Mock gamestate
vi.mock("../gamestate", () => ({
  Level: { get: vi.fn() },
  Timer: { start: vi.fn() },
  Hearts: { draw: vi.fn() },
}));

// Mock constants
vi.mock("../constants", () => ({
  HINT_BY_LEVEL: { 1: "Hint1", 2: "Hint2" },
  STAGE_WIDTH: 1024,
  STAGE_HEIGHT: 768,
  FONT_TITLE: "Arial",
  FONT_PRIMARY: "Arial",
  COLOR_MINIGAME_TEXT: "#FFFFFF",
}));

import { TryAgainScreenModel } from "../screens/TryAgainScreen/TryAgainScreenModel";
import { TryAgainScreenView } from "../screens/TryAgainScreen/TryAgainScreenView";
import { TryAgainController } from "../screens/TryAgainScreen/TryAgainScreenController";
import { Level, Timer } from "../gamestate";
import { HINT_BY_LEVEL } from "../constants";

afterEach(() => vi.clearAllMocks());

describe("TryAgainScreenModel (minimal)", () => {
  it("updates and returns message", () => {
    const model = new TryAgainScreenModel("A");
    model.updateMessage("B");
    expect(model.getMessage()).toBe("B");
  });
});

describe("TryAgainScreenView (minimal)", () => {
  it("show() and hide() toggle visibility", () => {
    const v = new TryAgainScreenView("msg", vi.fn());
    expect(v.getGroup().visible()).toBe(false);

    v.show();
    expect(v.getGroup().visible()).toBe(true);

    v.hide();
    expect(v.getGroup().visible()).toBe(false);
  });

  it("updateMessage updates hint text", () => {
    const v: any = new TryAgainScreenView("old msg", vi.fn());
    v.updateMessage("new msg");
    expect(v.hintText.cfg.text).toBe("new msg");
  });
});

describe("TryAgainController (minimal)", () => {
  const mockSwitcher = () => ({ switchToScreen: vi.fn() });

  it("showTryAgain picks correct hint", () => {
    (Level.get as Mock).mockReturnValue(1);

    const sw = mockSwitcher();
    const c = new TryAgainController(sw as any);

    c.showTryAgain();

    const v: any = c.getView();
    expect(v.hintText.cfg.text).toBe(HINT_BY_LEVEL[1]);
  });

  it("restart sends user to correct screen & starts timer", () => {
    (Level.get as Mock).mockReturnValue(2);

    const sw = mockSwitcher();
    const c = new TryAgainController(sw as any);
    const v: any = c.getView();

    v.restartButton.simulateClick();

    expect(sw.switchToScreen).toHaveBeenCalledWith("cardGame");
    expect(Timer.start).toHaveBeenCalled();
  });
});
