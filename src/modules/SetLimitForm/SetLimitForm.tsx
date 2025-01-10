"use client";

import { Form } from "@/components/ui/Form/Form";
import { Spinner } from "@/components/ui/Spinner/Spinner";
import { useGetCategoriesQuery } from "@/redux/services/categoryApi";
import { useSetLimitMutation } from "@/redux/services/limitApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import styles from "./SetLimitForm.module.css";

const limitSchema = z.object({
  category: z.string().min(1, "Category is required"),
  period: z.string().min(1, "Period is required"),
  amount: z.string().min(1, "Amount is required"),
});

type LimitFormData = z.infer<typeof limitSchema>;

interface ApiError {
  data: {
    message: string;
  };
  status: number;
}

export function SetLimitForm() {
  const { data: categories = [], isLoading: categoriesLoading } =
    useGetCategoriesQuery();
  const [setLimit, { isLoading: isSubmitting }] = useSetLimitMutation();

  const form = useForm<LimitFormData>({
    resolver: zodResolver(limitSchema),
    defaultValues: {
      category: "",
      period: "",
      amount: "",
    },
  });

  const isLoading = categoriesLoading;

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <Spinner />
      </div>
    );
  }

  const limitFields = [
    {
      name: "category",
      label: "Category",
      type: "select",
      options: categories.map((cat) => ({
        label: cat.name,
        value: cat._id,
      })),
      placeholder: "Select category",
    },
    {
      name: "period",
      label: "Period",
      type: "select",
      options: [{ label: "Monthly", value: "monthly" }],
      placeholder: "Select period",
    },
    {
      name: "amount",
      label: "Amount",
      type: "number",
      placeholder: "Enter amount",
    },
  ];

  const onSubmit = async (data: LimitFormData) => {
    try {
      await setLimit({
        category: data.category,
        period: data.period,
        amount: parseFloat(data.amount),
      }).unwrap();

      toast.success("Limit set successfully");
      form.reset();
    } catch (error) {
      const apiError = error as ApiError;
      toast.error(apiError.data?.message || "Failed to set limit");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formSection}>
        <h2>Set Category Limit</h2>
        <Form<LimitFormData>
          form={form}
          onSubmit={onSubmit}
          fields={limitFields}
          submitText={isSubmitting ? "Setting Limit..." : "Set Limit"}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
}
