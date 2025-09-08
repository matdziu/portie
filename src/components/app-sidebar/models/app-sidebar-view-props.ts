import { LucideIcon } from "lucide-react";

export interface AppSidebarViewProps {
  sidebarMenuItems: MenuItem[];
  accountRegularMenuItems: MenuItem[];
  accountDestructiveMenuItems: MenuItem[];
  formattedAnnualPassExpirationDate?: string;
  progress: boolean;
}

export type MenuItem = {
  id: string;
  title: string;
  icon?: LucideIcon;
  internalUrl?: string;
  externalUrl?: string;
  action?: () => void;
};
