export type APIResponse<T> = {
  data: T;
  meta: {
    msg: string;
    status: number;
    response_id: string;
  };
};

export type PaginatedResponse<T> = APIResponse<T> & {
  offset: number;
  total_count: number;
  count: number;
};
