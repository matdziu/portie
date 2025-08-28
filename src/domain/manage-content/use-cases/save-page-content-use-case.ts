import requireLoggedInUser from "@/domain/auth/use-cases/require-logged-in-user";
import "server-only";
import { SavePageContentInput } from "../entities/save-page-content-input";
import { SavePageContentResult } from "../entities/save-page-content-result";

export default async function savePageContentUseCase({
  pageContentFormSchema,
}: SavePageContentInput): Promise<SavePageContentResult> {
  const authUser = await requireLoggedInUser();
  console.log(pageContentFormSchema);
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return {
    pageName: "/mypagename",
    success: true,
    error: false,
  };
}
