import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Expense {
  id: string;
  amount: number;
  category: string;
  purpose: string;
  date: string;
}

interface ExpenseState {
  expenses: Expense[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ExpenseState = {
  expenses: [],
  isLoading: false,
  error: null,
};

const expenseSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    fetchExpensesStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchExpensesSuccess: (state, action: PayloadAction<Expense[]>) => {
      state.isLoading = false;
      state.expenses = action.payload;
      state.error = null;
    },
    fetchExpensesFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    addExpense: (state, action: PayloadAction<Expense>) => {
      state.expenses.push(action.payload);
    },
    deleteExpense: (state, action: PayloadAction<string>) => {
      state.expenses = state.expenses.filter(
        (expense) => expense.id !== action.payload
      );
    },
    clearExpenses: (state) => {
      state.expenses = [];
      state.error = null;
    },
  },
});

export const {
  fetchExpensesStart,
  fetchExpensesSuccess,
  fetchExpensesFailure,
  addExpense,
  deleteExpense,
  clearExpenses,
} = expenseSlice.actions;

export default expenseSlice.reducer;
