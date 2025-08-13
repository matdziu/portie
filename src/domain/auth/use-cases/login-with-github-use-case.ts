import { createSupabaseClient } from "@/lib/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import "server-only";
import { LoginWithGithubResult } from "../entities/login-with-github-result";

export default async function loginWithGithubUseCase(): Promise<LoginWithGithubResult> {
  const supabase = await createSupabaseClient();
  const headersList = await headers();
  const origin = headersList.get("origin");
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    return {
      error: true,
    };
  } else {
    redirect(data.url);
  }
}
