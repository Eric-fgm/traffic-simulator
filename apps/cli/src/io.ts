import fs from "fs/promises";
import { SimulationInputSchema } from "@traffic/helpers/validation";
import type { SimulationInput, SimulationOutput } from "@traffic/types";

export const getSimulationInput = async (
  path: string
): Promise<SimulationInput> => {
  const rawInput = await fs.readFile(path, "utf-8");

  return SimulationInputSchema.parse(JSON.parse(rawInput));
};

export const setSimulationOutput = async (
  path: string,
  output: SimulationOutput
) => await fs.writeFile(path, JSON.stringify(output), "utf-8");
