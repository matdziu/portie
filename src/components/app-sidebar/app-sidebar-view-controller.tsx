"use client";

import logOutUserAction from "@/server-actions/auth/log-out-user-action";
import { ExternalLink, LogOut, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { startTransition, useActionState } from "react";
import { AppSidebarView } from "./app-sidebar-view";

export default function AppSidebarViewController() {
  const componentTranslations = useTranslations("AppSidebar");

  const initialState = { message: "" };
  const [
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    logoutResult,
    logout,
    logoutIsPending,
  ] = useActionState(handleLogOutAction, initialState);

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
      action: () => {
        startTransition(() => {
          logout();
        });
      },
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
      progress={logoutIsPending}
    />
  );
}

async function handleLogOutAction() {
  await logOutUserAction({ afterLogoutRedirect: "/" });
  return { message: "Log out completed" };
}
