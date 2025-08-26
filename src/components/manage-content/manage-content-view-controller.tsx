"use client";

import savePageContentAction from "@/server-actions/manage-content/save-page-content-action";
import { useTranslations } from "next-intl";
import { startTransition, useActionState } from "react";
import z from "zod";
import ManageContentView from "./manage-content-view";
import { PageContentFormSchema } from "./models/manage-content-view-props";

export default function ManageContentViewController() {
  const screenTranslations = useTranslations("ManageContent");

  const formSchema = z.object({
    pageName: z
      .string()
      .trim()
      .min(1, {
        message: screenTranslations("pageNameRequiredError"),
      }),
    fullName: z
      .string()
      .trim()
      .min(1, {
        message: screenTranslations("fullNameRequiredError"),
      }),
    location: z
      .string()
      .trim()
      .min(1, {
        message: screenTranslations("locationRequiredError"),
      }),
    position: z
      .string()
      .trim()
      .min(1, {
        message: screenTranslations("positionRequiredError"),
      }),
    description: z.string().trim().optional(),
  });

  const savePageContentInitialState = {
    pageName: "",
    success: false,
    error: false,
  };
  const [
    savePageContentResult,
    savePageContentSubmit,
    savePageContentIsPending,
  ] = useActionState(handleSavePageContentAction, savePageContentInitialState);

  return (
    <ManageContentView
      formSchema={formSchema}
      onPageContentSubmit={(formData) =>
        startTransition(() => {
          savePageContentSubmit(formData);
        })
      }
      progress={savePageContentIsPending}
      error={savePageContentResult.error}
      success={savePageContentResult.success}
      afterSuccessRedirectUrl={`/p/${savePageContentResult.pageName}`}
    />
  );
}

async function handleSavePageContentAction(
  previousState: unknown,
  formData: PageContentFormSchema
) {
  return await savePageContentAction({ pageContentFormSchema: formData });
}
