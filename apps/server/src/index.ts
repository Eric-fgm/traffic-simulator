import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { createSimulation } from "@traffic/core";
import vehicles from "./vehicles";
import simulation from "./simulation";
import trafficLights from "./traffic-lights";
import type { AppEnv } from "./types";

const simulationInstance = createSimulation({ commands: [] });

const app = new Hono<AppEnv>()
  .use(cors())
  .use((c, next) => {
    c.set("simulation", simulationInstance);
    return next();
  })
  .route("/v1/vehicles", vehicles)
  .route("/v1/simulation", simulation)
  .route("/v1/traffic-lights", trafficLights);

serve({ fetch: app.fetch, port: 8080 });

export default app;
