import { UseQueryOptions, useQuery } from "@tanstack/react-query";

import api from "@/lib/axios";
import { APIResponse } from "@/lib/types/APIResponse";
import { GIFObject } from "@/lib/types/GIF";

type GIFByIDParams = {
  gif_id: string;
  random_id?: string;
  rating?: string;
};

type GIFByIDResponse = APIResponse<GIFObject>;

export const useGIFByIDQuery = ({
  params,
  options,
}: {
  params: GIFByIDParams;
  options?: UseQueryOptions<GIFByIDResponse>;
}) =>
  useQuery({
    queryKey: ["gifByID"],
    queryFn: async () => {
      const response = await api.get(`gifs/${params.gif_id}`, {
        params: {
          random_id: params.random_id,
          rating: params.rating,
        },
      });
      return response.data as GIFByIDResponse;
    },
    ...options,
  });
