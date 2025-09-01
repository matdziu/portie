import { PageContentFormSchema } from "@/components/manage-content/models/manage-content-view-props";
import { UploadFileResult } from "@/domain/storage/entities/upload-file-result";

export type EditPageContentInput = {
  pageContentFormSchema: PageContentFormSchema;
  pageImageUploadResult?: UploadFileResult;
  projectImagesUploadResults?: UploadFileResult[];
};
