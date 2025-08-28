"use server";

import { CreatePageContentInput } from "@/domain/manage-content/entities/create-page-content-input";
import createPageContentUseCase from "@/domain/manage-content/use-cases/create-page-content-use-case";

export default async function createPageContentAction(
  input: CreatePageContentInput
) {
  return await createPageContentUseCase(input);
}
