import type { Direction, Vehicle } from "@traffic/types";
import { createContext, useContext, useState } from "react";
import { useVehiclesMapQuery, useVehiclesMutation } from "../services/vehicle";
import { useTrafficLightsQuery } from "../services/traffic-lights";
import { useStepMutation } from "../services/simulation";
import type { TrafficLightProps } from "../components/traffic-light";

const SimulationContext = createContext<{
  isRunning: boolean;
  leftVehicles: string[];
  vehiclesMap: { [K in Direction]?: Vehicle[] };
  trafficLights: TrafficLightProps[];
  addVehicle: (vehicle: Omit<Vehicle, "id">) => void;
  runStep: () => void;
}>({
  isRunning: false,
  leftVehicles: [],
  vehiclesMap: {},
  trafficLights: [],
  addVehicle: () => {},
  runStep: () => {},
});

export const useSimulation = () => useContext(SimulationContext);

const SimulationProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [leftVehicles, setLeftVehicles] = useState<string[]>([]);
  const { vehiclesMap } = useVehiclesMapQuery();
  const { trafficLights } = useTrafficLightsQuery();
  const { addVehicle } = useVehiclesMutation();
  const { step, isPending } = useStepMutation({
    onSuccess: async ({ leftVehicles }) => {
      setLeftVehicles(leftVehicles);
      if (leftVehicles.length) {
        await new Promise((r) => setTimeout(r, 2500));
      }
    },
  });

  return (
    <SimulationContext.Provider
      value={{
        isRunning: isPending,
        leftVehicles,
        vehiclesMap,
        trafficLights,
        addVehicle,
        runStep: () => step(),
      }}
    >
      {children}
    </SimulationContext.Provider>
  );
};

export default SimulationProvider;
