/// <reference types="vitest" />

import { describe, it, expect, vi, beforeEach } from "vitest";
import { CARD_OPTIONS1, CARD_OPTIONS2, CARD_OPTIONS3 } from "../constants";

// Mock Konva to avoid DOM dependencies
vi.mock("konva", () => {
  class MockNode {
    cfg: any;
    destroyed = false;
    children: any[] = [];
    
    constructor(cfg?: any) {
      this.cfg = cfg || {};
    }
    
    add(...nodes: any[]) {
      this.children.push(...nodes);
      return this;
    }
    
    destroy() {
      this.destroyed = true;
    }
    
    destroyChildren() {
      this.children.forEach(c => c.destroy?.());
      this.children = [];
    }
    
    getLayer() {
      return {
        draw: () => {},
        batchDraw: () => {},
      };
    }
    
    getStage() {
      return {
        container: () => ({ style: {} }),
      };
    }
    
    show() {}
    hide() {}
    visible(_v?: boolean) {}
    on(_event: string, _handler: () => void) {}
    to(_config: any) {}
    zIndex(_i?: number) {}
    text(t?: string) { 
      if (t !== undefined) this.cfg.text = t;
      return this.cfg.text; 
    }
    fill(f?: string) {
      if (f !== undefined) this.cfg.fill = f;
      return this.cfg.fill;
    }
  }

  return {
    default: {
      Group: MockNode,
      Rect: MockNode,
      Text: MockNode,
      Image: MockNode,
      Path: MockNode,
      Layer: MockNode,
      Stage: MockNode,
      Easings: { EaseInOut: () => {} },
    },
  };
});

describe("CardGame Options Switching Based on Hearts", () => {
  beforeEach(async () => {
    // Reset modules to get fresh state
    vi.resetModules();
  });

  it("should return CARD_OPTIONS1 when hearts = 3", async () => {
    const { Hearts } = await import("../gamestate");
    const { CardGameScreenModel } = await import("../screens/CardGameScreen/CardGameScreenModel");
    
    Hearts.reset(); // Ensure 3 hearts
    expect(Hearts.get()).toBe(3);
    
    const model = new CardGameScreenModel();
    const options = model.getOptions();
    
    expect(options).toEqual(CARD_OPTIONS1);
    expect(options[0].label).toContain("Small Deck (30 Cards)");
  });

  it("should return CARD_OPTIONS2 when hearts = 2", async () => {
    const { Hearts } = await import("../gamestate");
    const { CardGameScreenModel } = await import("../screens/CardGameScreen/CardGameScreenModel");
    
    Hearts.reset();
    Hearts.decrement(); // 3 -> 2
    expect(Hearts.get()).toBe(2);
    
    const model = new CardGameScreenModel();
    const options = model.getOptions();
    
    expect(options).toEqual(CARD_OPTIONS2);
    expect(options[0].label).toContain("Small Deck (20 Cards)");
  });

  it("should return CARD_OPTIONS3 when hearts = 1", async () => {
    const { Hearts } = await import("../gamestate");
    const { CardGameScreenModel } = await import("../screens/CardGameScreen/CardGameScreenModel");
    
    Hearts.reset();
    Hearts.decrement(); // 3 -> 2
    Hearts.decrement(); // 2 -> 1
    expect(Hearts.get()).toBe(1);
    
    const model = new CardGameScreenModel();
    const options = model.getOptions();
    
    expect(options).toEqual(CARD_OPTIONS3);
    expect(options[0].label).toContain("Small Deck (10 Cards)");
  });

  it("should return CARD_OPTIONS3 as fallback when hearts = 0", async () => {
    const { Hearts } = await import("../gamestate");
    const { CardGameScreenModel } = await import("../screens/CardGameScreen/CardGameScreenModel");
    
    Hearts.reset();
    Hearts.decrement(); // 3 -> 2
    Hearts.decrement(); // 2 -> 1
    Hearts.decrement(); // 1 -> 0
    expect(Hearts.get()).toBe(0);
    
    const model = new CardGameScreenModel();
    const options = model.getOptions();
    
    // Fallback should be CARD_OPTIONS3
    expect(options).toEqual(CARD_OPTIONS3);
  });

  it("model should dynamically return different options as hearts change", async () => {
    const { Hearts } = await import("../gamestate");
    const { CardGameScreenModel } = await import("../screens/CardGameScreen/CardGameScreenModel");
    
    Hearts.reset();
    const model = new CardGameScreenModel();
    
    // With 3 hearts
    expect(model.getOptions()).toEqual(CARD_OPTIONS1);
    
    // Decrement to 2 hearts
    Hearts.decrement();
    expect(model.getOptions()).toEqual(CARD_OPTIONS2);
    
    // Decrement to 1 heart
    Hearts.decrement();
    expect(model.getOptions()).toEqual(CARD_OPTIONS3);
    
    // Reset back to 3 hearts
    Hearts.reset();
    expect(model.getOptions()).toEqual(CARD_OPTIONS1);
  });

  it("each CARD_OPTIONS set should have exactly 3 options", () => {
    expect(CARD_OPTIONS1.length).toBe(3);
    expect(CARD_OPTIONS2.length).toBe(3);
    expect(CARD_OPTIONS3.length).toBe(3);
  });

  it("each option should have required properties", () => {
    const allOptions = [...CARD_OPTIONS1, ...CARD_OPTIONS2, ...CARD_OPTIONS3];
    
    allOptions.forEach((opt) => {
      expect(opt).toHaveProperty("id");
      expect(opt).toHaveProperty("label");
      expect(opt).toHaveProperty("buyIn");
      expect(opt).toHaveProperty("payoff");
      expect(opt).toHaveProperty("faceCards");
      expect(opt).toHaveProperty("deckSize");
      
      expect(typeof opt.id).toBe("string");
      expect(typeof opt.label).toBe("string");
      expect(typeof opt.buyIn).toBe("number");
      expect(typeof opt.payoff).toBe("number");
      expect(typeof opt.faceCards).toBe("number");
      expect(typeof opt.deckSize).toBe("number");
    });
  });

  it("simulateByIndex should use correct options based on current hearts", async () => {
    const { Hearts } = await import("../gamestate");
    const { CardGameScreenModel } = await import("../screens/CardGameScreen/CardGameScreenModel");
    
    Hearts.reset();
    const model = new CardGameScreenModel();
    
    // Mock Math.random to always win
    vi.spyOn(Math, "random").mockReturnValue(0);
    
    // With 3 hearts, should use CARD_OPTIONS1
    const result3 = model.simulateByIndex(0);
    expect(result3).toBe(CARD_OPTIONS1[0].payoff - CARD_OPTIONS1[0].buyIn);
    
    // Decrement to 2 hearts
    Hearts.decrement();
    const result2 = model.simulateByIndex(0);
    expect(result2).toBe(CARD_OPTIONS2[0].payoff - CARD_OPTIONS2[0].buyIn);
    
    // Decrement to 1 heart
    Hearts.decrement();
    const result1 = model.simulateByIndex(0);
    expect(result1).toBe(CARD_OPTIONS3[0].payoff - CARD_OPTIONS3[0].buyIn);
    
    vi.restoreAllMocks();
  });
});

describe("CardGame Selected Option Tracking", () => {
  beforeEach(async () => {
    vi.resetModules();
  });

  it("should start with no selection (-1)", async () => {
    const { CardGameScreenModel } = await import("../screens/CardGameScreen/CardGameScreenModel");
    const model = new CardGameScreenModel();
    
    expect(model.getSelectedOption()).toBe(-1);
  });

  it("should track selected option correctly", async () => {
    const { CardGameScreenModel } = await import("../screens/CardGameScreen/CardGameScreenModel");
    const model = new CardGameScreenModel();
    
    model.setSelectedOption(0);
    expect(model.getSelectedOption()).toBe(0);
    
    model.setSelectedOption(1);
    expect(model.getSelectedOption()).toBe(1);
    
    model.setSelectedOption(2);
    expect(model.getSelectedOption()).toBe(2);
  });
});

