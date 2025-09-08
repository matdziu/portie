"use client";

import { useUserAnnualPassInfo } from "@/hooks/use-user-annual-pass-info";
import { useDateLocale } from "@/lib/date-utils/client";
import deleteAccountAction from "@/server-actions/auth/delete-account-action";
import logOutUserAction from "@/server-actions/auth/log-out-user-action";
import { format } from "date-fns";
import { ExternalLink, LogOut, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { startTransition, useActionState, useEffect } from "react";
import { AppSidebarView } from "./app-sidebar-view";

export default function AppSidebarViewController() {
  const componentTranslations = useTranslations("AppSidebar");

  const dateLocale = useDateLocale();

  const router = useRouter();

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

  const initialLogoutState = { message: "" };
  const [
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    logoutResult,
    logout,
    logoutIsPending,
  ] = useActionState(handleLogOutAction, initialLogoutState);

  const initialDeleteAccountState = { success: false, error: false };
  const [deleteAccountResult, deleteAccount, deleteAccountIsPending] =
    useActionState(handleDeleteAccountAction, initialDeleteAccountState);

  useEffect(() => {
    if (deleteAccountResult.success) {
      router.refresh();
    }
  }, [deleteAccountResult, router]);

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
      action: () => {
        startTransition(() => {
          deleteAccount();
        });
      },
    },
  ];

  return (
    <AppSidebarView
      sidebarMenuItems={sidebarMenuItems}
      accountRegularMenuItems={accountRegularMenuItems}
      accountDestructiveMenuItems={accountDestructiveMenuItems}
      formattedAnnualPassExpirationDate={formattedAnnualPassExpirationDate}
      progress={logoutIsPending || deleteAccountIsPending}
    />
  );
}

async function handleLogOutAction() {
  await logOutUserAction({ afterLogoutRedirect: "/" });
  return { message: "Log out completed" };
}

async function handleDeleteAccountAction() {
  return await deleteAccountAction();
}
