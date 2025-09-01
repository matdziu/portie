"use client";

import { CreatePageError } from "@/domain/manage-content/entities/create-page-error";
import { EditPageError } from "@/domain/manage-content/entities/edit-page-error";
import createPageContentAction from "@/server-actions/manage-content/create-page-content-action";
import editPageContentAction from "@/server-actions/manage-content/edit-page-content-action";
import { useTranslations } from "next-intl";
import { startTransition, useActionState } from "react";
import z from "zod";
import ManageContentView from "./manage-content-view";
import { ManageContentViewControllerProps } from "./models/manage-content-view-controller-props";
import { PageContentFormSchema } from "./models/manage-content-view-props";

export default function ManageContentViewController({
  pageWithRelatedData,
}: ManageContentViewControllerProps) {
  const screenTranslations = useTranslations("ManageContent");

  const pictureFileSchema = z
    .file()
    .max(5 * 1024, { error: screenTranslations("pictureFileIsTooBig") })
    .mime("image/png", "image/jpeg")
    .optional();

  const projectSkillsSchema = z.object({
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
    skills: z.array(projectSkillsSchema).optional(),
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

  const editPageContentInitialState = {
    pageName: "",
    success: false,
    error: undefined,
  };
  const [
    editPageContentResult,
    editPageContentSubmit,
    editPageContentIsPending,
  ] = useActionState(handleEditPageContentAction, editPageContentInitialState);

  function getEditPageContentErrorText(error?: EditPageError): string {
    switch (error) {
      case EditPageError.PageNameAlreadyExists:
        return screenTranslations("pageNameAlreadyExistText");
      case EditPageError.PageDoesNotExists:
        return screenTranslations("pageDoesNotExistText");
      case EditPageError.Generic:
        return screenTranslations("genericErrorText");
      default:
        return screenTranslations("genericErrorText");
    }
  }

  const onPageContentSubmit = (formData: PageContentFormSchema) =>
    startTransition(() => {
      if (pageWithRelatedData) {
        editPageContentSubmit(formData);
      } else {
        createPageContentSubmit(formData);
      }
    });

  const progress = createPageContentIsPending || editPageContentIsPending;

  const error =
    createPageContentResult.error !== undefined ||
    editPageContentResult.error !== undefined;

  const errorText = pageWithRelatedData
    ? getEditPageContentErrorText(editPageContentResult.error)
    : getCreatePageContentErrorText(createPageContentResult.error);

  const success =
    createPageContentResult.success || editPageContentResult.success;

  const afterSuccessRedirectUrl = pageWithRelatedData
    ? `/p/${editPageContentResult.pageName}`
    : `/p/${createPageContentResult.pageName}`;

  return (
    <ManageContentView
      pageWithRelatedData={pageWithRelatedData}
      formSchema={formSchema}
      onPageContentSubmit={onPageContentSubmit}
      progress={progress}
      error={error}
      errorText={errorText}
      success={success}
      afterSuccessRedirectUrl={afterSuccessRedirectUrl}
    />
  );
}

async function handleCreatePageContentAction(
  previousState: unknown,
  formData: PageContentFormSchema
) {
  return await createPageContentAction({ pageContentFormSchema: formData });
}

async function handleEditPageContentAction(
  previousState: unknown,
  formData: PageContentFormSchema
) {
  return await editPageContentAction({ pageContentFormSchema: formData });
}
