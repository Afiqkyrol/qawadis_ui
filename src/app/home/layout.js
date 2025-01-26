import { getServerSession } from "next-auth";
import InnerLayout from "../lib/component/layout/innerLayout";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function DefaultLayout({ children }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/auth/signin");
  }
  return <InnerLayout session={session}>{children}</InnerLayout>;
}
