import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SignupClient from "@/app/lib/component/client/signup/signup.client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

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
