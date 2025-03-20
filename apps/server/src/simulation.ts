import { Hono } from "hono";
import type { AppEnv } from "./types";

const simulationApp = new Hono<AppEnv>().post("/step", async (c) => {
  const simulation = c.get("simulation");
  simulation.addCommand({ type: "step" });

  return c.json(simulation.step());
});

export default simulationApp;
