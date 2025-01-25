import SigninClient from "@/app/lib/component/client/signinClient";

export function generateMetadata() {
  return {
    title: "Sign In",
    description: "Sign in page",
  };
}

export default function SigninPage() {
  return <SigninClient />;
}
