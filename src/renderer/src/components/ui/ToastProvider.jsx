import { useEffect, useState } from "react";
import { useToastStore } from "./zustand/settingsStore";

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

const ToastItem = ({ toast, removeToast }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const hideTimer = setTimeout(() => setVisible(false), 1000);
    const removeTimer = setTimeout(() => removeToast(toast.id), 1100);

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(removeTimer);
    };
  }, [toast.id, removeToast]);

  return (
    <div
      className={`pointer-events-auto px-4 py-2 font-bold flex items-center gap-2 border border-border rounded shadow-lg transition-all duration-300 ease-in-out transform ${
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
