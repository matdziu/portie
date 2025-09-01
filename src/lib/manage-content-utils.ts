import { PageContentFormSchema } from "@/components/manage-content/models/manage-content-view-props";

export function removeFilesFromPageContentForm(
  data: PageContentFormSchema
): PageContentFormSchema {
  const filteredData = { ...data };

  if (filteredData.pagePicture instanceof File) {
    filteredData.pagePicture = undefined;
  }

  if (filteredData.projects) {
    filteredData.projects = filteredData.projects.map((project) => {
      const newProject = { ...project };
      if (newProject.projectPicture instanceof File) {
        newProject.projectPicture = undefined;
      }
      return newProject;
    });
  }

  return filteredData;
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
