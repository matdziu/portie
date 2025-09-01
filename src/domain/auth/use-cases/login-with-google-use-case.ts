import { createSupabaseAuthClient } from "@/lib/supabase/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import "server-only";
import { LoginWithGoogleResult } from "../entities/login-with-google-result";

export default async function loginWithGoogleUseCase(): Promise<LoginWithGoogleResult> {
  const supabase = await createSupabaseAuthClient();
  const headersList = await headers();
  const origin = headersList.get("origin");
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    return {
      error: true,
    };
  } else {
    redirect(data.url ?? "/sign-in");
  }
}
