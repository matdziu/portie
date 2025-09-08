import { LucideIcon } from "lucide-react";

export interface AppSidebarViewProps {
  sidebarMenuItems: MenuItem[];
  accountRegularMenuItems: MenuItem[];
  accountDestructiveMenuItems: MenuItem[];
}

export type MenuItem = {
  id: string;
  title: string;
  icon?: LucideIcon;
  internalUrl?: string;
  externalUrl?: string;
  action?: () => void;
};
