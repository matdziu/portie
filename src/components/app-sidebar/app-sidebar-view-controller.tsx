"use client";

import { AppSidebarView } from "./app-sidebar-view";

export default function AppSidebarViewController() {
  return (
    <AppSidebarView
      sidebarMenuItems={[]}
      accountRegularMenuItems={[]}
      accountDestructiveMenuItems={[]}
    />
  );
}
