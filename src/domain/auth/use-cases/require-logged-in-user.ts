import { User } from "@supabase/supabase-js";
import "server-only";
import getAuthUserUseCase from "./get-auth-user-use-case";

export default async function requireLoggedInUser(): Promise<User> {
  const { authUser } = await getAuthUserUseCase();
  if (!authUser) {
    throw Error("Unauthorized");
  } else {
    return authUser;
  }
}
