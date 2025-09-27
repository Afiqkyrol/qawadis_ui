import EditActivityClient from "./edit-activity.client";

export function generateMetadata() {
  return {
    title: "Edit Activity",
    description: "Edit Activity page",
  };
}

export default async function EditActivityPage({ params }) {
  const { matchId } = await params;
  return <EditActivityClient matchId={matchId} />;
}
