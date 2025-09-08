import prisma from "@/lib/prisma";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import "server-only";
import { DeleteAccountResult } from "../entities/delete-account-result";
import requireLoggedInUser from "./require-logged-in-user";

export default async function deleteAccountUseCase(): Promise<DeleteAccountResult> {
  try {
    const authUser = await requireLoggedInUser();
    const supabase = createSupabaseAdminClient();

    await supabase.auth.admin.deleteUser(authUser.id);
    await prisma.userDb.delete({
      where: {
        id: authUser.id,
      },
    });
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
