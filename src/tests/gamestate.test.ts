import { beforeEach, describe, expect, it, vi } from "vitest";

// Mock Konva with a minimal implementation so gamestate can create layers/groups/paths
vi.mock("konva", () => {
  const createdPaths: any[] = [];

  class Path {
    cfg: any;
    destroyed = false;
    constructor(cfg: any) {
      this.cfg = cfg;
      createdPaths.push(this);
    }
    destroy() {
      this.destroyed = true;
    }
  }

  class Group {
    children: any[] = [];
    x = 0;
    y = 0;
    constructor() {}
    add(n: any) {
      this.children.push(n);
    }
    find(_selector: string) {
      // very small subset used by tests
      return this.children.filter((c) => c instanceof Path);
    }
    getLayer() {
      return {
        draw: () => {},
      };
    }
  }

  class Layer {
    children: any[] = [];
    drawCalled = false;
    constructor() {}
    add(g: any) {
      this.children.push(g);
    }
    draw() {
      this.drawCalled = true;
    }
  }

  const stages: any[] = [];

  return {
    default: {
      Layer,
      Group,
      Path,
      stages,
      // helpers for tests
      __createdPaths: createdPaths,
      __reset: () => {
        createdPaths.length = 0;
        stages.length = 0;
      },
    },
  };
});

describe("Hearts (gamestate)", () => {
  beforeEach(async () => {
    // Reset modules so gamestate initial state is fresh for each test
    vi.resetModules();
    const Konva: any = await import("konva");
    Konva.default.__reset();
  });

  it("starts with 3 hearts", async () => {
    const { Hearts } = await import("../gamestate");
    expect(Hearts.get()).toBe(3);
  });

  it("decrement reduces count and returns false when zero", async () => {
    const { Hearts } = await import("../gamestate");
    expect(Hearts.get()).toBe(3);
    expect(Hearts.decrement()).toBe(true);
    expect(Hearts.get()).toBe(2);
    expect(Hearts.decrement()).toBe(true);
    expect(Hearts.get()).toBe(1);
    const last = Hearts.decrement();
    expect(last).toBe(false);
    expect(Hearts.get()).toBe(0);
  });

  it("draw does not throw if no Konva stage is present", async () => {
    const Konva: any = await import("konva");
    const { Hearts } = await import("../gamestate");
    // Create a mock group and ensure drawing into it does not throw
    const mockGroup = new Konva.default.Group();
    expect(() => Hearts.draw(mockGroup)).not.toThrow();
  });

  it("draw creates a top-level layer and Path nodes when a stage exists", async () => {
    const Konva: any = await import("konva");
    const { Hearts } = await import("../gamestate");

    const mockGroup = new Konva.default.Group();
    Hearts.draw(mockGroup);

    // Group should contain Path nodes equal to Hearts.get()
    const paths = mockGroup.find("Path");
    expect(paths.length).toBe(Hearts.get());
  });
});
