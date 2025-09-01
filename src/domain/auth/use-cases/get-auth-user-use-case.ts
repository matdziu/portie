import { createSupabaseClientForAuth } from "@/lib/supabase/server";
import "server-only";
import { GetAuthUserResult } from "../entities/get-auth-user-result";

export default async function getAuthUserUseCase(): Promise<GetAuthUserResult> {
  const supabase = await createSupabaseClientForAuth();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return {
    authUser: user,
  };
}
