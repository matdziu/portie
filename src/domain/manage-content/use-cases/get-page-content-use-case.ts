import requireLoggedInUser from "@/domain/auth/use-cases/require-logged-in-user";
import prisma from "@/lib/prisma";
import "server-only";
import { GetPageContentResult } from "../entities/get-page-content-result";

export default async function getPageContentUseCase(): Promise<GetPageContentResult> {
  try {
    const authUser = await requireLoggedInUser();
    const userPageWithRelatedData = await prisma.userPageDb.findUnique({
      where: {
        userId: authUser.id,
      },
      include: {
        projects: {
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
