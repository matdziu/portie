"use client";

import { Button } from "../ui/button";
import { Spinner } from "../ui/shadcn-io/spinner";
import { UpgradeButtonViewProps } from "./models/upgrade-button-view-props";

export default function UpgradeButtonView({
  isAnnualPassInfoLoading,
  isCheckoutSessionLoading,
  buttonText,
  onButtonClicked,
}: UpgradeButtonViewProps) {
  return (
    <Button
      variant="default"
      className="flex flex-row items-center justify-center text-center gap-1"
      onClick={onButtonClicked}
      disabled={isCheckoutSessionLoading || isAnnualPassInfoLoading}
    >
      {isCheckoutSessionLoading && <Spinner variant="circle" size={12} />}
      {buttonText}
    </Button>
  );
}
