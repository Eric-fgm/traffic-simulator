import type { Direction } from "@traffic/types";
import { useSimulation } from "../providers/simulation";
import Button from "./button";
import { getButtonPositionClass } from "../helpers/utils";

interface AddVehicleButtonProps {
  origin: Direction;
}

const destinations = ["north", "south", "west", "east"];

const AddVehicleButton: React.FC<AddVehicleButtonProps> = ({ origin }) => {
  const { isRunning, addVehicle } = useSimulation();

  return (
    <Button
      text="Add"
      disabled={isRunning}
      className={`absolute ${getButtonPositionClass(origin)}`}
      onClick={() => {
        const destination = window.prompt(
          `Write destination: ${destinations.filter((destination) => destination !== origin).join(", ")}`
        );
        if (!destination) return;

        if (destination === origin || !destinations.includes(destination)) {
          return window.alert("Wrong destination");
        }

        addVehicle({
          origin,
          destination: destination as Direction,
        });
      }}
    />
  );
};

export default AddVehicleButton;
