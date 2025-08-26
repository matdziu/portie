import { ZodType } from "zod";

export interface ManageContentViewProps {
  formSchema: ZodType<PageContentFormSchema, PageContentFormSchema>;
  onPageContentSubmit: (formData: PageContentFormSchema) => void;
  progress: boolean;
  error: boolean;
  success: boolean;
  afterSuccessRedirectUrl: string;
}

export type PageContentFormSchema = {
  pageName: string;
  fullName: string;
  location: string;
  position: string;
  description?: string;
  personalWebsiteLink?: string;
  githubLink?: string;
  linkedInLink?: string;
  mediumLink?: string;
  twitterLink?: string;
  youtubeLink?: string;
  instagramLink?: string;
};
