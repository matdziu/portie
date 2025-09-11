import { UpgradeButtonViewControllerProps } from "@/components/upgrade-button/models/upgrade-button-view-controller-props";

export interface UpgradeCardViewProps {
  children: React.ReactNode;
  priceTitle: string;
  crossedOverPrice: string;
  price: string;
  currency: string;
  priceInfo: string;
  upgradeButtonProps: UpgradeButtonViewControllerProps;
}
