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
  private readonly vehiclesMap: Map<Direction, Vehicle[]> = new Map();
  private steps = 0;

  public getTrafficLights(): TrafficLight[] {
    return this.trafficPhases.getAllLights();
  }

  public countVehicles(): number {
    let count = 0;
    this.vehiclesMap.forEach((vehicles) => (count += vehicles.length));
    return count;
  }

  public getVehiclesMap(): Map<Direction, Vehicle[]> {
    return this.vehiclesMap;
  }

  public addVehicle(vehicle: Vehicle): void {
    const { origin } = vehicle;
    const vehiclesAtOrigin = this.vehiclesMap.get(origin) || [];
    vehiclesAtOrigin.push(vehicle);
    this.vehiclesMap.set(origin, vehiclesAtOrigin);
  }

  public removeVehicle(vehicle: Vehicle): void {
    const { origin } = vehicle;
    const updatedVehicles = (this.vehiclesMap.get(origin) ?? []).filter(
      ({ id }) => id !== vehicle.id
    );
    this.vehiclesMap.set(origin, updatedVehicles);
  }

  // Process vehicles based on the available traffic lights and resolve conflicts
  public processVehicles() {
    const { candidates, remaning } = this.trafficPhases
      .getActiveLights()
      .reduce<{ candidates: Vehicle[]; remaning: Vehicle[] }>(
        (acc, trafficLight) => {
          // Choose candidate based on origin Direction of vehicle and active traffic light
          const vehiclesAtOrigin =
            this.vehiclesMap.get(trafficLight.getOrigin()) ?? [];
          const [candidate, ...remainingVehicles] = vehiclesAtOrigin;
          if (candidate) {
            acc.candidates.push(candidate);
            acc.remaning.push(...remainingVehicles);
          }
          return acc;
        },
        { candidates: [], remaning: [] }
      );

    return {
      leftVehicles: this.resolveVehiclesConflict(candidates),
      remainingVehicles: remaning,
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
    return (
      totalVehicles !== 0 &&
      // When traffic lights are transitioning
      (this.trafficPhases.getTransitioningLights().length > 0 ||
        // When there are no more vehicles
        leftVehicles.length === 0 ||
        remainingVehicles.length === 0 ||
        // Based on traffic
        this.steps >=
          Math.ceil(
            (remainingVehicles.length / totalVehicles) * MAX_CONTINOUS_STEPS
          ))
    );
  }
}
