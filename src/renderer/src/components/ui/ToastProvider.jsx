import React from "react";
import * as Toast from "@radix-ui/react-toast";
import { useStatus } from "../../hooks/useSettings";

//Under Construction
const ToastProvider = () => {
  const { toastMessage, toastType, isToastVisible, hideToast } = useStatus();

  return (
    <Toast.Provider swipeDirection="right">
      {isToastVisible && (
        <Toast.Root
          open={isToastVisible}
          onOpenChange={(open) => !open && hideToast()}
          className={`fixed bottom-4 right-4 max-w-sm p-4 rounded shadow-lg border flex items-center justify-between gap-4 ${
            toastType === "error"
              ? "bg-red-100 border-red-500 text-red-800"
              : "bg-green-100 border-borde  text-text"
          }`}
        >
          <div className="flex-1">
            <Toast.Title className="font-bold">{toastMessage}</Toast.Title>
          </div>
          <Toast.Close className="cursor-pointer font-bold">✕</Toast.Close>
        </Toast.Root>
      )}
      <Toast.Viewport className="fixed bottom-4 right-4 flex flex-col gap-2 max-w-sm z-50" />
    </Toast.Provider>
  );
};

export default ToastProvider;
