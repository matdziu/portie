import { User } from "@supabase/supabase-js";

export type GetAuthUserResult = {
  authUser: User | null;
};
