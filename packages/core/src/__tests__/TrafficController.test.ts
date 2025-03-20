import { describe, it, expect, beforeEach } from "@jest/globals";
import TrafficController from "../TrafficController";
import type { Direction, Vehicle } from "@traffic/types";

const createMockVehicle = (
  id: string,
  origin: Direction,
  destination: Direction = "south"
): Vehicle => ({
  id,
  origin,
  destination,
});

describe("TrafficController", () => {
  let trafficController: TrafficController;

  beforeEach(() => {
    trafficController = new TrafficController();
  });

  it("should add and remove vehicles correctly", () => {
    const vehicle = createMockVehicle("V1", "north");
    trafficController.addVehicle(vehicle);
    expect(trafficController.countVehicles()).toBe(1);

    trafficController.removeVehicle(vehicle);
    expect(trafficController.countVehicles()).toBe(0);
  });

  it("should process vehicles and determine left vehicles case 1", () => {
    const vehicle1 = createMockVehicle("V1", "north");
    const vehicle2 = createMockVehicle("V2", "west");
    trafficController.addVehicle(vehicle1);
    trafficController.addVehicle(vehicle2);

    const result = trafficController.processVehicles();
    expect(result.leftVehicles).toEqual([vehicle1]);
    expect(result.remainingVehicles).toEqual([]);
  });

  it("should process vehicles and determine left vehicles case 2", () => {
    const vehicle1 = createMockVehicle("V1", "north");
    const vehicle2 = createMockVehicle("V2", "south", "north");
    trafficController.addVehicle(vehicle1);
    trafficController.addVehicle(vehicle2);

    const result = trafficController.processVehicles();
    expect(result.leftVehicles).toEqual([vehicle1, vehicle2]);
    expect(result.remainingVehicles).toEqual([]);
  });

  it("should process vehicles and determine left vehicles case 3", () => {
    const vehicle1 = createMockVehicle("V1", "north", "east");
    const vehicle2 = createMockVehicle("V2", "south", "north");
    trafficController.addVehicle(vehicle1);
    trafficController.addVehicle(vehicle2);

    const result = trafficController.processVehicles();
    expect(result.leftVehicles).toEqual([vehicle2]);
    expect(result.remainingVehicles).toEqual([]);
  });

  it("should execute a simulation step and return left vehicle IDs", () => {
    const vehicle = createMockVehicle("V1", "north");
    trafficController.addVehicle(vehicle);
    const stepStatus = trafficController.step();

    expect(stepStatus).toHaveProperty("leftVehicles");
    expect(Array.isArray(stepStatus.leftVehicles)).toBe(true);
  });
});
