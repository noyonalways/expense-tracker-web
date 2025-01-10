import { LoginFormData, RegisterFormData } from "@/schemas/auth";
import { baseApi } from "./baseApi";

interface AuthResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    accessToken: string;
  };
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<AuthResponse["data"], RegisterFormData>({
      query: (credentials) => ({
        url: "/auth/register",
        method: "POST",
        body: credentials,
      }),
      transformResponse: (response: AuthResponse) => {
        return response.data;
      },
    }),
    login: builder.mutation<AuthResponse["data"], LoginFormData>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      transformResponse: (response: AuthResponse) => {
        return response.data;
      },
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;
