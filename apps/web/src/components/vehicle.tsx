import { useState } from "react";
import type { Vehicle as VehicleProps } from "@traffic/types";
import {
  getAnimationClass,
  getRandomColor,
  getVehiclePositionClass,
} from "../helpers/utils";
import { VEHICLE_OFFSET } from "../helpers/constants";

const Vehicle: React.FC<
  VehicleProps & {
    order: number;
    animate?: boolean;
  }
> = ({ origin, destination, order = 0, animate = false }) => {
  const [color] = useState(getRandomColor());

  return (
    <div
      className={`absolute ${getVehiclePositionClass(origin)} ${animate && getAnimationClass(origin, destination)}`}
      style={{ transform: `translateY(-${order * (100 + VEHICLE_OFFSET)}px)` }}
      title={`From [${origin}] to [${destination}]`}
    >
      <img src={`../../public/${color}-car.png`} alt="vehicle" />
    </div>
  );
};

export default Vehicle;
