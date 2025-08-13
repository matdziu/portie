"use server";

import loginWithGithubUseCase from "@/domain/auth/use-cases/login-with-github-use-case";

export default async function loginWithGithubAction() {
  return await loginWithGithubUseCase();
}
