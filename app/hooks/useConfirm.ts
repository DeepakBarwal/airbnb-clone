import { useState } from "react";

interface useConfirmationProps {
  onCancel?: () => void;
  onConfirm?: () => void;
}

const useConfirmation = (props: useConfirmationProps) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const confirm = () => {
    setShowConfirm(true);
  };

  const handleClose = () => {
    setShowConfirm(false);
    if (props?.onCancel && typeof props.onCancel === "function") {
      props.onCancel();
    }
  };

  const handleConfirm = () => {
    setShowConfirm(false);
    if (props?.onConfirm && typeof props.onConfirm === "function") {
      props.onConfirm();
    }
  };

  return { showConfirm, confirm, handleClose, handleConfirm };
};

export default useConfirmation;
