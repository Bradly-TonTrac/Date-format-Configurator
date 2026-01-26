import React, { useEffect, useState } from "react";
import { useToastStore } from "./zustand/settingsStore";

const ToastProvider = () => {
  const toastList = useToastStore((state) => state.toastList);
  const removeToast = useToastStore((state) => state.removeToast);
  const [visibleToasts, setVisibleToasts] = useState([]);

  // Sync with Zustand
  useEffect(() => {
    setVisibleToasts(toastList);
  }, [toastList]);

  return (
    <div className="absolute top-[80px] left-0 w-full flex flex-col items-center gap-2 z-50 pointer-events-none">
      {visibleToasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} removeToast={removeToast} />
      ))}
    </div>
  );
};

const ToastItem = ({ toast, removeToast }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false); // trigger fade out
      setTimeout(() => removeToast(toast.id), 300); // remove from store after fade
    }, 4000); // 4 seconds

    return () => clearTimeout(timer);
  }, [toast, removeToast]);

  return (
    <div
      className={`pointer-events-auto px-4 py-2 rounded shadow-lg text-primary transition-all duration-300 ease-in-out transform ${
        toast.type === "success" ? "bg-background" : "bg-background-light"
      } ${show ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}
    >
      {toast.message}
      <button onClick={() => removeToast(toast.id)} className="ml-2 font-bold">
        ✖
      </button>
    </div>
  );
};

export default ToastProvider;
