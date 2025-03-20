export type Direction = "north" | "south" | "west" | "east";

export interface Vehicle {
  id: string;
  origin: Direction;
  destination: Direction;
}

export interface AddVehicleCommand {
  type: "addVehicle";
  vehicleId: string;
  startRoad: Direction;
  endRoad: Direction;
}

export interface StepCommand {
  type: "step";
}

export type SimulationCommand = AddVehicleCommand | StepCommand;

export interface SimulationInput {
  commands: SimulationCommand[];
}

export interface StepStatus {
  leftVehicles: string[];
}

export interface SimulationOutput {
  stepStatuses: StepStatus[];
}
