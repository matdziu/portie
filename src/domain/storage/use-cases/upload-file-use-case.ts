import "client-only";
import { error } from "console";
import { UploadFileInput } from "../entities/upload-file-input";
import { UploadFileResult } from "../entities/upload-file-result";

export default async function uploadFileUseCase({
  file,
  signedUrl,
}: UploadFileInput): Promise<UploadFileResult> {
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
      console.log(uploadResult);
      return {
        name: "NAME SUKCES",
        imageUrl: "SUKCES",
        error: false,
      };
    } else {
      console.log(error);
      return {
        name: "",
        imageUrl: "",
        error: true,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      name: "",
      imageUrl: "",
      error: true,
    };
  }
}
