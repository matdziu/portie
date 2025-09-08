export default interface DeleteAlertViewProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onDeletionConfirmed: () => void;
  isPending: boolean;
  showSuccessToast: boolean;
  showErrorToast: boolean;
  successfulDeletionToastText: string;
  deletionErrorToastText: string;
  titleText: string;
  descriptionText: string;
  negativeButtonText: string;
  positiveButtonText: string;
  afterSuccessRoute: string;
}
