import { cn } from "@/lib/utils";
import { Spinner } from "../ui/shadcn-io/spinner";
import { DefaultSpinnerViewProps } from "./models/default-spinner-view-props";

export default function DefaultSpinnerView({
  isBlocking = true,
}: DefaultSpinnerViewProps) {
  return (
    <div
      className={cn(
        "absolute w-full h-full inset-0 flex items-center justify-center z-50",
        {
          "pointer-events-none": !isBlocking,
        }
      )}
    >
      <Spinner variant="pinwheel" className="text-primary" size={64} />
    </div>
  );
}
