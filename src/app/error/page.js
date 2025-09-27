import ErrorClient from "./error.client";

export function generateMetadata() {
  return {
    title: "Error",
    description: "Error page",
  };
}

export default async function ErrorPage({ searchParams: { error } }) {
  console.log("ErrorPage", { error });

  return <ErrorClient errorMessage={error} />;
}
