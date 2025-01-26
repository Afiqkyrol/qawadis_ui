import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import HomeClient from "../lib/component/client/homeClient";
import { authOptions } from "../api/auth/[...nextauth]/route";

export function generateMetadata() {
  return {
    title: "Home",
    description: "Home page ",
  };
}

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/auth/signin");
  }

  return <HomeClient />;
}
