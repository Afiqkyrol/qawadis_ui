import DetailsActivityClient from "./details-activity.client";

export function generateMetadata() {
  return {
    title: "Activity Details",
    description: "Activity details page",
  };
}

export default async function DetailsActivityPage({ params }) {
  const { matchId } = await params;
  return <DetailsActivityClient matchId={matchId} />;
}
