import { Direction } from "@traffic/types";
import { getTrafficLightPositionClass } from "../helpers/utils";

export interface TrafficLightProps {
  origin: Direction;
  state: "GREEN" | "RED" | "YELLOW";
}

const TrafficLight: React.FC<TrafficLightProps> = ({ origin, state }) => {
  const stateColorClass =
    state === "GREEN"
      ? "bg-green-600"
      : state === "RED"
        ? "bg-red-600"
        : "bg-orange-300";

  return (
    <div
      className={`absolute w-8 h-8 rounded-full ${getTrafficLightPositionClass(origin)} ${stateColorClass}`}
    />
  );
};

export default TrafficLight;
