import { create } from "zustand";

function getPreview(format) {
  const now = new Date();
  switch (format) {
    case "dd MMM yy":
      return now.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "2-digit" });
    case "dd MMMM yyyy":
      return now.toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" });
    default:
      return "";
  }
}

export const useStatusStore = create((set) => ({
  isAdmin: false,
  isLoading: false,
  loadingAction: null,
  hasApplied: false,

  // Operating system info
  osInfo: null,
  error: null,

  // Current settings
  shortDate: null,
  longDate: null,
  lastRead: null,

  // Desired settings
  desiredShortDate: null,
  desiredLongDate: null,
  shortPrev: null,
  longPrev: null,

  // Window Operation Buttons
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

  getDiagnostics: async () => {
    set({ isLoading: true, loadingAction: "diagnostics" });
    try {
      await window.api.getDiagnostics();
    } catch (error) {
      console.error(error);
    } finally {
      set({ isLoading: false, loadingAction: null });
    }
  },

  applySettings: async () => {
    set({ isLoading: true, loadingAction: "apply" });
    try {
      await window.api.applySettings();
      set({ hasApplied: true });
    } catch (error) {
      console.error(error);
    } finally {
      set({ isLoading: false, loadingAction: null });
    }
  },

  restoreSettings: async () => {
    set({ isLoading: true, loadingAction: "restore" });
    try {
      set({ hasApplied: false });
      await window.api.restoreSettings();
      const currentSettings = await window.api.getCurrentSettings();
      set({
        shortDate: currentSettings.shortDate,
        longDate: currentSettings.longDate,
        lastRead: currentSettings.lastRead,
      });
    } catch (error) {
      console.error(error);
    } finally {
      set({ isLoading: false, loadingAction: null });
    }
  },

  loadAdminStatus: async () => {
    set({ loading: true, error: null });
    try {
      const status = await window.api.getAdminStatus();
      set({ isAdmin: status, loading: false });
    } catch (error) {
      console.log("Error");
      set({ loading: false });
    }
  },

  loadosInfomation: async () => {
    set({ loading: true, error: null });
    try {
      const osStatus = await window.api.getOSInfo();
      set({ osInfo: osStatus, loading: false });
    } catch (error) {
      set({ loading: false });
    }
  },

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
      console.log(desiredSettings);
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
