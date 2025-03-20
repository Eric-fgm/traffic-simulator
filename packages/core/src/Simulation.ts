import type {
  AddVehicleCommand,
  SimulationCommand,
  SimulationInput,
  SimulationOutput,
  StepStatus,
} from "@traffic/types";
import TrafficController from "./TrafficController";
import { parseAddVehicleCommand } from "./helpers/vehicle";

/**
 * Manages the traffic simulation by processing input commands,
 * adding vehicles, and controlling traffic flow using `TrafficController`.
 */
export default class Simulation {
  private readonly trafficController = new TrafficController();
  private readonly commandQueue: SimulationCommand[];

  constructor(input: SimulationInput) {
    this.commandQueue = [...input.commands];
  }

  public getCommands(): SimulationCommand[] {
    return this.commandQueue;
  }

  public addCommand(command: SimulationCommand): void {
    this.commandQueue.push(command);
  }

  public getTrafficController(): TrafficController {
    return this.trafficController;
  }

  public step(): StepStatus {
    // proccess all 'addVehicle' commands
    while (this.commandQueue[0]?.type === "addVehicle") {
      const command = this.commandQueue.shift() as AddVehicleCommand;
      this.trafficController.addVehicle(parseAddVehicleCommand(command));
    }

    // run step if next command in queue exists and is a step command
    return this.commandQueue.shift()
      ? this.trafficController.step()
      : { leftVehicles: [] };
  }

  // process all simulation steps at once
  public simulate(): SimulationOutput {
    const stepStatuses = [];

    while (this.commandQueue.length) {
      stepStatuses.push(this.step());
    }

    return { stepStatuses };
  }
}
