import { CreatePageError } from "./create-page-error";

export type CreatePageContentResult = {
  pageName: string;
  success: boolean;
  error?: CreatePageError;
};
