"use server";

import getUserSessionUseCase from "@/domain/auth/use-cases/get-user-session-use-case";

export default async function getUserSessionAction() {
  return await getUserSessionUseCase();
}
