import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import SigninClient from "./signin.client";

export function generateMetadata() {
  return {
    title: "Sign In",
    description: "Sign in page",
  };
}

export default async function SigninPage() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/home");
  }
  return <SigninClient />;
}
