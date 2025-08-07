import { type EmailOtpType } from "@supabase/supabase-js";
import { type NextRequest } from "next/server";

import { createSupabaseClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next") ?? "/dashboard/manage-content";

  if (tokenHash && type) {
    const supabase = await createSupabaseClient();

    const { error } = await supabase.auth.verifyOtp({
      token_hash: tokenHash,
      type: type,
    });
    if (!error) {
      redirect(next);
    }
  }

  redirect("/sign-in");
}
