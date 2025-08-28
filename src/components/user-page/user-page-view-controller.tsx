"use client";

import { UserPageViewControllerProps } from "./models/user-page-view-controller-props";
import UserPageView from "./user-page-view";

export default function UserPageViewController({
  pageWithRelatedData,
}: UserPageViewControllerProps) {
  return <UserPageView pageWithRelatedData={pageWithRelatedData} />;
}
