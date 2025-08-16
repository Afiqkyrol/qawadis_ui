import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SigninClient from "@/app/lib/component/client/signinClient";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

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
