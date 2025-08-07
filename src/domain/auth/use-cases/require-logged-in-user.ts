import { User } from "@supabase/supabase-js";
import "server-only";
import getAuthUserUseCase from "./get-auth-user-use-case";

export default async function requireLoggedInUser(): Promise<User> {
  const authUserResult = await getAuthUserUseCase();
  if (!authUserResult.authUser) {
    throw Error("Unauthorized");
  } else {
    return authUserResult.authUser;
  }
}
