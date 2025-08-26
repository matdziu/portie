"use client";

import { errorToast, successToast } from "@/lib/toast-utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import DefaultSpinnerView from "../default-spinner/default-spinner-view";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { ManageContentViewProps } from "./models/manage-content-view-props";
import { Textarea } from "../ui/textarea";

export default function ManageContentView({
  formSchema,
  onPageContentSubmit,
  progress,
  error,
  success,
  afterSuccessRedirectUrl,
}: ManageContentViewProps) {
  const screenTranslations = useTranslations("ManageContent");
  const router = useRouter();

  useEffect(() => {
    if (success) {
      successToast(screenTranslations("successToastText"));
      router.push(afterSuccessRedirectUrl);
    }
  }, [success, afterSuccessRedirectUrl, router, screenTranslations]);

  useEffect(() => {
    if (error) {
      errorToast(screenTranslations("errorToastText"));
    }
  }, [error, screenTranslations]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pageName: "",
      fullName: "",
      location: "",
      position: "",
      description: undefined,
    },
  });

  return (
    <div className="flex flex-col items-center justify-center">
      {progress && <DefaultSpinnerView />}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onPageContentSubmit)}
          className="flex flex-col gap-8 p-6 my-8 w-full md:w-2xl"
        >
          <h1 className="text-center font-extrabold text-2xl">
            {screenTranslations("title")}
          </h1>
          <FormField
            control={form.control}
            name="pageName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{screenTranslations("pageNameLabel")}</FormLabel>
                <FormControl className="mt-2">
                  <Input
                    placeholder={screenTranslations("pageNamePlaceholder")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="mx-5 h-[4px] bg-primary rounded-full" />
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{screenTranslations("fullNameLabel")}</FormLabel>
                <FormControl className="mt-2">
                  <Input
                    placeholder={screenTranslations("fullNamePlaceholder")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{screenTranslations("locationLabel")}</FormLabel>
                <FormControl className="mt-2">
                  <Input
                    placeholder={screenTranslations("locationPlaceholder")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="position"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{screenTranslations("positionLabel")}</FormLabel>
                <FormControl className="mt-2">
                  <Input
                    placeholder={screenTranslations("positionPlaceholder")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{screenTranslations("descriptionLabel")}</FormLabel>
                <FormControl className="mt-2">
                  <Textarea
                    placeholder={screenTranslations("descriptionPlaceholder")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="mx-5 h-[4px] bg-primary rounded-full" />
          <Button
            type="submit"
            variant="default"
            className="w-full mt-2 sticky bottom-4 bg-primary p-4 z-10"
          >
            {screenTranslations("saveButton")}
          </Button>
        </form>
      </Form>
    </div>
  );
}
