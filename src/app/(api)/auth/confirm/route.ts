import { type EmailOtpType } from "@supabase/supabase-js";
import { type NextRequest } from "next/server";

import createUserDbUseCase from "@/domain/auth/use-cases/create-user-db-use-case";
import getAuthUserUseCase from "@/domain/auth/use-cases/get-auth-user-use-case";
import { createSupabaseClientForAuth } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next") ?? "/dashboard/manage-content";

  if (tokenHash && type) {
    const supabase = await createSupabaseClientForAuth();

    const { error } = await supabase.auth.verifyOtp({
      token_hash: tokenHash,
      type: type,
    });
    if (!error) {
      const { authUser } = await getAuthUserUseCase();

      if (authUser) {
        await createUserDbUseCase({
          userId: authUser.id,
          email: authUser.email ?? "",
        });
      }

      redirect(next);
    }
  }

  redirect("/sign-in");
}
