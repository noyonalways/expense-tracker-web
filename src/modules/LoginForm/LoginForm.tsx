"use client";

import { Form } from "@/components/ui/Form/Form";
import { loginSuccess } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useLoginMutation } from "@/redux/services/authApi";
import { LoginFormData, loginSchema } from "@/schemas/auth";
import { getCurrentUser, setUserToken } from "@/services/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import styles from "./LoginForm.module.css";

const loginFields = [
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

export default function LoginForm() {
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/expenses";

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const res = await login(data).unwrap();
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
        toast.success("Login successful");
        router.push(redirectPath);
      }
    } catch (error) {
      if (error && typeof error === "object" && "data" in error) {
        const err = error.data as { message?: string };
        toast.error(err.message || "Login failed");
      } else {
        toast.error("Login failed");
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h2>Login</h2>
        <Form<LoginFormData>
          form={form}
          onSubmit={onSubmit}
          fields={loginFields}
          submitText={isLoading ? "Logging in..." : "Login"}
          isSubmitting={isLoading}
        />
        <p className={styles.accountLink}>
          Don&apos;t have an account?<Link href="/register">Create one</Link>
        </p>
      </div>
    </div>
  );
}
