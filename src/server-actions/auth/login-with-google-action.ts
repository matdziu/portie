"use server";

import loginWithGoogleUseCase from "@/domain/auth/use-cases/login-with-google-use-case";

export default async function loginWithGoogleAction() {
  return await loginWithGoogleUseCase();
}
