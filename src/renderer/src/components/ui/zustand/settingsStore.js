import { create } from "zustand";
/*
  Toast Store
  Manages toast notifications across the application.
 */
export const useToastStore = create((set) => ({
  toastList: [],

  addToast: (message, type = "info") =>
    set((state) => ({
      toastList: [...state.toastList, { id: Date.now(), message, type }],
    })),

  removeToast: (id) =>
    set((state) => ({
      toastList: state.toastList.filter((t) => t.id !== id),
    })),
}));
/*
 Preview Helper
 Converts a date format string to a human-readable preview
 */
function getPreview(format) {
  const now = new Date();

  switch (format) {
    case "dd MMM yy":
      return now.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "2-digit",
      });
    case "dd MMMM yyyy":
      return now.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
    default:
      return "";
  }
}

/*
  Status Store
  Manages application state: current & desired settings, OS info, admin status, UI flags, and async operations.
 */
export const useStatusStore = create((set) => ({
  // Basic UI States
  isAdmin: false,
  isLoading: false,
  loadingAction: null,
  isToastVisible: false,
  osInfo: null,
  error: null,

  // Current Settings
  shortDate: null,
  longDate: null,
  lastRead: null,

  // Desired Settings
  desiredShortDate: null,
  desiredLongDate: null,
  shortPrev: null,
  longPrev: null,

  // Toast control
  hideToast: () => set({ isToastVisible: false }),

  // =========================
  // App Control Functions
  // =========================

  reloadApp: async () => {
    set({ isLoading: true, loadingAction: "exit" });
    try {
      await window.api.reloadApp();
    } catch (error) {
      console.error(error);
    } finally {
      set({ isLoading: false, loadingAction: null });
    }
  },

  checkStatus: async () => {
    set({ isLoading: true, loadingAction: "exit" });
    try {
      return await window.api.getSettingsStatus();
    } catch (error) {
      console.error(error);
    } finally {
      set({ isLoading: false, loadingAction: null });
    }
  },

  getSettingsStatus: async () => {
    return await window.api.getSettingsStatus();
  },

  // =========================
  // Settings Operations
  // =========================

  applySettings: async () => {
    set({ isLoading: true, loadingAction: "apply" });
    const addToast = useToastStore.getState().addToast;

    try {
      await window.api.applySettings();
      addToast("Settings applied successfully", "success");
    } catch (error) {
      addToast("Failed to apply settings", "error");
    } finally {
      set({ isLoading: false, loadingAction: null });
    }
  },

  restoreSettings: async () => {
    set({ isLoading: true, loadingAction: "restore" });
    const addToast = useToastStore.getState().addToast;

    try {
      const currentSettings = await window.api.getCurrentSettings();
      set({
        shortDate: currentSettings.shortDate,
        longDate: currentSettings.longDate,
        lastRead: currentSettings.lastRead,
      });
      addToast("Prev Settings restored successfully", "success");
    } catch (error) {
      addToast("Failed to restore settings", "error");
    } finally {
      set({ isLoading: false, loadingAction: null });
    }
  },

  // =========================
  // Admin & OS Checks
  // =========================

  loadAdminStatus: async () => {
    set({ loading: true, error: null });
    try {
      const status = await window.api.getAdminStatus();
      set({ isAdmin: status, loading: false });
    } catch (error) {
      console.error(error);
      set({ loading: false });
    }
  },

  getOSInfo: async () => {
    set({ loading: true, error: null });
    try {
      const osStatus = await window.api.getOSInfo();
      set({ osInfo: osStatus, loading: false });
    } catch (error) {
      set({ loading: false });
    }
  },

  // =========================
  // Load Settings from Backend
  // =========================

  loadCurrentDateSettings: async () => {
    set({ loading: true, error: null });
    try {
      const currentSettings = await window.api.getCurrentSettings();
      set({
        shortDate: currentSettings.shortDate,
        longDate: currentSettings.longDate,
        lastRead: currentSettings.readTime,
      });
    } catch {
      set({ loading: false });
    }
  },

  loadDesiredSettings: async () => {
    set({ loading: true, error: null });
    try {
      const desiredSettings = await window.api.getDesiredSettings();
      set({
        desiredShortDate: desiredSettings.formats.shortDate,
        desiredLongDate: desiredSettings.formats.longDate,
        shortPrev: getPreview(desiredSettings.formats.shortDate),
        longPrev: getPreview(desiredSettings.formats.longDate),
      });
    } catch (error) {
      set({ loading: false });
    }
  },
}));
