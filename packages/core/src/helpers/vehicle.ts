import type { AddVehicleCommand, Direction, Vehicle } from "@traffic/types";

export const parseAddVehicleCommand = (
  command: AddVehicleCommand
): Vehicle => ({
  id: command.vehicleId,
  origin: command.startRoad,
  destination: command.endRoad,
});

const oppositeDirection: Record<Direction, Direction> = {
  north: "south",
  south: "north",
  west: "east",
  east: "west",
};

const rightDirection: Record<Direction, Direction> = {
  north: "west",
  south: "east",
  west: "south",
  east: "north",
};

const straightRoutes: [Direction, Direction][] = [
  ["north", "south"],
  ["south", "north"],
  ["west", "east"],
  ["east", "west"],
];

const leftTurnRoutes: [Direction, Direction][] = [
  ["north", "east"],
  ["south", "west"],
  ["west", "north"],
  ["east", "south"],
];

const isRouteInGroup = (
  candidate: Vehicle,
  routeGroup: [Direction, Direction][]
): boolean => {
  return routeGroup.some(
    ([origin, destination]) =>
      candidate.origin === origin && candidate.destination === destination
  );
};

const hasStraightRouteConflict = (
  candidate: Vehicle,
  otherVehicles: Vehicle[]
): boolean => {
  const conflictOrigin = rightDirection[candidate.origin];
  return otherVehicles.some((vehicle) => vehicle.origin === conflictOrigin);
};

const hasLeftTurnConflict = (
  candidate: Vehicle,
  otherVehicles: Vehicle[]
): boolean => {
  const conflictOrigins = [
    rightDirection[candidate.origin],
    oppositeDirection[candidate.origin],
  ];
  return otherVehicles.some(
    (vehicle) =>
      conflictOrigins.includes(vehicle.origin) &&
      !conflictOrigins.includes(vehicle.destination)
  );
};

export const hasVehicleConflit = (
  candidate: Vehicle,
  otherVehicles: Vehicle[]
): boolean => {
  // If the candidate is going straight
  if (isRouteInGroup(candidate, straightRoutes)) {
    return hasStraightRouteConflict(candidate, otherVehicles);
  }

  // If the candidate is turning left, check for conflicts
  if (isRouteInGroup(candidate, leftTurnRoutes)) {
    return hasLeftTurnConflict(candidate, otherVehicles);
  }

  // No conflicts occur when turning right
  return false;
};
