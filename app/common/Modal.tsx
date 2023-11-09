import clsx from "clsx";

const Modal = ({ children, isOpen, onClose }) => {
  const modalClasses = clsx(
    "fixed top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full justify-center items-center bg-black bg-opacity-50",
    isOpen ? "flex" : "hidden"
  );

  return (
    <div
      id="popup-modal"
      tabIndex={-1}
      className={modalClasses}
      onClick={onClose}
    >
      <div className="relative w-full max-w-md max-h-full">
        <div
          className="relative bg-white rounded-lg shadow dark:bg-gray-700"
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
