import { ZodEmail, ZodObject } from "zod";

export default interface SignInViewProps {
  formSchema: SignInFormSchema;
  onSubmit: (values: SignInFormResult) => void;
}

export type SignInFormSchema = ZodObject<{ email: ZodEmail }>;

export type SignInFormResult = {
  email: string;
};
