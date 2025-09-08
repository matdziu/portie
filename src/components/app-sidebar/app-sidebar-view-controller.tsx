"use client";

import { ExternalLink, LogOut, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { AppSidebarView } from "./app-sidebar-view";

export default function AppSidebarViewController() {
  const componentTranslations = useTranslations("AppSidebar");

  const sidebarMenuItems = [
    {
      id: "your-page-item",
      title: componentTranslations("yourPageItem"),
      icon: ExternalLink,
      externalUrl: "oinionion",
    },
  ];

  const accountRegularMenuItems = [
    {
      id: "log-out-item",
      title: componentTranslations("logoutItem"),
      icon: LogOut,
      action: () => console.log("sad"),
    },
  ];

  const accountDestructiveMenuItems = [
    {
      id: "delete-account-item",
      title: componentTranslations("deleteAccountItem"),
      icon: Trash2,
      action: () => console.log("sad"),
    },
  ];

  return (
    <AppSidebarView
      sidebarMenuItems={sidebarMenuItems}
      accountRegularMenuItems={accountRegularMenuItems}
      accountDestructiveMenuItems={accountDestructiveMenuItems}
      formattedAnnualPassExpirationDate="1st June 2025"
    />
  );
}
