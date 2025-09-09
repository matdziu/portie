"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { Button } from "../ui/button";
import UpgradeButtonViewController from "../upgrade-button/upgrade-button-view-controller";
import { HomeViewProps } from "./models/home-view-props";

export default function HomeView({ isLoggedIn }: HomeViewProps) {
  const screenTranslations = useTranslations("Home");
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen gap-2">
      <span className="mb-2">{screenTranslations("title")}</span>

      <UpgradeButtonViewController
        upgradeText={"Upgrade now"}
        alreadyUpgradedText={"Your 1-Year Pass is active!"}
        alreadyUpgradedUrl="/dashboard/manage-content"
      />

      <Button onClick={() => {throw Error("client error soifnsodinfo n")}}>
        {screenTranslations("buttonTitle")}
      </Button>

      {isLoggedIn ? (
        <Button asChild>
          <Link href="/dashboard/manage-content">
            {screenTranslations("goToDashboardButton")}
          </Link>
        </Button>
      ) : (
        <Button asChild>
          <Link href="/sign-in">{screenTranslations("loginButton")}</Link>
        </Button>
      )}
      <Link href="/privacy-policy">
        {screenTranslations("privacyPolicyLink")}
      </Link>
      <Link href="/terms-of-service">
        {screenTranslations("termsOfServiceLink")}
      </Link>
    </div>
  );
}
