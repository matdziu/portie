import { Info } from "lucide-react";
import { ToastViewProps } from "./models/toast-view-props";

export default function InfoToastView({ title }: ToastViewProps) {
  return (
    <div className="flex items-center justify-center gap-2">
      <Info className="text-primary-foreground" />
      <span className="text-primary-foreground">{title}</span>
    </div>
  );
}
