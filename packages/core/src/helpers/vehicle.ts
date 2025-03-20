import type { AddVehicleCommand, Direction, Vehicle } from "@traffic/types";

export const parseAddVehicleCommand = (
  command: AddVehicleCommand
): Vehicle => ({
  id: command.vehicleId,
  origin: command.startRoad,
  destination: command.endRoad,
});

export const hasVehicleConflit = (
  candidate: Vehicle,
  vehicles: Vehicle[]
): boolean => {
  const oppositeDirections: Record<Direction, Direction> = {
    north: "south",
    south: "north",
    west: "east",
    east: "west",
  };

  if (
    (candidate.origin === "north" && candidate.destination === "west") ||
    (candidate.origin === "south" && candidate.destination === "east") ||
    (candidate.origin === "west" && candidate.destination === "south") ||
    (candidate.origin === "east" && candidate.destination === "north")
  ) {
    return vehicles.some(
      (vehicle) =>
        vehicle.origin === oppositeDirections[candidate.origin] &&
        vehicle.destination === candidate.destination
    );
  }

  if (
    (candidate.origin === "north" && candidate.destination === "east") ||
    (candidate.origin === "south" && candidate.destination === "west") ||
    (candidate.origin === "west" && candidate.destination === "north") ||
    (candidate.origin === "east" && candidate.destination === "south")
  ) {
    return vehicles.some(
      (vehicle) =>
        (vehicle.destination === candidate.destination &&
          (vehicle.origin === oppositeDirections[candidate.origin] ||
            vehicle.origin === oppositeDirections[vehicle.destination])) ||
        (vehicle.destination === candidate.origin &&
          (vehicle.origin === oppositeDirections[candidate.origin] ||
            vehicle.origin === oppositeDirections[vehicle.destination]))
    );
  }

  return false;
};
