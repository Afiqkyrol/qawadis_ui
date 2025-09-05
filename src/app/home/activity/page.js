import ActivityClient from "@/app/home/activity/activity.client";

export function generateMetadata() {
  return {
    title: "Activity",
    description: "Activity page",
  };
}

export default async function ActivityPage() {
  return <ActivityClient />;
}
