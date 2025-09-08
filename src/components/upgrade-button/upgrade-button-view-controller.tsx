"use client";

import { useUserHasAnnualPass } from "@/hooks/use-user-has-annual-pass";
import { createCheckoutSessionAction } from "@/server-actions/payments/create-checkout-session-action";
import { useRouter } from "next/navigation";
import { startTransition, useActionState } from "react";
import { UpgradeButtonViewControllerProps } from "./models/upgrade-button-view-controller-props";
import UpgradeButtonView from "./upgrade-button-view";

export default function UpgradeButtonViewController({
  pageName,
  upgradeText,
  alreadyUpgradedText,
  alreadyUpgradedUrl,
}: UpgradeButtonViewControllerProps) {
  const router = useRouter();
  const { hasAnnualPass, isLoading: isAnnualPassInfoLoading } =
    useUserHasAnnualPass();

  const buttonText = hasAnnualPass ? alreadyUpgradedText : upgradeText;

  const initialCheckoutSessionState = {
    message: "Checkout session creation initialized",
  };
  const [
    createCheckoutSessionResult,
    createCheckoutSession,
    createCheckoutSessionIsPending,
  ] = useActionState(
    handleCreateCheckoutSessionAction,
    initialCheckoutSessionState
  );

  console.log(createCheckoutSessionResult);

  return (
    <UpgradeButtonView
      isAnnualPassInfoLoading={isAnnualPassInfoLoading}
      isCheckoutSessionLoading={createCheckoutSessionIsPending}
      onButtonClicked={() => {
        if (hasAnnualPass) {
          router.push(alreadyUpgradedUrl);
        } else {
          startTransition(() => {
            createCheckoutSession({ pageName: pageName });
          });
        }
      }}
      buttonText={buttonText}
    />
  );
}

async function handleCreateCheckoutSessionAction(
  previousState: unknown,
  {
    pageName,
  }: {
    pageName: string;
  }
) {
  try {
    await createCheckoutSessionAction({
      priceId: process.env.NEXT_PUBLIC_ONE_YEAR_PASS_PRICE_ID!,
      successUrl: `/p/${pageName}`,
      cancelUrl: "/dashboard/manage-content",
    });
  } catch (error) {
    console.log(error);
  } finally {
    return { message: "Checkout session creation completed" };
  }
}
