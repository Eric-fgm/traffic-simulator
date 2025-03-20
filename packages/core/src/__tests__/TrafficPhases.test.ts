import { describe, it, expect, beforeEach } from "@jest/globals";
import { TrafficSignal } from "../TrafficLight";
import { TrafficPhases } from "../TrafficPhases";

describe("TrafficPhases", () => {
  let trafficPhases: TrafficPhases;

  beforeEach(() => {
    trafficPhases = new TrafficPhases();
  });

  it("should initialize with four traffic lights", () => {
    const allLights = trafficPhases.getAllLights();
    expect(allLights).toHaveLength(4);
  });

  it("should return active lights (non-red)", () => {
    const activeLights = trafficPhases.getActiveLights();
    expect(activeLights).toHaveLength(2);
    expect(
      activeLights.every((light) => light.getState() !== TrafficSignal.RED)
    ).toBe(true);
  });

  it("should return transitioning lights (yellow)", () => {
    expect(trafficPhases.getTransitioningLights()).toHaveLength(0);
  });

  it("should transition phases correctly", () => {
    trafficPhases.nextPhase();
    const transitioningLights = trafficPhases.getTransitioningLights();
    expect(transitioningLights.length).toBeGreaterThan(0);
  });

  it("should cycle through traffic phases", () => {
    const initialActive = trafficPhases
      .getActiveLights()
      .map((light) => light.getState());

    trafficPhases.nextPhase();

    const afterFirstPhase = trafficPhases
      .getActiveLights()
      .map((light) => light.getState());

    expect(afterFirstPhase).not.toEqual(initialActive);
  });
});
