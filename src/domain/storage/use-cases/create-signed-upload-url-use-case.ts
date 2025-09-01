import requireLoggedInUser from "@/domain/auth/use-cases/require-logged-in-user";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import "server-only";
import { v4 as uuidv4 } from "uuid";
import { CreateSignedUploadUrlInput } from "../entities/create-signed-upload-url-input";
import { CreateSignedUploadUrlResult } from "../entities/create-signed-upload-url-result";

export default async function createSignedUploadUrlUseCase({
  bucket,
  fileExtension,
}: CreateSignedUploadUrlInput): Promise<CreateSignedUploadUrlResult> {
  const authUser = await requireLoggedInUser();
  const allowedExtensions = ["jpg", "jpeg", "png"];
  const sanitizedExtension = fileExtension
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");

  if (!allowedExtensions.includes(sanitizedExtension)) {
    return {
      signedUrl: "",
      error: true,
    };
  }

  const supabase = createSupabaseAdminClient();
  const uniqueId = uuidv4();
  const path = `/${authUser.id}/${uniqueId}.${sanitizedExtension}`;

  const { data, error } = await supabase.storage
    .from(bucket)
    .createSignedUploadUrl(path);

  if (error) {
    console.error(error);
    return {
      signedUrl: "",
      error: true,
    };
  }

  return {
    signedUrl: data.signedUrl,
    error: false,
  };
}
