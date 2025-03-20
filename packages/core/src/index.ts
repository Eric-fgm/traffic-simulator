import type { SimulationInput } from "@traffic/types";
import Simulation from "./Simulation";

export { default as Simulation } from "./Simulation";

export const createSimulation = (input: SimulationInput) =>
  new Simulation(input);
