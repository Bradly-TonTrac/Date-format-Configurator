import React, { useEffect, useState } from "react";
import { useToastStore } from "./zustand/settingsStore";

/*
  ToastProvider
  Displays all toast notifications from Zustand store.
 */
const ToastProvider = () => {
  const toastList = useToastStore((state) => state.toastList);
  const removeToast = useToastStore((state) => state.removeToast);

  return (
    <div className="absolute top-[80px] left-0 w-full flex flex-col items-center gap-2 z-50 pointer-events-none">
      {toastList.map((toast) => (
        <ToastItem key={toast.id} toast={toast} removeToast={removeToast} />
      ))}
    </div>
  );
};

/*
  ToastItem
  Individual toast notification.
  Handles auto-dismiss and smooth enter/exit animations.
 */
const ToastItem = ({ toast, removeToast }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Hide toast after 1 second
    const hideTimer = setTimeout(() => setVisible(false), 1000);

    // Remove toast from Zustand after animation completes
    const removeTimer = setTimeout(() => removeToast(toast.id), 1100);

    // Cleanup timers to prevent memory leaks
    return () => {
      clearTimeout(hideTimer);
      clearTimeout(removeTimer);
    };
  }, [toast.id, removeToast]);

  return (
    <div
      className={`pointer-events-auto px-4 py-2 font-bold flex border border-border items-center gap-2 rounded shadow-lg transition-all duration-300 ease-in-out transform ${
        toast.type === "success"
          ? "bg-background-light text-success"
          : "bg-background-light text-destructive"
      } ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}
    >
      {toast.message}
    </div>
  );
};

export default ToastProvider;
