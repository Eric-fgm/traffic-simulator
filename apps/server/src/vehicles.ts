import { randomUUID } from "node:crypto";
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { VehiclePartialSchema } from "@traffic/helpers/validation";
import type { AppEnv } from "./types";

const vehicleApp = new Hono<AppEnv>()
  .get((c) => {
    const vehicles = c
      .get("simulation")
      .getTrafficController()
      .getVehiclesMap();

    return c.json(vehicles);
  })
  .post(zValidator("json", VehiclePartialSchema), async (c) => {
    const partialVehicle = c.req.valid("json");
    const vehicle = { id: randomUUID(), ...partialVehicle };

    c.get("simulation").getTrafficController().addVehicle(vehicle);

    return c.json(vehicle, 201);
  });

export default vehicleApp;
