import { useStatusStore } from "../components/ui/zustand/settingsStore";

export function useStatus() {
  const store = useStatusStore();

  return {
    // Admin & Loading States
    isAdmin: store.isAdmin,
    isLoading: store.isLoading,
    loadingAction: store.loadingAction,
    loadAdminStatus: store.loadAdminStatus,

    // Toast & Status
    applySettings: store.applySettings,
    restoreSettings: store.restoreSettings,

    // OS Information
    osInfo: store.osInfo,
    getOSInfo: store.getOSInfo,

    // Current Settings
    shortDate: store.shortDate,
    longDate: store.longDate,
    lastRead: store.lastRead,
    loadCurrentDateSettings: store.loadCurrentDateSettings,

    // Desired Settings
    loadDesiredSettings: store.loadDesiredSettings,
    desiredShortDate: store.desiredShortDate,
    desiredLongDate: store.desiredLongDate,
    shortPrev: store.shortPrev,
    longPrev: store.longPrev,

    // App Controls
    reloadApp: store.reloadApp,
    getSettingsStatus: store.getSettingsStatus,
    checkStatus: store.checkStatus,
  };
}
