import { create } from "zustand";

/* ---------------------------------------------------------------------------
  Toast Store
  Manages toast notifications
---------------------------------------------------------------------------- */
export const useToastStore = create((set) => ({
  toastList: [],

  addToast: (message, type = "info") => {
    if (!message || typeof message !== "string") return;
    const newToast = { id: Date.now(), message: message.slice(0, 200), type };
    set((state) => ({ toastList: [...state.toastList, newToast] }));
  },

  removeToast: (id) =>
    set((state) => ({ toastList: state.toastList.filter((t) => t.id !== id) })),
}));

/* ---------------------------------------------------------------------------
  Helper: Generate preview for date formats
---------------------------------------------------------------------------- */
function getPreview(format) {
  const now = new Date();
  if (!format || typeof format !== "string") return "";

  switch (format) {
    case "dd MMM yy":
      return now.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "2-digit" });
    case "dd MMMM yyyy":
      return now.toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" });
    default:
      return format;
  }
}

/* ---------------------------------------------------------------------------
  Status Store
  Manages UI state, settings, OS info, admin status, async operations
---------------------------------------------------------------------------- */
export const useStatusStore = create((set, get) => ({
  // UI & Global States
  isAdmin: false,
  isLoading: false,
  loadingAction: null,
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

  /* -------------------------------------------------------------------------
    Async action wrapper
  ------------------------------------------------------------------------- */
  asyncAction: async (actionName, actionFn, options = {}) => {
    const { successMsg, errorMsg, showToast = true } = options;
    const addToast = showToast ? useToastStore.getState().addToast : null;

    set({ isLoading: true, loadingAction: actionName, error: null });

    try {
      const result = await actionFn();
      if (showToast && successMsg && addToast) addToast(successMsg, "success");
      return result;
    } catch (error) {
      if (showToast && errorMsg && addToast) addToast(errorMsg, "error");
      set({ error: error?.message || "Unexpected error" });
      throw error;
    } finally {
      set({ isLoading: false, loadingAction: null });
    }
  },

  // App Control Functions
  reloadApp: async () =>
    get().asyncAction("exit", () => window.api.reloadApp(), {
      successMsg: "Application reloading...",
      errorMsg: "Failed to reload application",
    }),

  checkStatus: async () =>
    get().asyncAction("checkStatus", () => window.api.getSettingsStatus()),

  getSettingsStatus: async () => window.api.getSettingsStatus(),

  // Settings Operations
  applySettings: async () =>
    get().asyncAction("apply", async () => {
      const response = await window.api.applySettings();
      if (!response || response.success === false) throw new Error(response?.message || "Failed to apply settings");
      return response;
    }, {
      successMsg: "Settings applied successfully",
      errorMsg: "Failed to apply settings",
    }),

  restoreSettings: async () =>
    get().asyncAction("restore", async () => {
      const response = await window.api.restoreSettings();
      if (!response || response.success === false) throw new Error(response?.message || "Failed to restore settings");

      const currentSettings = await window.api.getCurrentSettings();
      set({
        shortDate: currentSettings.shortDate,
        longDate: currentSettings.longDate,
        lastRead: currentSettings.readTime,
      });
      return response;
    }, {
      successMsg: "Previous settings restored successfully",
      errorMsg: "Failed to restore settings",
    }),

  // Admin & OS
  loadAdminStatus: async () =>
    get().asyncAction("loadAdminStatus", async () => {
      const status = await window.api.getAdminStatus();
      set({ isAdmin: status });
    }),

  getOSInfo: async () =>
    get().asyncAction("getOSInfo", async () => {
      const osStatus = await window.api.getOSInfo();
      set({ osInfo: osStatus });
    }),

  // Load Settings
  loadCurrentDateSettings: async () =>
    get().asyncAction("loadCurrentDateSettings", async () => {
      const settings = await window.api.getCurrentSettings();
      set({
        shortDate: settings.shortDate,
        longDate: settings.longDate,
        lastRead: settings.readTime,
      });
    }),

  loadDesiredSettings: async () =>
    get().asyncAction("loadDesiredSettings", async () => {
      const settings = await window.api.getDesiredSettings();
      set({
        desiredShortDate: settings.formats.shortDate,
        desiredLongDate: settings.formats.longDate,
        shortPrev: getPreview(settings.formats.shortDate),
        longPrev: getPreview(settings.formats.longDate),
      });
    }),
}));
