import isLoggedInUseCase from "@/domain/auth/use-cases/is-logged-in-use-case";
import { redirect } from "next/navigation";
import "server-only";
import SignInViewController from "./sign-in-view-controller";

export default async function SignInServerWrapper() {
  const isLoggedIn = (await isLoggedInUseCase()).isLoggedIn;
  if (isLoggedIn) {
    redirect("/dashboard/manage-content");
  }
  return <SignInViewController />;
}
