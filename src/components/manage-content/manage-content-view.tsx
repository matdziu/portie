"use client";

import { errorToast, infoToast, successToast } from "@/lib/toast-utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Control, useFieldArray, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import z from "zod";
import DefaultSpinnerView from "../default-spinner/default-spinner-view";
import PictureUploadInputView from "../picture-upload-input/picture-upload-input-view";
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
import { Textarea } from "../ui/textarea";
import {
  ManageContentViewProps,
  PageContentFormSchema,
} from "./models/manage-content-view-props";

export default function ManageContentView({
  pageWithRelatedData,
  formSchema,
  onPageContentSubmit,
  progress,
  error,
  errorText,
  success,
  afterSuccessRedirectUrl,
}: ManageContentViewProps) {
  const screenTranslations = useTranslations("ManageContent");
  const router = useRouter();

  useEffect(() => {
    if (success && !progress) {
      successToast(screenTranslations("successToastText"));
      router.push(afterSuccessRedirectUrl);
    }
  }, [success, progress, afterSuccessRedirectUrl, router, screenTranslations]);

  useEffect(() => {
    if (error && !progress) {
      const errorToastMessage =
        errorText ?? screenTranslations("genericErrorText");
      errorToast(errorToastMessage);
    }
  }, [error, progress, errorText, screenTranslations]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pageName: pageWithRelatedData?.pageName ?? "",
      pagePicture: pageWithRelatedData?.pictureUrl ?? "",
      fullName: pageWithRelatedData?.fullName ?? "",
      location: pageWithRelatedData?.location ?? "",
      position: pageWithRelatedData?.position ?? "",
      description: pageWithRelatedData?.description ?? "",
      personalWebsiteLink: pageWithRelatedData?.personalWebsiteLink ?? "",
      githubLink: pageWithRelatedData?.githubLink ?? "",
      linkedInLink: pageWithRelatedData?.linkedInLink ?? "",
      mediumLink: pageWithRelatedData?.mediumLink ?? "",
      twitterLink: pageWithRelatedData?.twitterLink ?? "",
      youtubeLink: pageWithRelatedData?.youtubeLink ?? "",
      instagramLink: pageWithRelatedData?.instagramLink ?? "",
      projects: pageWithRelatedData?.projects.map((project) => ({
        formId: project.formId,
        projectName: project.name,
        projectPicture: project.pictureUrl ?? "",
        projectDescription: project.description ?? "",
        label: project.label ?? "",
        topLink: project.topLink ?? "",
        bottomLink: project.bottomLink ?? "",
        displayOrder: project.displayOrder,
        skills: project.skills.map((skill) => ({
          skillName: skill.name,
          skillValue: skill.value,
        })),
      })),
    },
  });

  const {
    fields: projectsFields,
    append: appendProject,
    remove: removeProject,
  } = useFieldArray({
    control: form.control,
    name: "projects",
  });

  return (
    <div className="flex flex-col items-center justify-center">
      {progress && <DefaultSpinnerView />}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onPageContentSubmit)}
          className="flex flex-col gap-8 p-6 my-4 w-full md:w-2xl"
        >
          <h1 className="text-center font-extrabold text-2xl">
            {screenTranslations("title")}
          </h1>
          <div className="mx-5 h-[4px] bg-primary rounded-full" />
          <div className="flex flex-row w-full items-top gap-4">
            <FormField
              control={form.control}
              name="pagePicture"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <PictureUploadInputView
                      value={field.value}
                      onValueChange={(file) => field.onChange(file)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pageName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>
                    <div className="flex flex-col gap-1">
                      <p>{screenTranslations("pageNameLabel1")}</p>
                      <p className="text-xs font-light">
                        {screenTranslations("pageNameLabel2")}
                      </p>
                    </div>
                  </FormLabel>
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
          </div>
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
          {projectsFields.map((projectField, projectIndex) => (
            <div
              key={projectField.id}
              className="flex flex-col gap-8 bg-card text-card-foreground rounded-md border shadow-sm p-6"
            >
              <div className="flex flex-row w-full gap-4">
                <FormField
                  control={form.control}
                  name={`projects.${projectIndex}.projectPicture`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <PictureUploadInputView
                          value={field.value}
                          onValueChange={(file) => field.onChange(file)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`projects.${projectIndex}.projectName`}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>
                        {screenTranslations("projectNameLabel")}
                      </FormLabel>
                      <FormControl className="mt-2">
                        <Input
                          placeholder={screenTranslations(
                            "projectNamePlaceholder"
                          )}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name={`projects.${projectIndex}.projectDescription`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {screenTranslations("projectDescriptionLabel")}
                    </FormLabel>
                    <FormControl className="mt-2">
                      <Textarea
                        placeholder={screenTranslations(
                          "projectDescriptionPlaceholder"
                        )}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`projects.${projectIndex}.label`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <div className="flex flex-col gap-1">
                        <p>{screenTranslations("projectLabelLabel1")}</p>
                        <p className="text-xs font-light">
                          {screenTranslations("projectLabelLabel2")}
                        </p>
                      </div>
                    </FormLabel>
                    <FormControl className="mt-2">
                      <Input
                        placeholder={screenTranslations(
                          "projectLabelPlaceholder"
                        )}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`projects.${projectIndex}.topLink`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <div className="flex flex-col gap-1">
                        <p>{screenTranslations("projectTopLinkLabel1")}</p>
                        <p className="text-xs font-light">
                          {screenTranslations("projectTopLinkLabel2")}
                        </p>
                      </div>
                    </FormLabel>
                    <FormControl className="mt-2">
                      <Input
                        placeholder={screenTranslations(
                          "projectTopLinkPlaceholder"
                        )}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`projects.${projectIndex}.bottomLink`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <div className="flex flex-col gap-1">
                        <p>{screenTranslations("projectBottomLinkLabel1")}</p>
                        <p className="text-xs font-light">
                          {screenTranslations("projectBottomLinkLabel2")}
                        </p>
                      </div>
                    </FormLabel>
                    <FormControl className="mt-2">
                      <Input
                        placeholder={screenTranslations(
                          "projectBottomLinkPlaceholder"
                        )}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`projects.${projectIndex}.displayOrder`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <div className="flex flex-col gap-1">
                        <p>{screenTranslations("displayOrderLabel1")}</p>
                        <p className="text-xs font-light">
                          {screenTranslations("displayOrderLabel2")}
                        </p>
                      </div>
                    </FormLabel>
                    <FormControl className="mt-2">
                      <Input
                        placeholder={screenTranslations(
                          "displayOrderPlaceholder"
                        )}
                        type="number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <ProjectsSkillsForm
                projectIndex={projectIndex}
                control={form.control}
              />
              <div className="flex w-full items-center justify-end gap-4">
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => {
                    removeProject(projectIndex);
                    infoToast(screenTranslations("projectRemovedInfo"));
                  }}
                >
                  {screenTranslations("removeProjectButton")}
                </Button>
              </div>
            </div>
          ))}
          <Button
            type="button"
            onClick={() =>
              appendProject({
                formId: uuidv4(),
                projectName: "",
                projectPicture: "",
                projectDescription: "",
                label: "",
                topLink: "",
                bottomLink: "",
                displayOrder: 1,
                skills: [],
              })
            }
          >
            {screenTranslations("addProjectButton")}
          </Button>
          <div className="mx-5 h-[4px] bg-primary rounded-full" />
          <FormField
            control={form.control}
            name="personalWebsiteLink"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {screenTranslations("personalWebsiteLinkLabel")}
                </FormLabel>
                <FormControl className="mt-2">
                  <Input
                    placeholder={screenTranslations(
                      "personalWebsiteLinkPlaceholder"
                    )}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="githubLink"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{screenTranslations("githubLinkLabel")}</FormLabel>
                <FormControl className="mt-2">
                  <Input
                    placeholder={screenTranslations("githubLinkPlaceholder")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="linkedInLink"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{screenTranslations("linkedInLinkLabel")}</FormLabel>
                <FormControl className="mt-2">
                  <Input
                    placeholder={screenTranslations("linkedInLinkPlaceholder")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="twitterLink"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{screenTranslations("twitterLinkLabel")}</FormLabel>
                <FormControl className="mt-2">
                  <Input
                    placeholder={screenTranslations("twitterLinkPlaceholder")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="mediumLink"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{screenTranslations("mediumLinkLabel")}</FormLabel>
                <FormControl className="mt-2">
                  <Input
                    placeholder={screenTranslations("mediumLinkPlaceholder")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="youtubeLink"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{screenTranslations("youtubeLinkLabel")}</FormLabel>
                <FormControl className="mt-2">
                  <Input
                    placeholder={screenTranslations("youtubeLinkPlaceholder")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="instagramLink"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {screenTranslations("instagramLinkLabel")}
                </FormLabel>
                <FormControl className="mt-2">
                  <Input
                    placeholder={screenTranslations("instagramLinkPlaceholder")}
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

function ProjectsSkillsForm({
  projectIndex,
  control,
}: {
  projectIndex: number;
  control: Control<PageContentFormSchema>;
}) {
  const screenTranslations = useTranslations("ManageContent");
  const {
    fields: skillsFields,
    append: appendSkill,
    remove: removeSkill,
  } = useFieldArray({
    control,
    name: `projects.${projectIndex}.skills`,
  });
  return (
    <div className="flex flex-col w-full gap-6 items-center justify-center">
      {skillsFields.map((skillField, skillIndex) => (
        <div
          key={skillField.id}
          className="flex flex-row w-full items-end justify-center gap-4 p-4 rounded-md border"
        >
          <FormField
            control={control}
            name={`projects.${projectIndex}.skills.${skillIndex}.skillName`}
            render={({ field }) => (
              <FormItem className="flex-grow-[5] basis-0">
                <FormLabel>
                  {screenTranslations("projectSkillNameLabel")}
                </FormLabel>
                <FormControl className="mt-2">
                  <Input
                    placeholder={screenTranslations(
                      "projectSkillNamePlaceholder"
                    )}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name={`projects.${projectIndex}.skills.${skillIndex}.skillValue`}
            render={({ field }) => (
              <FormItem className="flex-grow-[5] basis-0">
                <FormLabel>
                  <div className="flex flex-col gap-1">
                    <p>{screenTranslations("projectSkillValueLabel1")}</p>
                    <p className="text-xs font-light">
                      {screenTranslations("projectSkillValueLabel2")}
                    </p>
                  </div>
                </FormLabel>
                <FormControl className="mt-2">
                  <Input
                    placeholder={screenTranslations(
                      "projectSkillValuePlaceholder"
                    )}
                    type="number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="button"
            className="flex-shrink-0 w-10 h-10 rounded-full"
            onClick={() => {
              removeSkill(skillIndex);
              infoToast(screenTranslations("skillRemovedInfo"));
            }}
            variant="destructive"
          >
            <Trash />
          </Button>
        </div>
      ))}
      <Button
        type="button"
        className="w-fit"
        onClick={() => appendSkill({ skillName: "", skillValue: 0 })}
      >
        {screenTranslations("addSkillButton")}
      </Button>
    </div>
  );
}
