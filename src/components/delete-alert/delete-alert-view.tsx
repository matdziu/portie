"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { errorToast, successToast } from "@/lib/toast-utils";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import DefaultSpinnerView from "../default-spinner/default-spinner-view";
import { buttonVariants } from "../ui/button";
import DeleteAlertViewProps from "./models/delete-alert-view-props";

export default function DeleteAlertView({
  isOpen,
  setIsOpen,
  onDeletionConfirmed,
  isPending,
  showSuccessToast,
  showErrorToast,
  successfulDeletionToastText,
  deletionErrorToastText,
  titleText,
  descriptionText,
  negativeButtonText,
  positiveButtonText,
  afterSuccessRoute,
}: DeleteAlertViewProps) {
  const router = useRouter();

  useEffect(() => {
    if (showSuccessToast && !isPending) {
      successToast(successfulDeletionToastText);
      router.push(afterSuccessRoute);
    }
  }, [
    showSuccessToast,
    isPending,
    router,
    successfulDeletionToastText,
    afterSuccessRoute,
  ]);

  useEffect(() => {
    if (showErrorToast && !isPending) {
      errorToast(deletionErrorToastText);
    }
  }, [showErrorToast, isPending, deletionErrorToastText]);
  return (
    <div>
      {isPending && <DefaultSpinnerView />}
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{titleText}</AlertDialogTitle>
            <AlertDialogDescription>{descriptionText}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsOpen(false)}>
              {negativeButtonText}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                setIsOpen(false);
                onDeletionConfirmed();
              }}
              className={buttonVariants({ variant: "destructive" })}
            >
              {positiveButtonText}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
