import { createSimulation } from "@traffic/core";
import { getProcessArguments } from "./arguments";
import { getSimulationInput, setSimulationOutput } from "./io";

/*
    Main function of CLI.
*/
(async () => {
  const [inputPath, outputPath] = getProcessArguments();

  const simulationInput = await getSimulationInput(inputPath);

  const simulation = createSimulation(simulationInput);

  setSimulationOutput(outputPath, simulation.simulate());
})();
