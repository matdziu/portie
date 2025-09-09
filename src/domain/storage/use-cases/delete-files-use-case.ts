import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import "server-only";
import { DeleteFilesInput } from "../entities/delete-files-input";
import { DeleteFilesResult } from "../entities/delete-files-result";

export default async function deleteFilesUseCase({
  bucketName,
  filePaths,
}: DeleteFilesInput): Promise<DeleteFilesResult> {
  try {
    const supabase = createSupabaseAdminClient();

    const { error } = await supabase.storage.from(bucketName).remove(filePaths);

    if (error) {
      console.error(error);
      return {
        success: false,
        error: true,
      };
    }
    return {
      success: true,
      error: false,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: true,
    };
  }
}
