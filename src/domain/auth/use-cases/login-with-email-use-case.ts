import { createSupabaseAuthClient } from "@/lib/supabase/auth";
import "server-only";
import { LoginWithEmailInput } from "../entities/login-with-email-input";
import { LoginWithEmailResult } from "../entities/login-with-email-result";

export default async function loginWithEmailUseCase({
  email,
}: LoginWithEmailInput): Promise<LoginWithEmailResult> {
  throw Error("this is server erroro sifniosd nsdfod inio")
  const supabase = await createSupabaseAuthClient();

  const { error } = await supabase.auth.signInWithOtp({
    email: email,
    options: {
      shouldCreateUser: true,
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
