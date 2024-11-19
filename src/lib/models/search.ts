import { useQuery, UseQueryOptions } from "@tanstack/react-query";

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

type SearchResponse = PaginatedResponse<GIFObject>;

export const useSearchQuery = ({
  params,
  options,
}: {
  params: SearchParams;
  options?: UseQueryOptions<SearchResponse>;
}) =>
  useQuery({
    queryKey: ["search"],
    queryFn: async () => {
      const response = await api.get("gifs/search", {
        params,
      });
      return response.data as SearchResponse;
    },
    ...options,
  });

type SearchSuggestionsParams = {
  term: string;
};

type SearchSuggestionsResponse = APIResponse<SearchSuggestion>;

export const useSearchSuggestionsQuery = ({
  params,
  options,
}: {
  params: SearchSuggestionsParams;
  options?: UseQueryOptions<SearchSuggestionsResponse>;
}) =>
  useQuery({
    queryKey: ["searchSuggestions"],
    queryFn: async () => {
      const response = await api.get(`tags/related/${params.term}`);
      return response.data as SearchSuggestionsResponse;
    },
    ...options,
  });
