import { ZodType } from "zod";

export default interface SignInViewProps {
  formSchema: ZodType<SignInFormSchema, SignInFormSchema>;
  onSubmit: (values: SignInFormSchema) => void;
}

export type SignInFormSchema = {
  email: string;
};
