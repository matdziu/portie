"use client";

import { useIsLoggedIn } from "@/hooks/use-is-logged-in";
import HomeView from "./home-view";

export default function HomeViewController() {
  const { isLoggedIn } = useIsLoggedIn();
  return <HomeView isLoggedIn={isLoggedIn} />;
}
