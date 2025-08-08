import "server-only";
import { IsLoggedInResult } from "../entities/is-logged-in-result";
import getAuthUserUseCase from "./get-auth-user-use-case";

export default async function isLoggedInUseCase(): Promise<IsLoggedInResult> {
  const { authUser } = await getAuthUserUseCase();
  if (authUser) {
    return {
      isLoggedIn: true,
    };
  } else {
    return {
      isLoggedIn: false,
    };
  }
}
