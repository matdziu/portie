"use client";

import createPageContentAction from "@/server-actions/manage-content/create-page-content-action";
import { useTranslations } from "next-intl";
import { startTransition, useActionState } from "react";
import z from "zod";
import ManageContentView from "./manage-content-view";
import { PageContentFormSchema } from "./models/manage-content-view-props";

export default function ManageContentViewController() {
  const screenTranslations = useTranslations("ManageContent");

  const projectSkills = z.object({
    skillName: z
      .string()
      .trim()
      .min(1, { error: screenTranslations("projectSkillNameRequiredError") })
      .max(32, { error: screenTranslations("projectSkillNameIsTooLongError") }),
    skillValue: z.coerce
      .number<number>({
        error: screenTranslations("projectSkillValueMustBeIntegerError"),
      })
      .int({ error: screenTranslations("projectSkillValueMustBeIntegerError") })
      .min(1, {
        error: screenTranslations("projectSkillValueMustBeIntegerError"),
      })
      .max(100, {
        error: screenTranslations("projectSkillValueMustBeIntegerError"),
      }),
  });

  const projectSchema = z.object({
    projectName: z
      .string()
      .trim()
      .min(1, {
        error: screenTranslations("projectNameRequiredError"),
      }),
    projectDescription: z.string().trim().optional(),
    label: z
      .string()
      .max(15, {
        error: screenTranslations("labelMaxCharsError"),
      })
      .trim()
      .optional(),
    topLink: z
      .url({
        error: screenTranslations("wrongLinkError"),
      })
      .or(z.literal(""))
      .optional(),
    bottomLink: z
      .url({
        error: screenTranslations("wrongLinkError"),
      })
      .or(z.literal(""))
      .optional(),
    displayOrder: z.coerce
      .number<number>({
        error: screenTranslations("displayOrderMustBeIntegerError"),
      })
      .int({ error: screenTranslations("displayOrderMustBeIntegerError") })
      .min(1, {
        error: screenTranslations("displayOrderMustBeIntegerError"),
      }),
    skills: z.array(projectSkills).optional(),
  });

  const formSchema = z.object({
    pageName: z
      .string()
      .trim()
      .min(1, {
        error: screenTranslations("pageNameRequiredError"),
      }),
    fullName: z
      .string()
      .trim()
      .min(1, {
        error: screenTranslations("fullNameRequiredError"),
      }),
    location: z
      .string()
      .trim()
      .min(1, {
        error: screenTranslations("locationRequiredError"),
      }),
    position: z
      .string()
      .trim()
      .min(1, {
        error: screenTranslations("positionRequiredError"),
      }),
    description: z.string().trim().optional(),
    projects: z.array(projectSchema).optional(),
    personalWebsiteLink: z
      .url({ error: screenTranslations("wrongLinkError") })
      .trim()
      .or(z.literal(""))
      .optional(),
    githubLink: z
      .url({ error: screenTranslations("wrongLinkError") })
      .trim()
      .or(z.literal(""))
      .optional(),
    linkedInLink: z
      .url({ error: screenTranslations("wrongLinkError") })
      .trim()
      .or(z.literal(""))
      .optional(),
    mediumLink: z
      .url({ error: screenTranslations("wrongLinkError") })
      .trim()
      .or(z.literal(""))
      .optional(),
    twitterLink: z
      .url({ error: screenTranslations("wrongLinkError") })
      .trim()
      .or(z.literal(""))
      .optional(),
    youtubeLink: z
      .url({ error: screenTranslations("wrongLinkError") })
      .trim()
      .or(z.literal(""))
      .optional(),
    instagramLink: z
      .url({ error: screenTranslations("wrongLinkError") })
      .trim()
      .or(z.literal(""))
      .optional(),
  });

  const createPageContentInitialState = {
    pageName: "",
    success: false,
    error: undefined,
  };
  const [
    createPageContentResult,
    createPageContentSubmit,
    createPageContentIsPending,
  ] = useActionState(
    handleCreatePageContentAction,
    createPageContentInitialState
  );

  function getCreatePageContentErrorText(error?: CreatePageError): string {
    switch (error) {
      case CreatePageError.PageNameAlreadyExists:
        return screenTranslations("pageNameAlreadyExistText");
      case CreatePageError.Generic:
        return screenTranslations("genericErrorText");
      default:
        return screenTranslations("genericErrorText");
    }
  }

  return (
    <ManageContentView
      formSchema={formSchema}
      onPageContentSubmit={(formData) =>
        startTransition(() => {
          createPageContentSubmit(formData);
        })
      }
      progress={createPageContentIsPending}
      error={!!createPageContentResult.error}
      errorText={getCreatePageContentErrorText(createPageContentResult.error)}
      success={createPageContentResult.success}
      afterSuccessRedirectUrl={`/p/${createPageContentResult.pageName}`}
    />
  );
}

async function handleCreatePageContentAction(
  previousState: unknown,
  formData: PageContentFormSchema
) {
  return await createPageContentAction({ pageContentFormSchema: formData });
}
