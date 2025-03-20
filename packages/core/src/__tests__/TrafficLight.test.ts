import { describe, it, expect } from "@jest/globals";
import type { Direction } from "@traffic/types";
import TrafficLight, { TrafficSignal } from "../TrafficLight";

describe("TrafficLight", () => {
  const mockDirection: Direction = "north";

  it("should initialize with the given state and origin", () => {
    const trafficLight = new TrafficLight(mockDirection, TrafficSignal.RED);
    expect(trafficLight.getOrigin()).toBe(mockDirection);
    expect(trafficLight.getState()).toBe(TrafficSignal.RED);
  });

  it("should transition from RED to GREEN", () => {
    const trafficLight = new TrafficLight(mockDirection, TrafficSignal.RED);
    trafficLight.changeState();
    expect(trafficLight.getState()).toBe(TrafficSignal.GREEN);
  });

  it("should transition from GREEN to YELLOW", () => {
    const trafficLight = new TrafficLight(mockDirection, TrafficSignal.GREEN);
    trafficLight.changeState();
    expect(trafficLight.getState()).toBe(TrafficSignal.YELLOW);
  });

  it("should transition from YELLOW to RED", () => {
    const trafficLight = new TrafficLight(mockDirection, TrafficSignal.YELLOW);
    trafficLight.changeState();
    expect(trafficLight.getState()).toBe(TrafficSignal.RED);
  });

  it("should cycle through states correctly", () => {
    const trafficLight = new TrafficLight(mockDirection, TrafficSignal.RED);
    trafficLight.changeState();
    expect(trafficLight.getState()).toBe(TrafficSignal.GREEN);

    trafficLight.changeState();
    expect(trafficLight.getState()).toBe(TrafficSignal.YELLOW);

    trafficLight.changeState();
    expect(trafficLight.getState()).toBe(TrafficSignal.RED);
  });
});
