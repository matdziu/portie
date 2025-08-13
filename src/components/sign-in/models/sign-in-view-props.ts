import { ZodType } from "zod";

export interface SignInViewProps {
  formSchema: ZodType<SignInFormSchema, SignInFormSchema>;
  onEmailSubmit: (formData: SignInFormSchema) => void;
  onGithubLoginSubmit: () => void;
  onGoogleLoginSubmit: () => void;
  progress: boolean;
  emailSubmitSuccess: boolean;
  error: boolean;
}

export type SignInFormSchema = {
  email: string;
};
