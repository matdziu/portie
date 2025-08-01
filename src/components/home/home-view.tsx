"use client";

import { useTranslations } from "next-intl";
import { Button } from "../ui/button";

export default function HomeView() {
  const translations = useTranslations("Home");
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <span className="mb-2">{translations("title")}</span>
      <Button onClick={() => console.log("bardzoo bardzzooo")}>
        {translations("buttonTitle")}
      </Button>
    </div>
  );
}
