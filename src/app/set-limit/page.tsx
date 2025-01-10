"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/Input/Input";
import styles from "./page.module.css";

const limitSchema = z.object({
  monthlyLimit: z
    .string()
    .min(1, "Monthly limit is required")
    .transform((val) => parseFloat(val))
    .refine((val) => !isNaN(val) && val > 0, "Must be a positive number"),
});

type LimitFormData = z.infer<typeof limitSchema>;

export default function SetLimitPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LimitFormData>({
    resolver: zodResolver(limitSchema),
  });

  const onSubmit = async (data: LimitFormData) => {
    // TODO: Implement limit setting logic
    console.log("Monthly limit:", data);
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h1>Set Monthly Limit</h1>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <Input
            label="Monthly Limit ($)"
            type="number"
            step="0.01"
            min="0"
            {...register("monthlyLimit")}
            error={errors.monthlyLimit?.message}
          />
          <button type="submit" className={styles.submitButton}>
            Set Limit
          </button>
        </form>
      </div>
    </div>
  );
}
