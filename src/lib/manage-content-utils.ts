import {
  PageContentFormSchema,
  PageContentFormSchemaWithoutFiles,
} from "@/components/manage-content/models/manage-content-view-props";

export function removeFilesFromPageContentForm(
  data: PageContentFormSchema
): PageContentFormSchemaWithoutFiles {
  const filteredData = { ...data };

  delete filteredData.pagePicture;

  if (filteredData.projects) {
    filteredData.projects = filteredData.projects.map((project) => {
      const newProject = { ...project };
      delete newProject.projectPicture;
      return newProject;
    });
  }

  return filteredData as PageContentFormSchemaWithoutFiles;
}

export function getImageExtensionFromMime(file: File): string | undefined {
  switch (file.type) {
    case "image/jpeg":
      return ".jpg";
    case "image/png":
      return ".png";
    case "image/gif":
      return ".gif";
    case "image/webp":
      return ".webp";
    case "image/svg+xml":
      return ".svg";
    default:
      console.error(`Unsupported MIME type: ${file.type}`);
      return undefined;
  }
}
