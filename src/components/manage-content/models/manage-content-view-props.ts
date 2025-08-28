import { ZodType } from "zod";

export interface ManageContentViewProps {
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
