"use client";

import { useTranslations } from "next-intl";
import z from "zod";
import SignInView from "./sign-in-view";

export default function SignInViewController() {
  const screenTranslations = useTranslations("SignIn");

  const formSchema = z.object({
    email: z.email({ error: screenTranslations("invalidEmailError") }),
  });

  return (
    <SignInView
      formSchema={formSchema}
      onSubmit={(values) => console.log(values)}
    />
  );
}
