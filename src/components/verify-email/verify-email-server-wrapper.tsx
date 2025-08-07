import isLoggedInUseCase from "@/domain/auth/use-cases/is-logged-in-use-case";
import { redirect } from "next/navigation";
import "server-only";
import VerifyEmailViewController from "./verify-email-view-controller";

export default async function VerifyEmailServerWrapper() {
  const isLoggedIn = (await isLoggedInUseCase()).isLoggedIn;
  if (isLoggedIn) {
    redirect("/dashboard/manage-content");
  }
  return <VerifyEmailViewController />;
}
