import requireLoggedInUser from "@/domain/auth/use-cases/require-logged-in-user";
import prisma from "@/lib/prisma";
import "server-only";
import { CreatePageContentInput } from "../entities/create-page-content-input";
import { CreatePageContentResult } from "../entities/create-page-content-result";
import { CreatePageError } from "../entities/create-page-error";

export default async function createPageContentUseCase({
  // this form schema has no files to keep payload under 1 MB
  pageContentFormSchema,

  pageImageUploadResult,
  projectImagesUploadResults,
}: CreatePageContentInput): Promise<CreatePageContentResult> {
  try {
    const authUser = await requireLoggedInUser();
    const existingPage = await prisma.userPageDb.findUnique({
      where: {
        pageName: pageContentFormSchema.pageName,
      },
    });

    if (existingPage) {
      return {
        pageName: "",
        success: false,
        error: CreatePageError.PageNameAlreadyExists,
      };
    }

    const projectsData = pageContentFormSchema.projects?.map((project) => ({
      formId: project.formId,
      name: project.projectName,
      pictureUrl: projectImagesUploadResults?.find(
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

    await prisma.userPageDb.create({
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
        user: {
          connect: { id: authUser.id },
        },
        projects: {
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
      error: CreatePageError.Generic,
    };
  }
}
