"use client";

import { successToast } from "@/lib/toast-utils";
import { zodResolver } from "@hookform/resolvers/zod";
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
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import SignInViewProps from "./models/sign-in-view-props";

export default function SignInView({ formSchema, onSubmit }: SignInViewProps) {
  const screenTranslations = useTranslations("SignIn");
  const commonTranslations = useTranslations("Common");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  successToast("This is a success!");

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
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{screenTranslations("emailLabel")}</FormLabel>
                      <FormControl className="mt-2">
                        <Input
                          placeholder={screenTranslations("emailPlaceholder")}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" variant="default" className="w-full mt-2">
                  {screenTranslations("continueButton")}
                </Button>
              </form>
            </Form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
