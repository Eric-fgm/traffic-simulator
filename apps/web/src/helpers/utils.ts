import type { Direction } from "@traffic/types";

export const getRandomColor = () => {
  return ["blue", "orange", "purple"][Math.floor(Math.random() * 3)];
};

export const getAnimationClass = (
  origin: Direction,
  destination: Direction
) => {
  if (
    (origin === "north" && destination === "south") ||
    (origin === "south" && destination === "north") ||
    (origin === "east" && destination === "west") ||
    (origin === "west" && destination === "east")
  ) {
    return "animate--straight";
  }

  if (
    (origin === "north" && destination === "west") ||
    (origin === "south" && destination === "east") ||
    (origin === "east" && destination === "north") ||
    (origin === "west" && destination === "south")
  ) {
    return "animate--right";
  }

  return "animate--left";
};

export const getVehiclePositionClass = (origin: Direction) => {
  if (origin === "north") {
    return "right-1/2 top-[calc(50%-200px)]";
  }
  if (origin === "south") {
    return "left-1/2 bottom-[calc(50%-200px)] rotate-180";
  }
  if (origin === "east") {
    return "bottom-1/2 right-[calc(50%-200px)] rotate-90";
  }
  if (origin === "west") {
    return "top-1/2 left-[calc(50%-200px)] -rotate-90";
  }
};

export const getTrafficLightPositionClass = (origin: Direction) => {
  if (origin === "north") {
    return "right-1/2 top-[calc(50%-120px)]";
  }
  if (origin === "south") {
    return "left-1/2 bottom-[calc(50%-120px)] rotate-180";
  }
  if (origin === "east") {
    return "bottom-1/2 right-[calc(50%-120px)] rotate-90";
  }
  if (origin === "west") {
    return "top-1/2 left-[calc(50%-120px)] -rotate-90";
  }
};

export const getButtonPositionClass = (origin: Direction) => {
  if (origin === "south") {
    return "-bottom-2 left-1/2 -translate-x-1/2 translate-y-full";
  }

  if (origin === "north") {
    return "-top-2 left-1/2 -translate-x-1/2 -translate-y-full";
  }

  if (origin === "west") {
    return "-left-2 top-1/2 -translate-y-1/2 -translate-x-full";
  }

  return "-right-2 top-1/2 -translate-y-1/2 translate-x-full";
};
