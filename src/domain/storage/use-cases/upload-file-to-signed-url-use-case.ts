import "client-only";
import { UploadFileToSignedUrlInput } from "../entities/upload-file-to-signed-url-input";
import { UploadFileToSignedUrlResult } from "../entities/upload-file-to-signed-url-result";

export default async function uploadFileToSignedUrlUseCase({
  file,
  signedUrl,
}: UploadFileToSignedUrlInput): Promise<UploadFileToSignedUrlResult> {
  try {
    const response = await fetch(signedUrl, {
      method: "PUT",
      body: file,
      headers: {
        "Content-Type": file.type,
      },
    });

    if (response.ok) {
      const uploadResult = await response.json();
      return {
        imageUrl: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${uploadResult["Key"]}`,
        error: false,
      };
    } else {
      return {
        imageUrl: "",
        error: true,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      imageUrl: "",
      error: true,
    };
  }
}
