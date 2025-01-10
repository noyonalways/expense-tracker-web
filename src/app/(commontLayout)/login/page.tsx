import LoginForm from "@/modules/LoginForm/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login User",
  description: "Login to your account",
};

export default function LoginPage() {
  return (
    <>
      <LoginForm />
    </>
  );
}
