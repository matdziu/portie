import UpgradeButtonViewController from "@/components/upgrade-button/upgrade-button-view-controller";
import { useTranslations } from "next-intl";

export default function UpgradePage() {
  const screenTranslations = useTranslations("Upgrade");
  return (
    <div>
      <UpgradeButtonViewController
        upgradeText={screenTranslations("upgradeText")}
        alreadyUpgradedText={screenTranslations("alreadyUpgradedText")}
        alreadyUpgradedUrl="/dashboard/manage-content"
      />
    </div>
  );
}
