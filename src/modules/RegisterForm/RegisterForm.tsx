"use client";

import { Form } from "@/components/ui/Form/Form";
import { loginSuccess } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useRegisterMutation } from "@/redux/services/authApi";
import { RegisterFormData, registerSchema } from "@/schemas/auth";
import { getCurrentUser, setUserToken } from "@/services/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import styles from "./RegisterForm.module.css";

const registerFields = [
  {
    name: "name",
    label: "Name",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
  },
];

interface DecodedToken {
  email: string;
  monthlyLimit?: number;
  exp: number;
}

export default function RegisterForm() {
  const dispatch = useAppDispatch();
  const [register, { isLoading }] = useRegisterMutation();
  const router = useRouter();

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const res = await register(data).unwrap();
      await setUserToken(res.accessToken);

      // Get user data from token and update Redux state
      const userData = await getCurrentUser();
      if (userData) {
        const decodedUser = userData as DecodedToken;
        dispatch(
          loginSuccess({
            email: decodedUser.email,
            monthlyLimit: decodedUser.monthlyLimit || null,
          })
        );
        toast.success("Registration successful");
        router.push("/set-limit");
      }
    } catch (error) {
      if (error && typeof error === "object" && "data" in error) {
        const err = error.data as { message?: string };
        toast.error(err.message || "Registration failed");
      } else {
        toast.error("Registration failed");
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h1 className={styles.title}>Register</h1>
        <Form<RegisterFormData>
          form={form}
          onSubmit={onSubmit}
          fields={registerFields}
          submitText={isLoading ? "Registering..." : "Register"}
          isSubmitting={isLoading}
        />
        <p className={styles.accountLink}>
          Already have an account?<Link href="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
}
