import { createSupabaseAuthClient } from "@/lib/supabase/auth";
import "server-only";
import { GetUserSessionResult } from "../entities/get-user-session-result";

export default async function getUserSessionUseCase(): Promise<GetUserSessionResult> {
  const supabase = await createSupabaseAuthClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return {
    session: session,
  };
}
