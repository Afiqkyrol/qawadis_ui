import NewActivityClientPage from "@/app/home/activity/new-activity/new-activity.client";

export function generateMetadata() {
  return {
    title: "New Activity",
    description: "New Activity page",
  };
}

export default async function NewActivityPage() {
  return <NewActivityClientPage />;
}
