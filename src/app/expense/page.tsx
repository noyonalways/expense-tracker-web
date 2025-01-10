"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/Input/Input";
import { Select } from "@/components/ui/Select/Select";
import styles from "./page.module.css";

const categories = [
  { value: "Groceries", label: "Groceries" },
  { value: "Transportation", label: "Transportation" },
  { value: "Healthcare", label: "Healthcare" },
  { value: "Utility", label: "Utility" },
  { value: "Charity", label: "Charity" },
  { value: "Miscellaneous", label: "Miscellaneous" },
];

const expenseSchema = z.object({
  amount: z
    .string()
    .min(1, "Amount is required")
    .transform((val) => parseFloat(val))
    .refine((val) => !isNaN(val) && val > 0, "Must be a positive number"),
  category: z.string().min(1, "Category is required"),
  purpose: z.string().min(3, "Purpose must be at least 3 characters"),
});

type ExpenseFormData = z.infer<typeof expenseSchema>;

export default function ExpensePage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ExpenseFormData>({
    resolver: zodResolver(expenseSchema),
  });

  const onSubmit = async (data: ExpenseFormData) => {
    // TODO: Implement expense submission logic
    console.log("Expense data:", data);
    reset();
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h1>Add New Expense</h1>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <Input
            label="Amount ($)"
            type="number"
            step="0.01"
            min="0"
            {...register("amount")}
            error={errors.amount?.message}
          />
          <Select
            label="Category"
            options={categories}
            {...register("category")}
            error={errors.category?.message}
          />
          <Input
            label="Purpose"
            type="text"
            {...register("purpose")}
            error={errors.purpose?.message}
            placeholder="e.g., Groceries for the week"
          />
          <button type="submit" className={styles.submitButton}>
            Add Expense
          </button>
        </form>
      </div>
    </div>
  );
}
