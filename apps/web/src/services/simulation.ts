import {
  useMutation,
  useQueryClient,
  type UseMutationOptions,
} from "@tanstack/react-query";
import {
  API_BASE,
  TRAFFIC_LIGHTS_QUERY_KEY,
  VEHICLES_QUERY_KEY,
} from "../helpers/constants";
import type { StepStatus } from "@traffic/types";

const runStep = async (): Promise<StepStatus> => {
  const response = await fetch(`${API_BASE}/v1/simulation/step`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};

export const useStepMutation = (options?: UseMutationOptions<StepStatus>) => {
  const queryClient = useQueryClient();

  const { mutate, ...restMutation } = useMutation({
    ...options,
    mutationFn: runStep,
    onSuccess: async (data, variables, context) => {
      if (options?.onSuccess) await options.onSuccess(data, variables, context);

      queryClient.invalidateQueries({ queryKey: VEHICLES_QUERY_KEY });
      queryClient.invalidateQueries({
        queryKey: TRAFFIC_LIGHTS_QUERY_KEY,
      });
    },
  });

  return {
    step: mutate,
    ...restMutation,
  };
};
