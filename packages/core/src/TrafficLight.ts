import type { Direction } from "@traffic/types";

export enum TrafficSignal {
  RED = "RED",
  GREEN = "GREEN",
  YELLOW = "YELLOW",
}

/**
 * Represents a traffic light with three possible states: RED, GREEN, and YELLOW.
 */
export default class TrafficLight {
  constructor(
    private readonly origin: Direction,
    private state: TrafficSignal
  ) {}

  public getOrigin(): Direction {
    return this.origin;
  }

  public getState(): TrafficSignal {
    return this.state;
  }

  public changeState(): void {
    const stateTransitionMap: Record<TrafficSignal, TrafficSignal> = {
      [TrafficSignal.GREEN]: TrafficSignal.YELLOW,
      [TrafficSignal.YELLOW]: TrafficSignal.RED,
      [TrafficSignal.RED]: TrafficSignal.GREEN,
    };

    this.state = stateTransitionMap[this.state];
  }
}
