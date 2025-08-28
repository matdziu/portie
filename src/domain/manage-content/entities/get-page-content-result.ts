import { UserPageWithRelatedData } from "./user-page-with-related-data";

export type GetPageContentResult = {
  userPageWithRelatedData?: UserPageWithRelatedData;
  error: boolean;
};
