import { EditPageError } from "./edit-page-error";

export type EditPageContentResult = {
  pageName: string;
  success: boolean;
  error?: EditPageError;
};
