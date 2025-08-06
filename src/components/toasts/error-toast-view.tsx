import { AlertCircleIcon } from "lucide-react";
import ToastViewProps from "./models/toast-view-props";

export default function ErrorToastView({ title }: ToastViewProps) {
  return (
    <div className="flex items-center justify-center gap-2">
      <AlertCircleIcon className="text-destructive" />
      <span className="text-destructive">{title}</span>
    </div>
  );
}
