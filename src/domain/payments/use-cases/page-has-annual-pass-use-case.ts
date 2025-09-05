import prisma from "@/lib/prisma";
import "server-only";
import { PageHasAnnualPassInput } from "../entities/page-has-annual-pass-input";
import { PageHasAnnualPassResult } from "../entities/page-has-annual-pass-result";

export default async function pageHasAnnualPassUseCase({
  pageName,
}: PageHasAnnualPassInput): Promise<PageHasAnnualPassResult> {
  try {
    const userPage = await prisma.userPageDb.findUnique({
      where: {
        pageName: pageName,
      },
      select: {
        user: {
          select: {
            annualPassExpiry: true,
          },
        },
      },
    });

    if (!userPage || !userPage.user || !userPage.user.annualPassExpiry) {
      return {
        hasAnnualPass: false,
      };
    }

    return {
      hasAnnualPass: userPage.user.annualPassExpiry > new Date(),
    };
  } catch (error) {
    console.log(error);
    return {
      hasAnnualPass: false,
    };
  }
}
