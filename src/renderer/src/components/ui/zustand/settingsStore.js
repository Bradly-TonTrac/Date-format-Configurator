import { create } from "zustand";

/**
 * Toast Store
 * Manages toast notifications across the application.
 */
export const useToastStore = create((set) => ({
  toastList: [],

  /**
   * Add a toast notification
   * @param {string} message - Toast message
   * @param {string} type - Toast type ('info', 'success', 'error')
   */
  addToast: (message, type = "info") =>
    set((state) => ({
      toastList: [...state.toastList, { id: Date.now(), message, type }],
    })),

  /**
   * Remove a toast notification by ID
   */
  removeToast: (id) =>
    set((state) => ({
      toastList: state.toastList.filter((t) => t.id !== id),
    })),
}));

/**
 * Preview Helper
 * Converts a date format string to a human-readable preview
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

/**
 * Status Store
 * Manages application state: current & desired settings, OS info, admin status, UI flags, and async operations.
 */
export const useStatusStore = create((set) => ({
  // =========================
  // Basic UI States
  // =========================
  isAdmin: false,
  isLoading: false,
  loadingAction: null,
  hasApplied: false,
  canApply: false, // computed later for Apply button
  isToastVisible: false, // used for toast visibility

  // =========================
  // Toast control
  // =========================
  hideToast: () => set({ isToastVisible: false }),

  // =========================
  // OS Info & Errors
  // =========================
  osInfo: null,
  error: null, // stores error info for admin/OS operations

  // =========================
  // Current Settings
  // =========================
  shortDate: null,
  longDate: null,
  lastRead: null, // last time settings were read

  // =========================
  // Desired Settings
  // =========================
  desiredShortDate: null,
  desiredLongDate: null,
  shortPrev: null,
  longPrev: null,

  // =========================
  // App Control Functions
  // =========================

  /**
   * Reloads the entire application
   */
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

  /**
   * Checks if settings have been applied (used for Apply/Reset logic)
   */
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

  /**
   * Close or exit application window
   */
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


  //Minimize application window
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

  
  //Get current settings status from backend
  getSettingsStatus: async () => {
    const applied = await window.api.getSettingsStatus();
    return applied;
  },

  // =========================
  // Settings Operations
  // =========================

  //Apply current desired settings
  applySettings: async () => {
    set({ isLoading: true, loadingAction: "apply" });
    const addToast = useToastStore.getState().addToast;

    try {
      const response = await window.api.applySettings();
      if (response && response.success === false) {
        throw new Error(response.message || "Failed to apply settings");
      }
      addToast("Settings applied successfully", "success");
      return response;
    } catch (error) {
      addToast("Failed to apply settings", "error");
      throw error;
    } finally {
      set({ isLoading: false, loadingAction: null });
    }
  },

  
  // Restore previous/current settings
  restoreSettings: async () => {
    set({ isLoading: true, loadingAction: "restore" });
    const addToast = useToastStore.getState().addToast;

    try {
      const response = await window.api.restoreSettings();
      if (response && response.success === false) {
        throw new Error(response.message || "Failed to restore settings");
      }
      const currentSettings = await window.api.getCurrentSettings();
      set({
        shortDate: currentSettings.shortDate,
        longDate: currentSettings.longDate,
        lastRead: currentSettings.readTime,
      });
      addToast("Prev Settings restored successfully", "success");
      return response;
    } catch (error) {
      addToast("Failed to restore settings", "error");
      throw error;
    } finally {
      set({ isLoading: false, loadingAction: null });
    }
  },

  // =========================
  // Admin & OS Checks
  // =========================

  
  // Load admin status from backend
  loadAdminStatus: async () => {
    set({ loading: true, error: null });
    try {
      const status = await window.api.getAdminStatus();
      set({ isAdmin: status, loading: false });
    } catch (error) {
      console.error(error); // log real error for debugging
      set({ loading: false });
    }
  },

  
  //Load operating system info
  getOSInfo: async () => {
    set({ loading: true, error: null });
    try {
      const osStatus = await window.api.getOSInfo();
      set({ osInfo: osStatus, loading: false });
    } catch (error) {
      set({ loading: false });
    }
  },

  //=========================
  // Load Settings from Backend
  // =========================

  
  //Load current date settings from backend
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

  
  // Load desired settings from backend and compute previews
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
