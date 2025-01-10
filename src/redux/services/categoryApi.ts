import { TCategory } from "@/types/category";
import { baseApi } from "./baseApi";

interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
  meta: {
    page: number;
    limit: number;
    totalPage: number;
    total: number;
    prevPage: string | null;
    nextPage: string | null;
  };
}

const CATEGORIES_URL = "/categories";

export interface Category {
  _id: string;
  name: string;
}

interface CategoryResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Category[];
}

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], void>({
      query: () => "/categories",
      transformResponse: (response: CategoryResponse) => response.data,
    }),
    getCategoryById: builder.query<ApiResponse<TCategory>, string>({
      query: (id) => ({
        url: `${CATEGORIES_URL}/${id}`,
        method: "GET",
      }),
    }),
    createCategory: builder.mutation<
      ApiResponse<TCategory>,
      Partial<TCategory>
    >({
      query: (body) => ({
        url: CATEGORIES_URL,
        method: "POST",
        body,
      }),
    }),
    updateCategory: builder.mutation<
      ApiResponse<TCategory>,
      { id: string; body: Partial<TCategory> }
    >({
      query: ({ id, body }) => ({
        url: `${CATEGORIES_URL}/${id}`,
        method: "PUT",
        body,
      }),
    }),
    deleteCategory: builder.mutation<void, string>({
      query: (id) => ({
        url: `${CATEGORIES_URL}/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
