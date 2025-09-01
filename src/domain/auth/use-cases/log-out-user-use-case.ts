import { createSupabaseAuthClient } from "@/lib/supabase/auth";
import { redirect } from "next/navigation";
import "server-only";
import { LogOutUserInput } from "../entities/log-out-user-input";
import { LogOutUserResult } from "../entities/log-out-user-result";

export default async function logOutUserUseCase({
  afterLogoutRedirect,
}: LogOutUserInput): Promise<LogOutUserResult> {
  const supabase = await createSupabaseAuthClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    return {
      error: true,
    };
  } else {
    redirect(afterLogoutRedirect);
  }
}
