import getPageContentUseCase from "@/domain/manage-content/use-cases/get-page-content-use-case";
import { notFound } from "next/navigation";
import "server-only";
import { UserPageServerWrapperProps } from "./models/user-page-server-wrapper-props";
import UserPageViewController from "./user-page-view-controller";

export default async function UserPageServerWrapper({
  pageName,
}: UserPageServerWrapperProps) {
  const { userPageWithRelatedData } = await getPageContentUseCase({
    pageName: pageName,
  });
  if (!userPageWithRelatedData) notFound();
  return (
    <UserPageViewController pageWithRelatedData={userPageWithRelatedData} />
  );
}
