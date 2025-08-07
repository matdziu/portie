import { createClient } from "@/lib/supabase/server";
import "server-only";
import { LoginWithEmailInput } from "../entities/login-with-email-input";
import { LoginWithEmailResult } from "../entities/login-with-email-result";

export default async function loginWithEmailUseCase({
  email,
}: LoginWithEmailInput): Promise<LoginWithEmailResult> {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithOtp({
    email: email,
    options: {
      shouldCreateUser: true,
      emailRedirectTo: "https://example.com/welcome",
    },
  });

  if (error) {
    return {
      success: false,
      error: true,
    };
  } else {
    return {
      success: true,
      error: false,
    };
  }
}
