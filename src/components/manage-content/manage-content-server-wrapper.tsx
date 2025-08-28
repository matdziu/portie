import getCurrentUserPageContentUseCase from "@/domain/manage-content/use-cases/get-current-user-page-content-use-case";
import "server-only";
import ManageContentViewController from "./manage-content-view-controller";

export default async function ManageContentServerWrapper() {
  const { userPageWithRelatedData } = await getCurrentUserPageContentUseCase();
  return (
    <ManageContentViewController
      pageWithRelatedData={userPageWithRelatedData}
    />
  );
}
