"use client";

import loginWithEmailAction from "@/server-actions/auth/login-with-email-action";
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

  const formSchema = z.object({
    email: z.email({ error: screenTranslations("invalidEmailError") }),
  });

  return (
    <SignInView
      formSchema={formSchema}
      onSubmit={(formData) =>
        startTransition(() => {
          loginWithEmailSubmit(formData);
        })
      }
      progress={loginWithEmailIsPending}
      success={loginWithEmailResult.success}
      error={loginWithEmailResult.error}
    />
  );
}

async function handleLoginWithEmailAction(
  previousState: unknown,
  formData: SignInFormSchema
) {
  return await loginWithEmailAction(formData);
}
