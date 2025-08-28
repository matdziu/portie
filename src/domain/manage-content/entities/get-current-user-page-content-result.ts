import { UserPageWithRelatedData } from "./user-page-with-related-data";

export type GetCurrentUserPageContentResult = {
  userPageWithRelatedData?: UserPageWithRelatedData;
  error: boolean;
};
