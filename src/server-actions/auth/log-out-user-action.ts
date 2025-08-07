"use server";

import { LogOutUserInput } from "@/domain/auth/entities/log-out-user-input";
import logOutUserUseCase from "@/domain/auth/use-cases/log-out-user-use-case";

export default async function logOutUserAction(input: LogOutUserInput) {
  return await logOutUserUseCase(input);
}
