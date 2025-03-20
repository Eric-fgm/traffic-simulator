import { Hono } from "hono";
import type { AppEnv } from "./types";

const trafficLightsApp = new Hono<AppEnv>().get(async (c) => {
  const trafficLights = c
    .get("simulation")
    .getTrafficController()
    .getTrafficLights();

  return c.json(trafficLights);
});

export default trafficLightsApp;
