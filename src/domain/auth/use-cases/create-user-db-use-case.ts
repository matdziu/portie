import prisma from "@/lib/prisma";
import "server-only";
import { CreateUserDbInput } from "../entities/create-user-db-input";
import { CreateUserDbResult } from "../entities/create-user-db-result";

export default async function createUserDbUseCase({
  userId,
  email,
}: CreateUserDbInput): Promise<CreateUserDbResult> {
  try {
    const existingUser = await prisma.userDb.findUnique({
      where: { id: userId },
    });
    if (!existingUser) {
      await prisma.userDb.create({
        data: {
          id: userId,
          email: email,
        },
      });
    }
    return {
      success: true,
      error: false,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: true,
    };
  }
}
