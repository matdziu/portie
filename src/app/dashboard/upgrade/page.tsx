import UpgradeButtonViewController from "@/components/upgrade-button/upgrade-button-view-controller";
import { getTranslations } from "next-intl/server";

export default async function UpgradePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const screenTranslations = await getTranslations("Upgrade");
  const pageNameSearchParam = (await searchParams).pageName;
  let pageName = "";
  if (typeof pageNameSearchParam === "string") {
    pageName = pageNameSearchParam;
  }
  return (
    <div>
      <UpgradeButtonViewController
        pageName={pageName}
        upgradeText={screenTranslations("upgradeText")}
        alreadyUpgradedText={screenTranslations("alreadyUpgradedText")}
        alreadyUpgradedUrl="/dashboard/manage-content"
      />
    </div>
  );
}
