import { baseApi } from "./baseApi";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Category {
  _id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface Expense {
  _id: string;
  user: User;
  amount: number;
  category: Category;
  purpose: string;
  date: string;
  createdAt: string;
  updatedAt: string;
}

interface ExpenseResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Expense[];
  meta: {
    page: number;
    limit: number;
    totalPage: number;
    total: number;
    prevPage: number | null;
    nextPage: number | null;
  };
}

export interface CreateExpenseRequest {
  amount: number;
  category: string;
  purpose: string;
}

export const expenseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getExpenses: builder.query<Expense[], void>({
      query: () => "/expenses",
      transformResponse: (response: ExpenseResponse) => response.data,
      providesTags: [{ type: "Expense", id: "LIST" }],
    }),
    createExpense: builder.mutation<Expense, CreateExpenseRequest>({
      query: (expense) => ({
        url: "/expenses",
        method: "POST",
        body: expense,
      }),
      invalidatesTags: [{ type: "Expense", id: "LIST" }],
    }),
  }),
});

export const { useGetExpensesQuery, useCreateExpenseMutation } = expenseApi;
