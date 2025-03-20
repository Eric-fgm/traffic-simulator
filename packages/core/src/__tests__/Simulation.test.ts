import { describe, it, expect, beforeEach } from "@jest/globals";
import Simulation from "../Simulation";
import type {
  SimulationCommand,
  SimulationInput,
  AddVehicleCommand,
} from "@traffic/types";

describe("Simulation", () => {
  let simulation: Simulation;

  beforeEach(() => {
    const input: SimulationInput = { commands: [] };
    simulation = new Simulation(input);
  });

  it("should add commands to the queue", () => {
    const command: SimulationCommand = { type: "step" };
    simulation.addCommand(command);
    expect(simulation.getCommands()).toContain(command);
  });

  it("should process addVehicle commands before stepping", () => {
    const addVehicleCommand: AddVehicleCommand = {
      type: "addVehicle",
      vehicleId: "V1",
      startRoad: "north",
      endRoad: "south",
    };
    const stepCommand: SimulationCommand = { type: "step" };

    simulation.addCommand(addVehicleCommand);
    simulation.addCommand(stepCommand);

    const result = simulation.step();

    expect(simulation.getTrafficController().countVehicles()).toBe(0);
    expect(result).toHaveProperty("leftVehicles");
  });

  it("should execute the full simulation and return step statuses", () => {
    const commands: SimulationCommand[] = [{ type: "step" }, { type: "step" }];

    commands.forEach((cmd) => simulation.addCommand(cmd));

    const output = simulation.simulate();
    expect(output.stepStatuses).toHaveLength(2);
  });
});
