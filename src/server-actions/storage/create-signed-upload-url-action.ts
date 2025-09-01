"use server";

import { CreateSignedUploadUrlInput } from "@/domain/storage/entities/create-signed-upload-url-input";
import createSignedUploadUrlUseCase from "@/domain/storage/use-cases/create-signed-upload-url-use-case";

export default async function createSignedUploadUrlAction(
  input: CreateSignedUploadUrlInput
) {
  return await createSignedUploadUrlUseCase(input);
}
