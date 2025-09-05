import requireLoggedInUser from "@/domain/auth/use-cases/require-logged-in-user";
import prisma from "@/lib/prisma";
import "server-only";
import { CurrentUserHasAnnualPassResult } from "../entities/current-user-has-annual-pass-result";

export default async function currentUserHasAnnualPassUseCase(): Promise<CurrentUserHasAnnualPassResult> {
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
    };
  } catch (error) {
    console.log(error);
    return {
      hasAnnualPass: false,
    };
  }
}
