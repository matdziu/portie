import { PageContentFormSchemaWithoutFiles } from "@/components/manage-content/models/manage-content-view-props";
import { UploadFileResult } from "@/domain/storage/entities/upload-file-result";

export type EditPageContentInput = {
  pageContentFormSchema: PageContentFormSchemaWithoutFiles;
  pageImageUploadResult?: UploadFileResult;
  projectImagesUploadResults?: UploadFileResult[];
};
