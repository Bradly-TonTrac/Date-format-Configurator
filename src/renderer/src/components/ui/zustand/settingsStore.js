import { create } from "zustand";

// Toast notifications
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

// Preview helper
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

export const useStatusStore = create((set) => ({
  // Basic states
  isAdmin: false,
  isLoading: false,
  loadingAction: null,
  hasApplied: false,
  canApply: false, // newly constructed

  // Toast visibility
  hideToast: () => set({ isToastVisible: false }),

  // OS info
  osInfo: null,
  error: null, // only used for admin/OS checks

  // Current settings
  shortDate: null,
  longDate: null,
  lastRead: null,

  // Desired settings
  desiredShortDate: null,
  desiredLongDate: null,
  shortPrev: null,
  longPrev: null,

  // Auto reload app
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

  // Settings status
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

  // Window controls
  getWindowExit: async () => {
    set({ isLoading: true, loadingAction: "exit" });
    try {
      await window.api.getWindowExit();
    } catch (error) {
      console.error(error);
    } finally {
      set({ isLoading: false, loadingAction: null });
    }
  },
  getWindowMin: async () => {
    set({ isLoading: true, loadingAction: "exit" });
    try {
      await window.api.getWindowMin();
    } catch (error) {
      console.error(error);
    } finally {
      set({ isLoading: false, loadingAction: null });
    }
  },

  // Settings comparison
  getSettingsStatus: async () => {
    const applied = await window.api.getSettingsStatus();
    // set({hasApplied: applied || false}) // optional check
    return applied;
  },

  // Apply & restore settings
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
        // hasApplied: false, // optional to re-enable Apply
      });
      addToast("Prev Settings restored successfully", "success");
    } catch (error) {
      addToast("Failed to restore settings", "error");
    } finally {
      set({ isLoading: false, loadingAction: null });
    }
  },

  // Admin & OS checks
  loadAdminStatus: async () => {
    set({ loading: true, error: null });
    try {
      const status = await window.api.getAdminStatus();
      set({ isAdmin: status, loading: false });
    } catch (error) {
      console.log("Error"); // consider logging real error
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

  // Load current & desired settings
  loadCurrentDateSettings: async () => {
    set({ loading: true, error: null });
    try {
      const currentSettings = await window.api.getCurrentSettings();
      set({
        shortDate: currentSettings.shortDate,
        longDate: currentSettings.longDate,
        lastRead: currentSettings.readTime, // sanity check: readTime vs lastRead
      });
    } catch {
      set({ loading: false });
    }
  },
  loadDesiredSettings: async () => {
    set({ loading: true, error: null });
    try {
      const desiredSettings = await window.api.getDesiredSettings();
      console.log(desiredSettings); // optional debug, safe to remove in prod
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
