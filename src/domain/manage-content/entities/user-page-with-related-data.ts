import { Prisma } from "@prisma/client";

export type UserPageWithRelatedData = Prisma.UserPageDbGetPayload<{
  include: {
    projects: {
      include: {
        skills: true;
      };
    };
  };
}>;
