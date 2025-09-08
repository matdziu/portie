"use server";

import deleteAccountUseCase from "@/domain/auth/use-cases/delete-account-use-case";

export default async function deleteAccountAction() {
  return await deleteAccountUseCase();
}
