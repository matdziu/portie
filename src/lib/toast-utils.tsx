import ErrorToastView from "@/components/toasts/error-toast-view";
import SuccessToastView from "@/components/toasts/success-toast-view";
import "client-only";
import { toast } from "sonner";

export function errorToast(title: string) {
  toast(<ErrorToastView title={title} />);
}

export function successToast(title: string) {
  toast(<SuccessToastView title={title} />);
}
