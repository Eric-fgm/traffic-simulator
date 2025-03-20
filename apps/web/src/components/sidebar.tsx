import { useSimulation } from "../providers/simulation";
import Button from "./button";

const Sidebar: React.FC = () => {
  const { isRunning, runStep } = useSimulation();

  return (
    <div className="p-4 w-64">
      <h3 className="mb-2 text-xl font-semibold">Traffic Simulator</h3>
      <p className="mb-2 text-sm">
        1. Click the `Add` button near the intersection to add a vehicle.
      </p>
      <p className="mb-2 text-sm">
        2. Colored dots represent traffic lights and their current states.
      </p>
      <p className="text-sm">
        3. Click the `Run` button to run the next simulation step.
      </p>
      <p className="mt-4 mb-1 text-xs">Control</p>
      <Button text="Run" disabled={isRunning} onClick={runStep} />
    </div>
  );
};

export default Sidebar;
