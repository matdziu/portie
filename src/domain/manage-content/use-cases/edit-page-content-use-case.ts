import { ProjectSchema } from "@/components/manage-content/models/manage-content-view-props";
import requireLoggedInUser from "@/domain/auth/use-cases/require-logged-in-user";
import currentUserAnnualPassInfoUseCase from "@/domain/payments/use-cases/current-user-annual-pass-info-use-case";
import deleteFilesUseCase from "@/domain/storage/use-cases/delete-files-use-case";
import prisma from "@/lib/prisma";
import { extractPath } from "@/lib/storage-utils";
import "server-only";
import { EditPageContentInput } from "../entities/edit-page-content-input";
import { EditPageContentResult } from "../entities/edit-page-content-result";
import { EditPageError } from "../entities/edit-page-error";

export default async function editPageContentUseCase({
  // this form schema has no files to keep payload under 1 MB
  pageContentFormSchema,

  pageImageUploadResult,
  projectImagesUploadResults,
}: EditPageContentInput): Promise<EditPageContentResult> {
  try {
    const authUser = await requireLoggedInUser();
    const pageWithGivenName = await prisma.userPageDb.findUnique({
      where: {
        pageName: pageContentFormSchema.pageName,
      },
    });

    const userPage = await prisma.userPageDb.findUnique({
      where: {
        userId: authUser.id,
      },
      include: {
        projects: true,
      },
    });

    if (pageWithGivenName && pageWithGivenName.userId !== authUser.id) {
      return {
        pageName: "",
        success: false,
        error: EditPageError.PageNameAlreadyExists,
      };
    }

    if (!userPage) {
      return {
        pageName: "",
        success: false,
        error: EditPageError.PageDoesNotExists,
      };
    }

    const pagePictureUrlsToDelete: string[] = [];
    const projectPictureUrlsToDelete: string[] = [];

    function updatedProjectImageUrl(
      projectSchema: ProjectSchema
    ): string | undefined {
      let projectImageUrl: string | undefined;

      if (typeof projectSchema.projectPicture === "string") {
        projectImageUrl = projectSchema.projectPicture;
      } else {
        const oldProjectImage = userPage?.projects.find(
          (oldProject) => oldProject.formId === projectSchema.formId
        )?.pictureUrl;
        projectImageUrl = projectImagesUploadResults?.find(
          (singleProjectImageUploadResult) =>
            singleProjectImageUploadResult.owningEntityId ===
            projectSchema.formId
        )?.imageUrl;

        if (projectImageUrl && oldProjectImage) {
          projectPictureUrlsToDelete.push(oldProjectImage);
        }
      }

      return projectImageUrl;
    }

    for (const project of userPage.projects) {
      const correspondingProjectSchema = pageContentFormSchema.projects?.find(
        (projectSchema) => projectSchema.formId === project.formId
      );

      if (!correspondingProjectSchema && project.pictureUrl) {
        projectPictureUrlsToDelete.push(project.pictureUrl);
      }
    }

    const projectsData = pageContentFormSchema.projects?.map(
      (projectSchema) => ({
        formId: projectSchema.formId,
        name: projectSchema.projectName,
        pictureUrl: updatedProjectImageUrl(projectSchema),
        description: projectSchema.projectDescription || undefined,
        label: projectSchema.label || undefined,
        topLink: projectSchema.topLink || undefined,
        bottomLink: projectSchema.bottomLink || undefined,
        displayOrder: projectSchema.displayOrder,
        skills: {
          createMany: {
            data:
              projectSchema.skills?.map((skill) => ({
                name: skill.skillName,
                value: skill.skillValue,
              })) || [],
          },
        },
      })
    );

    function updatedPageImageUrl(): string | undefined {
      const newPageImageUrl = pageImageUploadResult?.imageUrl;
      const oldPageImageUrl = userPage?.pictureUrl ?? "";
      if (newPageImageUrl) {
        pagePictureUrlsToDelete.push(oldPageImageUrl);
        return newPageImageUrl;
      } else {
        return undefined;
      }
    }

    await prisma.userPageDb.update({
      where: {
        id: userPage.id,
      },
      data: {
        pageName: pageContentFormSchema.pageName,
        pictureUrl: updatedPageImageUrl(),
        fullName: pageContentFormSchema.fullName,
        location: pageContentFormSchema.location,
        position: pageContentFormSchema.position,
        description: pageContentFormSchema.description || undefined,
        personalWebsiteLink:
          pageContentFormSchema.personalWebsiteLink || undefined,
        githubLink: pageContentFormSchema.githubLink || undefined,
        linkedInLink: pageContentFormSchema.linkedInLink || undefined,
        mediumLink: pageContentFormSchema.mediumLink || undefined,
        twitterLink: pageContentFormSchema.twitterLink || undefined,
        youtubeLink: pageContentFormSchema.youtubeLink || undefined,
        instagramLink: pageContentFormSchema.instagramLink || undefined,
        projects: {
          deleteMany: {},
          create: projectsData || [],
        },
      },
    });

    const pageFilePathsToDelete = pagePictureUrlsToDelete
      .map((url) => extractPath(url, "page-pictures"))
      .filter(Boolean) as string[];
    const projectFilePathsToDelete = projectPictureUrlsToDelete
      .map((url) => extractPath(url, "project-pictures"))
      .filter(Boolean) as string[];

    if (pageFilePathsToDelete.length > 0) {
      const { error } = await deleteFilesUseCase({
        bucketName: "page-pictures",
        filePaths: pageFilePathsToDelete,
      });

      if (error) {
        return {
          pageName: "",
          success: false,
          error: EditPageError.Generic,
        };
      }
    }

    if (projectFilePathsToDelete.length > 0) {
      const { error } = await deleteFilesUseCase({
        bucketName: "project-pictures",
        filePaths: projectFilePathsToDelete,
      });

      if (error) {
        return {
          pageName: "",
          success: false,
          error: EditPageError.Generic,
        };
      }
    }

    const { hasAnnualPass } = await currentUserAnnualPassInfoUseCase();

    return {
      pageName: pageContentFormSchema.pageName,
      success: hasAnnualPass,
      error: hasAnnualPass ? undefined : EditPageError.NoAnnualPass,
    };
  } catch (error) {
    console.log(error);
    return {
      pageName: "",
      success: false,
      error: EditPageError.Generic,
    };
  }
}
