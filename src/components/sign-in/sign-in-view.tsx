"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import z from "zod";
import GithubLogoSvg from "../svg/github-logo-svg";
import GoogleLogoSvg from "../svg/google-logo-svg";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";

export default function SignInView() {
  const screenTranslations = useTranslations("SignIn");
  const commonTranslations = useTranslations("Common");

  const formSchema = z.object({
    email: z.email(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <Card className="w-full md:w-[400px]">
        <CardHeader className="w-full flex flex-col justify-center items-center">
          <CardTitle className="w-full flex flex-col justify-center items-center text-center text-2xl">
            {screenTranslations("title")}
          </CardTitle>
          <CardDescription className="w-full justify-center text-center">
            {screenTranslations("body")}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <Button variant="outline">
              <GithubLogoSvg fill="currentColor" />
              {commonTranslations("github")}
            </Button>
            <Button variant="outline">
              <GoogleLogoSvg fill="currentColor" />
              {commonTranslations("google")}
            </Button>
          </div>
          <div className="relative mt-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card text-muted-foreground px-2">
                {screenTranslations("orContinueWith")}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <Label htmlFor="email-create-account">
              {screenTranslations("emailLabel")}
            </Label>
            <Input
              id="email-create-account"
              type="email"
              placeholder={screenTranslations("emailPlaceholder")}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="default" className="w-full">
            {screenTranslations("continueButton")}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
