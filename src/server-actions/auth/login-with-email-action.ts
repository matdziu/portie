"use server";

import { LoginWithEmailInput } from "@/domain/auth/entities/login-with-email-input";
import loginWithEmailUseCase from "@/domain/auth/use-cases/login-with-email-use-case";

export default async function loginWithEmailAction(input: LoginWithEmailInput) {
  return await loginWithEmailUseCase(input);
}
