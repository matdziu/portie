import { ZodType } from "zod";

export interface SignInViewProps {
  formSchema: ZodType<SignInFormSchema, SignInFormSchema>;
  onSubmit: (formData: SignInFormSchema) => void;
  progress: boolean;
  success: boolean;
  error: boolean;
}

export type SignInFormSchema = {
  email: string;
};
