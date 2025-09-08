"use client";

import { useUserAnnualPassInfo } from "@/hooks/use-user-annual-pass-info";
import { useDateLocale } from "@/lib/date-utils/client";
import logOutUserAction from "@/server-actions/auth/log-out-user-action";
import { format } from "date-fns";
import { ExternalLink, LogOut, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { startTransition, useActionState } from "react";
import { AppSidebarView } from "./app-sidebar-view";

export default function AppSidebarViewController() {
  const componentTranslations = useTranslations("AppSidebar");

  const dateLocale = useDateLocale();

  const { userAnnualPassInfo } = useUserAnnualPassInfo();

  let formattedAnnualPassExpirationDate: string | undefined = undefined;

  if (
    userAnnualPassInfo.hasAnnualPass &&
    userAnnualPassInfo.annualPassExpirationDate
  ) {
    formattedAnnualPassExpirationDate = format(
      userAnnualPassInfo.annualPassExpirationDate,
      "do MMMM yyyy",
      {
        locale: dateLocale,
      }
    );
  }

  if (
    userAnnualPassInfo.hasAnnualPass &&
    userAnnualPassInfo.publishedPageName
  ) {
    // external url must be eqyals to published page name
  }

  const initialState = { message: "" };
  const [
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    logoutResult,
    logout,
    logoutIsPending,
  ] = useActionState(handleLogOutAction, initialState);

  const sidebarMenuItems = [
    ...(userAnnualPassInfo.hasAnnualPass && userAnnualPassInfo.publishedPageName
      ? [
          {
            id: "your-page-item",
            title: componentTranslations("yourPageItem"),
            icon: ExternalLink,
            externalUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/p/${userAnnualPassInfo.publishedPageName}`,
          },
        ]
      : []),
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
      formattedAnnualPassExpirationDate={formattedAnnualPassExpirationDate}
      progress={logoutIsPending}
    />
  );
}

async function handleLogOutAction() {
  await logOutUserAction({ afterLogoutRedirect: "/" });
  return { message: "Log out completed" };
}
