import { describe, it, expect } from "@jest/globals";
import { hasVehicleConflit } from "../../helpers/vehicle";
import type { Direction, Vehicle } from "@traffic/types";

describe("hasVehicleConflit", () => {
  const createVehicle = (
    id: string,
    origin: Direction,
    destination: Direction
  ): Vehicle => ({
    id,
    origin,
    destination,
  });

  it("should return false when there are no conflicting vehicles", () => {
    const candidate = createVehicle("V1", "north", "west");
    const vehicles = [createVehicle("V2", "east", "south")];

    expect(hasVehicleConflit(candidate, vehicles)).toBe(false);
  });

  it("should detect conflict for right-turning vehicles", () => {
    const candidate = createVehicle("V1", "north", "west");
    const vehicles1 = [createVehicle("V2", "south", "west")];
    const vehicles2 = [
      createVehicle("V2", "south", "north"),
      createVehicle("V3", "south", "east"),
      createVehicle("V4", "east", "north"),
      createVehicle("V5", "east", "south"),
      createVehicle("V6", "west", "south"),
      createVehicle("V7", "west", "north"),
      createVehicle("V8", "west", "east"),
    ];

    expect(hasVehicleConflit(candidate, vehicles1)).toBe(true);
    expect(hasVehicleConflit(candidate, vehicles2)).toBe(false);
  });

  it("should detect conflict for left-turning vehicles", () => {
    const candidate = createVehicle("V1", "north", "east");
    const vehicles1 = [createVehicle("V2", "south", "east")];
    const vehicles2 = [createVehicle("V2", "south", "north")];
    const vehicles3 = [
      createVehicle("V2", "south", "west"),
      createVehicle("V3", "west", "south"),
      createVehicle("V4", "east", "north"),
    ];

    expect(hasVehicleConflit(candidate, vehicles1)).toBe(true);
    expect(hasVehicleConflit(candidate, vehicles2)).toBe(true);
    expect(hasVehicleConflit(candidate, vehicles3)).toBe(false);
  });

  it("should return false for vehicles moving straight with no conflict", () => {
    const candidate = createVehicle("V1", "north", "south");
    const vehicles = [createVehicle("V2", "west", "east")];

    expect(hasVehicleConflit(candidate, vehicles)).toBe(false);
  });
});
