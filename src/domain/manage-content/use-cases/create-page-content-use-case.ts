import requireLoggedInUser from "@/domain/auth/use-cases/require-logged-in-user";
import prisma from "@/lib/prisma";
import "server-only";
import { CreatePageContentInput } from "../entities/create-page-content-input";
import { CreatePageContentResult } from "../entities/create-page-content-result";

export default async function createPageContentUseCase({
  pageContentFormSchema,
}: CreatePageContentInput): Promise<CreatePageContentResult> {
  const authUser = await requireLoggedInUser();
  try {
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
      name: project.projectName,
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
