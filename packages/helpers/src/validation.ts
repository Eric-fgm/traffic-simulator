import { z } from "zod";

export const DirectionSchema = z.union([
  z.literal("north"),
  z.literal("south"),
  z.literal("west"),
  z.literal("east"),
]);

export const AddVehicleCommandSchema = z.object({
  type: z.literal("addVehicle"),
  vehicleId: z.string(),
  startRoad: DirectionSchema,
  endRoad: DirectionSchema,
});

export const StepCommandSchema = z.object({
  type: z.literal("step"),
});

export const CommandSchema = z.union([
  AddVehicleCommandSchema,
  StepCommandSchema,
]);

export const SimulationInputSchema = z.object({
  commands: z.array(CommandSchema),
});

export const VehicleSchema = z.object({
  id: z.string().min(1),
  origin: DirectionSchema,
  destination: DirectionSchema,
});

export const VehiclePartialSchema = VehicleSchema.omit({ id: true });
