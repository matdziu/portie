"use client";

import { errorToast, successToast } from "@/lib/toast-utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
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
import { Textarea } from "../ui/textarea";
import { ManageContentViewProps } from "./models/manage-content-view-props";

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
      description: "",
      personalWebsiteLink: "",
      githubLink: "",
      linkedInLink: "",
      mediumLink: "",
      twitterLink: "",
      youtubeLink: "",
      instagramLink: "",
      projects: [],
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
          <FormField
            control={form.control}
            name="pageName"
            render={({ field }) => (
              <FormItem>
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
          {projectsFields.map((projectField, index) => (
            <div
              key={projectField.id}
              className="flex flex-col gap-8 bg-card text-card-foreground rounded-md border shadow-sm p-6"
            >
              <FormField
                control={form.control}
                name={`projects.${index}.projectName`}
                render={({ field }) => (
                  <FormItem>
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
              <FormField
                control={form.control}
                name={`projects.${index}.projectDescription`}
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
                name={`projects.${index}.label`}
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
                name={`projects.${index}.topLink`}
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
                name={`projects.${index}.bottomLink`}
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
              <div className="flex w-full gap-4">
                <Button type="button">
                  {screenTranslations("addSkillButton")}
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => removeProject(index)}
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
                projectName: "",
                projectDescription: "",
                label: "",
                topLink: "",
                bottomLink: "",
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
