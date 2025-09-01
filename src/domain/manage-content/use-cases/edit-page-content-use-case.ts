import requireLoggedInUser from "@/domain/auth/use-cases/require-logged-in-user";
import prisma from "@/lib/prisma";
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

    const projectsData = pageContentFormSchema.projects?.map((project) => ({
      formId: project.formId,
      name: project.projectName,
      pictureUrl:
        typeof project.projectPicture === "string"
          ? project.projectPicture
          : projectImagesUploadResults?.find(
              (singleProjectImageUploadResult) =>
                singleProjectImageUploadResult.owningEntityId === project.formId
            )?.imageUrl,
      description: project.projectDescription || undefined,
      label: project.label || undefined,
      topLink: project.topLink || undefined,
      bottomLink: project.bottomLink || undefined,
      displayOrder: project.displayOrder,
      skills: {
        createMany: {
          data:
            project.skills?.map((skill) => ({
              name: skill.skillName,
              value: skill.skillValue,
            })) || [],
        },
      },
    }));

    await prisma.userPageDb.update({
      where: {
        id: userPage.id,
      },
      data: {
        pageName: pageContentFormSchema.pageName,
        pictureUrl: pageImageUploadResult?.imageUrl,
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

    return {
      pageName: pageContentFormSchema.pageName,
      success: true,
      error: undefined,
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
