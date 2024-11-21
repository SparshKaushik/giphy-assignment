import {
  useInfiniteQuery,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";

import api from "../axios";
import { GIFObject } from "../types/GIF";
import { APIResponse, PaginatedResponse } from "../types/APIResponse";
import { SearchSuggestion } from "../types/Search";

type SearchParams = {
  q: string;
  limit?: number;
  offset?: number;
  rating?: string;
  lang?: string;
  random_id?: string;
  bundle?: string;
};

type SearchResponse = PaginatedResponse<GIFObject[]>;

export const useSearchQuery = ({
  params,
  options,
}: {
  params: SearchParams;
  options?: {
    enabled: boolean;
  };
}) =>
  useInfiniteQuery({
    queryKey: ["search", params],
    queryFn: async ({ pageParam = 0 }: { pageParam: number }) => {
      const response = await api.get("gifs/search", {
        params: {
          ...params,
          offset: pageParam,
          limit: 20,
        },
      });
      return response.data as SearchResponse;
    },
    getNextPageParam: (lastPage, pages, lastPageParam) => {
      const nextOffset = lastPageParam + (params?.limit ?? 20);
      return nextOffset < 4999 ? nextOffset : undefined;
    },
    initialPageParam: 0,
  });

type SearchSuggestionsParams = {
  term: string;
};

type SearchSuggestionsResponse = APIResponse<SearchSuggestion[]>;

export const useSearchSuggestionsQuery = ({
  params,
  options,
}: {
  params: SearchSuggestionsParams;
  options?: Omit<UseQueryOptions<SearchSuggestionsResponse>, "queryKey">;
}) =>
  useQuery({
    queryKey: ["searchSuggestions"],
    queryFn: async () => {
      const response = await api.get(`tags/related/${params.term}`);
      return response.data as SearchSuggestionsResponse;
    },
    ...options,
  });
