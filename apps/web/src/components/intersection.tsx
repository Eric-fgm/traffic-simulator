import { Vehicle } from ".";
import { useSimulation } from "../providers/simulation";
import AddVehicleButton from "./add-vehicle-button";
import TrafficLight from "./traffic-light";

const Intersection: React.FC = () => {
  const { vehiclesMap, trafficLights, leftVehicles } = useSimulation();

  return (
    <div className="mt-16 ml-16 relative">
      <AddVehicleButton origin="north" />
      <AddVehicleButton origin="south" />
      <AddVehicleButton origin="west" />
      <AddVehicleButton origin="east" />
      <div className="relative w-[800px] h-[800px] overflow-hidden">
        {Object.values(vehiclesMap).map((vehicles) =>
          vehicles.map((vehicle, index) => (
            <Vehicle
              key={vehicle.id}
              order={index}
              animate={leftVehicles.includes(vehicle.id)}
              {...vehicle}
            />
          ))
        )}
        {trafficLights.map((trafficLight) => (
          <TrafficLight key={trafficLight.origin} {...trafficLight} />
        ))}
        <div>
          <img
            src="../../public/intersection.png"
            alt="intersection"
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Intersection;
