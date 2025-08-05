"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { Button } from "../ui/button";

export default function HomeView() {
  const screenTranslations = useTranslations("Home");
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen gap-2">
      <span className="mb-2">{screenTranslations("title")}</span>

      <Button onClick={() => console.log("bardzoo bardzzooo")}>
        {screenTranslations("buttonTitle")}
      </Button>

      <Button asChild>
        <Link href="/sign-in">{screenTranslations("loginButton")}</Link>
      </Button>
    </div>
  );
}
