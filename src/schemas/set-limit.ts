import { z } from "zod";

export const limitSchema = z.object({
  category: z.string().min(1, "Category is required"),
  amount: z
    .string()
    .transform((val) => parseFloat(val))
    .refine((val) => !isNaN(val) && val > 0, "Amount must be greater than 0"),
  period: z.string().min(1, "Period is required"),
});

export type LimitFormData = z.infer<typeof limitSchema>;
