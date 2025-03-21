import type { Direction, StepStatus, Vehicle } from "@traffic/types";
import { TrafficPhases } from "./TrafficPhases";
import { MAX_CONTINOUS_STEPS } from "./helpers/constants";
import { hasVehicleConflit } from "./helpers/vehicle";
import type TrafficLight from "./TrafficLight";

/**
 * Controls the simulation of a traffic system by managing vehicles,
 * processing traffic light phases using `TrafficPhases`, and determining when to switch phases.
 */
export default class TrafficController {
  private readonly trafficPhases = new TrafficPhases();
  // vehicleMap based on vehicle origin
  private readonly vehiclesMap: Record<Direction, Vehicle[]> = {
    north: [],
    east: [],
    south: [],
    west: [],
  };
  private steps = 0;

  public getTrafficLights(): TrafficLight[] {
    return this.trafficPhases.getAllLights();
  }

  public countVehicles(): number {
    return Object.values(this.vehiclesMap).reduce(
      (count, vehicles) => count + vehicles.length,
      0
    );
  }

  public getVehiclesMap(): Record<Direction, Vehicle[]> {
    return this.vehiclesMap;
  }

  public addVehicle(vehicle: Vehicle): void {
    if (vehicle.origin === vehicle.destination) {
      throw new Error("Turning back at the intersection is not allowed.");
    }

    this.vehiclesMap[vehicle.origin].push(vehicle);
  }

  public removeVehicle(vehicle: Vehicle): void {
    const updatedVehicles = this.vehiclesMap[vehicle.origin].filter(
      ({ id }) => id !== vehicle.id
    );
    this.vehiclesMap[vehicle.origin] = updatedVehicles;
  }

  // Process vehicles based on the available traffic lights and resolve conflicts
  public processVehicles() {
    const { candidates, remainingVehicles } = this.trafficPhases
      .getActiveLights()
      .reduce<{ candidates: Vehicle[]; remainingVehicles: Vehicle[] }>(
        (acc, trafficLight) => {
          // Choose candidate based on origin Direction of vehicle and active traffic light
          const vehiclesAtOrigin = this.vehiclesMap[trafficLight.getOrigin()];
          const remainingVehicles = vehiclesAtOrigin;
          if (remainingVehicles.length) {
            acc.candidates.push(remainingVehicles[0]);
            acc.remainingVehicles.push(...remainingVehicles);
          }
          return acc;
        },
        { candidates: [], remainingVehicles: [] }
      );

    return {
      leftVehicles: this.resolveVehiclesConflict(candidates),
      remainingVehicles: remainingVehicles,
    };
  }

  public step(): StepStatus {
    const { leftVehicles, remainingVehicles } = this.processVehicles();

    if (this.shouldRunNextPhase(leftVehicles, remainingVehicles)) {
      this.trafficPhases.nextPhase();
      this.steps = 0;
    } else {
      this.steps++;
    }

    return { leftVehicles: leftVehicles.map(({ id }) => id) };
  }

  private resolveVehiclesConflict(vehicles: Vehicle[]): Vehicle[] {
    return vehicles
      .filter((candidate) => !hasVehicleConflit(candidate, vehicles))
      .map((vehicle) => {
        this.removeVehicle(vehicle);
        return vehicle;
      });
  }

  // Determine when next phase should run
  private shouldRunNextPhase(
    leftVehicles: Vehicle[],
    remainingVehicles: Vehicle[]
  ): boolean {
    const totalVehicles = this.countVehicles();
    const pendingVehicles = remainingVehicles.length - leftVehicles.length;

    // If traffic lights are transitioning (YELLOW -> RED) or no more vehicles are pending, run the next phase
    if (
      this.trafficPhases.getTransitioningLights().length > 0 ||
      (pendingVehicles === 0 && leftVehicles.length)
    ) {
      return true;
    }

    // Calculate the effective number of vehicles still waiting to clear the intersection.
    const remaningTrafficDensity = totalVehicles
      ? pendingVehicles / totalVehicles
      : 0;

    return (
      pendingVehicles !== totalVehicles &&
      // Based on traffic density
      this.steps >= Math.ceil(remaningTrafficDensity * MAX_CONTINOUS_STEPS)
    );
  }
}
