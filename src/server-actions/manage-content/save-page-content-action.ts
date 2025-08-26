"use server";

import { SavePageContentInput } from "@/domain/manage-content/entities/save-page-content-input";
import savePageContentUseCase from "@/domain/manage-content/use-cases/save-page-content-use-case";

export default async function savePageContentAction(
  input: SavePageContentInput
) {
  return await savePageContentUseCase(input);
}
