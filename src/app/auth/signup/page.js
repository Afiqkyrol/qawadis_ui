import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import SignupClient from "./signup.client";

export function generateMetadata() {
  return {
    title: "Sign Up",
    description: "Sign up page",
  };
}

export default async function SignupPage() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/home");
  }
  return <SignupClient />;
}
