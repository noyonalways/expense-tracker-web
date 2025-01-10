import RegisterForm from "@/modules/RegisterForm/RegisterForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register User",
  description: "Register",
};

const RegisterPage = () => {
  return (
    <>
      <RegisterForm />
    </>
  );
};

export default RegisterPage;
