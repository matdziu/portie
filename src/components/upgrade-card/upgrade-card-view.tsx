"use client";

import UpgradeButtonViewController from "../upgrade-button/upgrade-button-view-controller";
import { UpgradeCardViewProps } from "./models/upgrade-card-view-props";

export default function UpgradeCardView({
  children,
  priceTitle,
  crossedOverPrice,
  price,
  currency,
  priceInfo,
  upgradeButtonProps,
}: UpgradeCardViewProps) {
  return (
    <div className="bg-card flex flex-col w-full md:w-md items-center justify-center rounded-2xl p-8 shadow-lg gap-7">
      {children}
      <div className="bg-card flex flex-col items-center justify-center rounded-2xl p-8 w-full border-2 border-primary">
        <div className="text-center">
          <h2 className="text-lg font-bold">{priceTitle}</h2>
        </div>

        <div className="flex items-center justify-center mt-4">
          <div>
            <span className="text-muted-foreground text-xl font-medium line-through mr-2">
              {crossedOverPrice}
            </span>
            <span className="text-5xl font-extrabold">{price}</span>
            <span className="text-muted-foreground text-xl font-medium ml-2">
              {currency}
            </span>
          </div>
        </div>
        <div className="text-center mt-2">
          <p className="text-muted-foreground text-sm">{priceInfo}</p>
        </div>
        <div className="mt-5">
          <UpgradeButtonViewController {...upgradeButtonProps} />
        </div>
      </div>
    </div>
  );
}
