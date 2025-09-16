import { getServerSession } from "next-auth";
import ForgotPasswordClient from "./forgotPassword.client";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export function generateMetadata() {
  return {
    title: "Forgot Password",
    description: "Reset your password",
  };
}

export default async function ForgotPasswordPage() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/home");
  }
  return <ForgotPasswordClient />;
}
