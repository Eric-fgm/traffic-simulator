import TrafficLight, { TrafficSignal } from "./TrafficLight";

/**
 * Manages traffic light phases by grouping lights into distinct cycles
 * and controlling which lights are active in each phase.
 */
export class TrafficPhases {
  private readonly allLights: TrafficLight[];
  private readonly phases: TrafficLight[][];

  constructor() {
    const northLight = new TrafficLight("north", TrafficSignal.GREEN);
    const southLight = new TrafficLight("south", TrafficSignal.GREEN);
    const westLight = new TrafficLight("west", TrafficSignal.RED);
    const eastLight = new TrafficLight("east", TrafficSignal.RED);

    this.phases = [
      [northLight, southLight],
      [westLight, eastLight],
    ];
    this.allLights = [northLight, southLight, westLight, eastLight];
  }

  public getAllLights(): TrafficLight[] {
    return this.allLights;
  }

  public getActiveLights(): TrafficLight[] {
    return this.allLights.filter(
      (light) => light.getState() !== TrafficSignal.RED
    );
  }

  public getTransitioningLights(): TrafficLight[] {
    return this.allLights.filter(
      (light) => light.getState() === TrafficSignal.YELLOW
    );
  }

  /**
   * Advances to the next traffic light phase, following this sequence:
   * - If any light in the current phase is yellow, the next phase is activated.
   * - Otherwise, the current phase transitions to yellow before switching.
   */
  public nextPhase(): void {
    if (!this.phases.length) return;

    const [currentPhase, nextPhase] = this.phases;

    if (nextPhase && this.getTransitioningLights().length) {
      nextPhase.forEach((light) => light.changeState());
      this.phases.push(this.phases.shift()!);
    }

    currentPhase.forEach((light) => light.changeState());
  }
}
