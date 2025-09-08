import requireLoggedInUser from "@/domain/auth/use-cases/require-logged-in-user";
import prisma from "@/lib/prisma";
import "server-only";
import { CurrentUserAnnualPassInfoResult } from "../entities/current-user-annual-pass-info-result";

export default async function currentUserAnnualPassInfoUseCase(): Promise<CurrentUserAnnualPassInfoResult> {
  try {
    const authUser = await requireLoggedInUser();
    const user = await prisma.userDb.findUnique({
      where: {
        id: authUser.id,
      },
      select: {
        annualPassExpiry: true,
        userPage: {
          select: { pageName: true },
        },
      },
    });

    if (!user || !user.annualPassExpiry) {
      return {
        hasAnnualPass: false,
      };
    }

    const hasAnnualPass = user.annualPassExpiry > new Date();

    return {
      hasAnnualPass: hasAnnualPass,
      annualPassExpirationDate: user.annualPassExpiry,
      publishedPageName: hasAnnualPass ? user.userPage?.pageName : undefined,
    };
  } catch (error) {
    console.log(error);
    return {
      hasAnnualPass: false,
    };
  }
}
