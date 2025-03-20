import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { API_BASE, VEHICLES_QUERY_KEY } from "../helpers/constants";
import type { Direction, Vehicle } from "@traffic/types";

const fetchVehiclesMap = async (): Promise<{
  [K in Direction]?: Vehicle[];
}> => {
  const response = await fetch(`${API_BASE}/v1/vehicles`);
  return await response.json();
};

const addVehicle = async (vehicle: Omit<Vehicle, "id">): Promise<Vehicle> => {
  const response = await fetch(`${API_BASE}/v1/vehicles`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(vehicle),
  });
  return await response.json();
};

export const useVehiclesMapQuery = () => {
  const { data = {}, ...restQuery } = useQuery({
    queryKey: VEHICLES_QUERY_KEY,
    queryFn: fetchVehiclesMap,
  });

  return {
    vehiclesMap: data,
    ...restQuery,
  };
};

export const useVehiclesMutation = () => {
  const queryClient = useQueryClient();

  const { mutate, ...restMutation } = useMutation({
    mutationFn: addVehicle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: VEHICLES_QUERY_KEY });
    },
  });

  return {
    addVehicle: mutate,
    ...restMutation,
  };
};
