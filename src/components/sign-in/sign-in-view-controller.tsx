"use client";

import loginWithEmailAction from "@/server-actions/auth/login-with-email-action";
import loginWithGithubAction from "@/server-actions/auth/login-with-github-action";
import { useTranslations } from "next-intl";
import { startTransition, useActionState } from "react";
import z from "zod";
import { SignInFormSchema } from "./models/sign-in-view-props";
import SignInView from "./sign-in-view";

export default function SignInViewController() {
  const screenTranslations = useTranslations("SignIn");

  const loginWithEmailInitialState = { success: false, error: false };
  const [loginWithEmailResult, loginWithEmailSubmit, loginWithEmailIsPending] =
    useActionState(handleLoginWithEmailAction, loginWithEmailInitialState);

  const loginWithGithubInitialState = { success: false, error: false };
  const [
    loginWithGithubResult,
    loginWithGithubSubmit,
    loginWithGithubIsPending,
  ] = useActionState(handleLoginWithGithubAction, loginWithGithubInitialState);

  const formSchema = z.object({
    email: z.email({ error: screenTranslations("invalidEmailError") }),
  });

  return (
    <SignInView
      formSchema={formSchema}
      onEmailSubmit={(formData) =>
        startTransition(() => {
          loginWithEmailSubmit(formData);
        })
      }
      onGithubLoginSubmit={() =>
        startTransition(() => {
          loginWithGithubSubmit();
        })
      }
      onGmailLoginSubmit={() =>
        startTransition(() => {
          // logging with Gmail
        })
      }
      progress={loginWithEmailIsPending || loginWithGithubIsPending}
      emailSubmitSuccess={loginWithEmailResult.success}
      error={loginWithEmailResult.error || loginWithGithubResult.error}
    />
  );
}

async function handleLoginWithEmailAction(
  previousState: unknown,
  formData: SignInFormSchema
) {
  return await loginWithEmailAction(formData);
}

async function handleLoginWithGithubAction(previousState: unknown) {
  return await loginWithGithubAction();
}
