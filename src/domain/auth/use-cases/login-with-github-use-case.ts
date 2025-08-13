import { createSupabaseClient } from "@/lib/supabase/server";
import "server-only";
import { LoginWithGithubResult } from "../entities/login-with-github-result";

export default async function loginWithGithubUseCase(): Promise<LoginWithGithubResult> {
  const supabase = await createSupabaseClient();
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "github",
  });
  if (!error) {
    return {
      success: true,
      error: false,
    };
  } else {
    return {
      success: false,
      error: true,
    };
  }
}
