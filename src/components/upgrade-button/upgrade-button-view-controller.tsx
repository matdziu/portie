"use client";

import { useUserAnnualPassInfo } from "@/hooks/use-user-annual-pass-info";
import { createCheckoutSessionAction } from "@/server-actions/payments/create-checkout-session-action";
import { useRouter } from "next/navigation";
import { startTransition, useActionState } from "react";
import { UpgradeButtonViewControllerProps } from "./models/upgrade-button-view-controller-props";
import UpgradeButtonView from "./upgrade-button-view";

export default function UpgradeButtonViewController({
  upgradeText,
  alreadyUpgradedText,
  alreadyUpgradedUrl,
}: UpgradeButtonViewControllerProps) {
  const router = useRouter();
  const { userAnnualPassInfo, isLoading: isAnnualPassInfoLoading } =
    useUserAnnualPassInfo();

  const buttonText = userAnnualPassInfo.hasAnnualPass
    ? alreadyUpgradedText
    : upgradeText;

  const initialCheckoutSessionState = {
    message: "",
  };
  const [
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    createCheckoutSessionResult,
    createCheckoutSession,
    createCheckoutSessionIsPending,
  ] = useActionState(
    handleCreateCheckoutSessionAction,
    initialCheckoutSessionState
  );

  return (
    <UpgradeButtonView
      isAnnualPassInfoLoading={isAnnualPassInfoLoading}
      isCheckoutSessionLoading={createCheckoutSessionIsPending}
      onButtonClicked={() => {
        if (userAnnualPassInfo.hasAnnualPass) {
          router.push(alreadyUpgradedUrl);
        } else {
          startTransition(() => {
            createCheckoutSession();
          });
        }
      }}
      buttonText={buttonText}
    />
  );
}

async function handleCreateCheckoutSessionAction() {
  try {
    await createCheckoutSessionAction({
      priceId: process.env.NEXT_PUBLIC_ONE_YEAR_PASS_PRICE_ID!,
      successUrl: "/dashboard/manage-content?paymentSuccessful=true",
      cancelUrl: "/dashboard/manage-content",
    });
  } catch (error) {
    console.log(error);
  } finally {
    return { message: "Checkout session creation completed" };
  }
}
