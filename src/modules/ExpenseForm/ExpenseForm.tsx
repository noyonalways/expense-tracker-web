"use client";

import { Form } from "@/components/ui/Form/Form";
import { useGetCategoriesQuery } from "@/redux/services/categoryApi";
import { useCreateExpenseMutation } from "@/redux/services/expenseApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const expenseSchema = z.object({
  amount: z
    .string()
    .min(1, "Amount is required")
    .transform((val) => parseFloat(val))
    .refine((val) => !isNaN(val) && val > 0, "Amount must be greater than 0"),
  category: z.string().min(1, "Category is required"),
  purpose: z.string().min(1, "Purpose is required"),
});

type ExpenseFormData = {
  amount: string;
  category: string;
  purpose: string;
};

type ExpenseSubmitData = {
  amount: number;
  category: string;
  purpose: string;
};

export function ExpenseForm() {
  const [createExpense, { isLoading }] = useCreateExpenseMutation();
  const { data: categories = [] } = useGetCategoriesQuery();

  const categoryOptions = categories.map((category) => ({
    label: category.name,
    value: category._id,
  }));

  const expenseFields = [
    {
      name: "amount",
      label: "Amount",
      type: "number",
      placeholder: "Enter amount",
    },
    {
      name: "category",
      label: "Category",
      type: "select",
      placeholder: "Select category",
      options: categoryOptions,
    },
    {
      name: "purpose",
      label: "Purpose",
      type: "text",
      placeholder: "Enter purpose",
    },
  ];

  const form = useForm<ExpenseFormData>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      amount: "",
      category: "",
      purpose: "",
    },
  });

  const onSubmit = async (data: ExpenseFormData) => {
    try {
      const submitData: ExpenseSubmitData = {
        amount: parseFloat(data.amount),
        category: data.category,
        purpose: data.purpose,
      };
      await createExpense(submitData).unwrap();
      form.reset();
      toast.success("Expense added successfully");
    } catch {
      toast.error("Failed to add expense");
    }
  };

  return (
    <Form<ExpenseFormData>
      form={form}
      onSubmit={onSubmit}
      fields={expenseFields}
      submitText={isLoading ? "Adding Expense..." : "Add Expense"}
      isSubmitting={isLoading}
    />
  );
}
