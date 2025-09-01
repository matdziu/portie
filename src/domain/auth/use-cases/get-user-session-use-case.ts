import { createSupabaseClientForAuth } from "@/lib/supabase/server";
import "server-only";
import { GetUserSessionResult } from "../entities/get-user-session-result";

export default async function getUserSessionUseCase(): Promise<GetUserSessionResult> {
  const supabase = await createSupabaseClientForAuth();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return {
    session: session,
  };
}
