import { useQuery } from "@tanstack/react-query";
import { API_BASE, TRAFFIC_LIGHTS_QUERY_KEY } from "../helpers/constants";
import type { TrafficLightProps } from "../components/traffic-light";

const fetchTrafficLights = async (): Promise<TrafficLightProps[]> => {
  const response = await fetch(`${API_BASE}/v1/traffic-lights`);
  return await response.json();
};

export const useTrafficLightsQuery = () => {
  const { data = [], ...restQuery } = useQuery({
    queryKey: TRAFFIC_LIGHTS_QUERY_KEY,
    queryFn: fetchTrafficLights,
  });

  return {
    trafficLights: data,
    ...restQuery,
  };
};
