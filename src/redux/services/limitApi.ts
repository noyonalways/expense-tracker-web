import { LimitFormData } from "@/schemas/set-limit";
import { Limit, LimitResponse } from "@/types/limit";
import { baseApi } from "./baseApi";

interface GetLimitsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Limit[];
}

export const limitApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getLimits: builder.query<Limit[], void>({
      query: () => ({
        url: "/spending-limits",
        method: "GET",
      }),
      transformResponse: (response: GetLimitsResponse) => response.data,
      providesTags: ["Limit"],
    }),
    setLimit: builder.mutation<Limit, LimitFormData>({
      query: (data) => ({
        url: "/spending-limits",
        method: "POST",
        body: data,
      }),
      transformResponse: (response: LimitResponse) => response.data,
      invalidatesTags: ["Limit"],
    }),
  }),
});

export const { useGetLimitsQuery, useSetLimitMutation } = limitApi;
