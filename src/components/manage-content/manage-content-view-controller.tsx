"use client";

import { CreatePageError } from "@/domain/manage-content/entities/create-page-error";
import { EditPageError } from "@/domain/manage-content/entities/edit-page-error";
import { UploadFileResult } from "@/domain/storage/entities/upload-file-result";
import uploadFileUseCase from "@/domain/storage/use-cases/upload-file-use-case";
import { removeFilesFromPageContentForm } from "@/lib/manage-content-utils";
import createPageContentAction from "@/server-actions/manage-content/create-page-content-action";
import editPageContentAction from "@/server-actions/manage-content/edit-page-content-action";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { startTransition, useActionState, useEffect } from "react";
import z from "zod";
import ManageContentView from "./manage-content-view";
import { ManageContentViewControllerProps } from "./models/manage-content-view-controller-props";
import { PageContentFormSchema } from "./models/manage-content-view-props";

export default function ManageContentViewController({
  pageWithRelatedData,
}: ManageContentViewControllerProps) {
  const screenTranslations = useTranslations("ManageContent");
  const router = useRouter();

  const MAX_FILE_SIZE = 2 * 1024 * 1024;
  const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png"];
  const imageSchema = z
    .any()
    .refine(
      (image) => image instanceof File || typeof image === "string" || !image,
      {
        message: screenTranslations("invalidPictureFileTypeError"),
      }
    )
    .refine(
      (image) =>
        !image || typeof image === "string" || image.size <= MAX_FILE_SIZE,
      {
        message: screenTranslations("pictureFileIsTooBig"),
      }
    )
    .refine(
      (image) =>
        !image ||
        typeof image === "string" ||
        ACCEPTED_IMAGE_TYPES.includes(image.type),
      {
        message: screenTranslations("invalidPictureFileTypeError"),
      }
    )
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
    formId: z.string(),
    projectName: z
      .string()
      .trim()
      .min(1, {
        error: screenTranslations("projectNameRequiredError"),
      }),
    projectPicture: imageSchema,
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
      })
      .regex(/^\S+$/, {
        message: screenTranslations("pageNameCannotContainSpacesError"),
      }),
    pagePicture: imageSchema,
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
      case CreatePageError.NoAnnualPass:
        return screenTranslations("noAnnualPassError");
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
      case EditPageError.NoAnnualPass:
        return screenTranslations("noAnnualPassError");
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

  const pageName = pageWithRelatedData
    ? `${editPageContentResult.pageName}`
    : `${createPageContentResult.pageName}`;

  const afterSuccessRedirectUrl = `/p/${pageName}`;

  useEffect(() => {
    if (
      createPageContentResult.error === CreatePageError.NoAnnualPass ||
      editPageContentResult.error === EditPageError.NoAnnualPass
    ) {
      router.push("/dashboard/upgrade");
    }
  }, [
    createPageContentResult,
    editPageContentResult,
    afterSuccessRedirectUrl,
    router,
    pageName,
  ]);

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
  const { pageImageUploadResult, projectsImageUploadResults } =
    await uploadFormImages(formData);

  return await createPageContentAction({
    pageContentFormSchema: removeFilesFromPageContentForm(formData),
    pageImageUploadResult: pageImageUploadResult,
    projectImagesUploadResults: projectsImageUploadResults,
  });
}

async function handleEditPageContentAction(
  previousState: unknown,
  formData: PageContentFormSchema
) {
  const { pageImageUploadResult, projectsImageUploadResults } =
    await uploadFormImages(formData);
  return await editPageContentAction({
    pageContentFormSchema: removeFilesFromPageContentForm(formData),
    pageImageUploadResult: pageImageUploadResult,
    projectImagesUploadResults: projectsImageUploadResults,
  });
}

async function uploadFormImages(formData: PageContentFormSchema): Promise<{
  pageImageUploadResult: UploadFileResult | undefined;
  projectsImageUploadResults: UploadFileResult[];
}> {
  let pageImageUploadPromise: Promise<UploadFileResult> | undefined = undefined;
  const pageImageFile = formData.pagePicture;
  if (pageImageFile instanceof File) {
    pageImageUploadPromise = uploadFileUseCase({
      owningEntityId: formData.pageName,
      file: pageImageFile,
      bucket: "page-pictures",
    });
  }

  const projectsImageUploadPromises: Promise<UploadFileResult>[] = [];
  if (formData.projects) {
    for (const project of formData.projects) {
      const projectImageFile = project.projectPicture;
      if (projectImageFile instanceof File) {
        const projectImageUploadPromise = uploadFileUseCase({
          owningEntityId: project.formId,
          file: projectImageFile,
          bucket: "project-pictures",
        });
        projectsImageUploadPromises.push(projectImageUploadPromise);
      }
    }
  }

  const pageImageUploadResult = await pageImageUploadPromise;
  const projectsImageUploadResults = await Promise.all(
    projectsImageUploadPromises
  );

  return {
    pageImageUploadResult,
    projectsImageUploadResults,
  };
}
