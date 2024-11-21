import {
  InfiniteData,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";

import api from "../axios";
import { GIFObject } from "../types/GIF";
import { PaginatedResponse } from "../types/APIResponse";

type TrendingGIFsParams = {
  limit?: number;
  offset?: number;
  rating?: string;
  random_id?: string;
  bundle?: string;
};

export type TrendingGIFsResponse = PaginatedResponse<GIFObject[]>;

export const useTrendingGIFsQuery = ({
  params,
}: {
  params?: Omit<TrendingGIFsParams, "offset">;
}) =>
  useInfiniteQuery({
    queryKey: ["trendingGifs"],
    queryFn: async ({ pageParam = 0 }: { pageParam: number }) => {
      const response = await api.get("gifs/trending", {
        params: {
          ...params,
          offset: pageParam,
          limit: params?.limit ?? 20,
        },
      });
      return response.data as TrendingGIFsResponse;
    },
    getNextPageParam: (lastPage, pages, lastPageParam, allPageParams) => {
      const nextOffset = lastPageParam + (params?.limit ?? 20);
      return nextOffset < 499 ? nextOffset : undefined;
    },
    initialPageParam: 0,
  });
