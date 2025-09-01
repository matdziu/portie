import { UserPageWithRelatedData } from "@/domain/manage-content/entities/user-page-with-related-data";
import { ZodType } from "zod";

export interface ManageContentViewProps {
  pageWithRelatedData?: UserPageWithRelatedData;
  formSchema: ZodType<PageContentFormSchema, PageContentFormSchema>;
  onPageContentSubmit: (formData: PageContentFormSchema) => void;
  progress: boolean;
  error: boolean;
  errorText?: string;
  success: boolean;
  afterSuccessRedirectUrl: string;
}

export type PageContentFormSchema = {
  pageName: string;
  pagePicture?: PictureFile;
  fullName: string;
  location: string;
  position: string;
  description?: string;
  projects?: ProjectSchema[];
  personalWebsiteLink?: string;
  githubLink?: string;
  linkedInLink?: string;
  mediumLink?: string;
  twitterLink?: string;
  youtubeLink?: string;
  instagramLink?: string;
};

type ProjectSchema = {
  projectName: string;
  projectPicture?: PictureFile;
  projectDescription?: string;
  label?: string;
  topLink?: string;
  bottomLink?: string;
  displayOrder: number;
  skills?: ProjectSkillSchema[];
};

type ProjectSkillSchema = {
  skillName: string;
  skillValue: number;
};

export type PictureFile = File | string | undefined;

type ProjectSchemaWithoutFiles = Omit<ProjectSchema, "projectPicture">;

export type PageContentFormSchemaWithoutFiles = Omit<
  PageContentFormSchema,
  "pagePicture" | "projects"
> & {
  projects?: ProjectSchemaWithoutFiles[];
};
