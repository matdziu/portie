import { Session } from "@supabase/supabase-js";

export type GetUserSessionResult = {
  session: Session | null;
};
