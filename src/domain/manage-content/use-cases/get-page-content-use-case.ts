import prisma from "@/lib/prisma";
import "server-only";
import { GetPageContentInput } from "../entities/get-page-content-input";
import { GetPageContentResult } from "../entities/get-page-content-result";

export default async function getPageContentUseCase({
  pageName,
}: GetPageContentInput): Promise<GetPageContentResult> {
  try {
    const userPageWithRelatedData = await prisma.userPageDb.findUnique({
      where: {
        pageName: pageName,
      },
      include: {
        projects: {
          orderBy: {
            displayOrder: "asc",
          },
          include: {
            skills: true,
          },
        },
      },
    });
    return {
      userPageWithRelatedData: userPageWithRelatedData || undefined,
      error: false,
    };
  } catch (error) {
    console.log(error);
    return {
      userPageWithRelatedData: undefined,
      error: true,
    };
  }
}
