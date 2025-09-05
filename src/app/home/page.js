import HomeClient from "./home.client";

export function generateMetadata() {
  return {
    title: "Home",
    description: "Home page ",
  };
}

export default async function HomePage() {
  return <HomeClient />;
}
