"use server";

import { EditPageContentInput } from "@/domain/manage-content/entities/edit-page-content-input";
import editPageContentUseCase from "@/domain/manage-content/use-cases/edit-page-content-use-case";

export default async function editPageContentAction(
  input: EditPageContentInput
) {
  return await editPageContentUseCase(input);
}
