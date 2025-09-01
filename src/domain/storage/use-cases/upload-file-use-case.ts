import { getImageExtensionFromMime } from "@/lib/manage-content-utils";
import createSignedUploadUrlAction from "@/server-actions/storage/create-signed-upload-url-action";
import "client-only";
import { UploadFileInput } from "../entities/upload-file-input";
import { UploadFileResult } from "../entities/upload-file-result";
import uploadFileToSignedUrlUseCase from "./upload-file-to-signed-url-use-case";

export default async function uploadFileUseCase({
  file,
  owningEntityId,
  bucket,
}: UploadFileInput): Promise<UploadFileResult> {
  try {
    const { signedUrl } = await createSignedUploadUrlAction({
      bucket: bucket,
      fileExtension: getImageExtensionFromMime(file) ?? "",
    });

    const { imageUrl, error } = await uploadFileToSignedUrlUseCase({
      file: file,
      owningEntityId: owningEntityId,
      signedUrl: signedUrl,
    });

    console.log(error);
    return {
      owningEntityId: owningEntityId,
      imageUrl: imageUrl,
      error: error,
    };
  } catch (error) {
    console.log(error);
    return {
      owningEntityId: "",
      imageUrl: "",
      error: true,
    };
  }
}
