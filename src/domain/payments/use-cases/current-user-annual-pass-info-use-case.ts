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
      },
    });

    if (!user || !user.annualPassExpiry) {
      return {
        hasAnnualPass: false,
      };
    }

    return {
      hasAnnualPass: user.annualPassExpiry > new Date(),
      annualPassExpirationDate: user.annualPassExpiry,
    };
  } catch (error) {
    console.log(error);
    return {
      hasAnnualPass: false,
    };
  }
}
