import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import api from "../axios";
import { GIFObject } from "../types/GIF";

type TrendingGIFsParams = {
  limit?: number;
  offset?: number;
  rating?: string;
  random_id?: string;
  bundle?: string;
};

export const useTrendingGIFsQuery = ({
  params,
  options,
}: {
  params: TrendingGIFsParams;
  options?: UseQueryOptions<GIFObject[]>;
}) =>
  useQuery({
    queryKey: ["trendingGifs"],
    queryFn: async () => {
      const response = await api.get("gifs/trending", {
        params,
      });
      return response.data as GIFObject[];
    },
    ...options,
  });
