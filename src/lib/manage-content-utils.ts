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
