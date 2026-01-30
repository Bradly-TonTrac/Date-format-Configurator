import { useStatusStore } from "../components/ui/zustand/settingsStore";

export function useStatus() { 
   // UseStatusStore state variables
   const isAdmin = useStatusStore((state) => state.isAdmin)
   const isLoading = useStatusStore((state) => state.isLoading)
   const loadingAction = useStatusStore((state) => state.loadingAction)
   const loadAdminStatus = useStatusStore((state) => state.loadAdminStatus)

   // OS information
   const osInfo = useStatusStore((state) => state.osInfo)
   const getOSInfo = useStatusStore((state) => state.getOSInfo)

   // Current Settings hooks
   const shortDate = useStatusStore((state) => state.shortDate)
   const longDate = useStatusStore((state) => state.longDate)
   const lastRead = useStatusStore((state) => state.lastRead)
   const loadCurrentDateSettings = useStatusStore((state) => state.loadCurrentDateSettings)

   // Desired Settings
   const loadDesiredSettings = useStatusStore((state) => state.loadDesiredSettings)
   const desiredShortDate = useStatusStore((state) => state.desiredShortDate)
   const desiredLongDate = useStatusStore((state) => state.desiredLongDate)
   const shortPrev = useStatusStore((state) => state.shortPrev)
   const longPrev = useStatusStore((state) => state.longPrev)

   // Apply & Restore settings
   const applySettings = useStatusStore((state) => state.applySettings)
   const restoreSettings = useStatusStore((state) => state.restoreSettings)

   // Status checks
   const getSettingsStatus = useStatusStore((state) => state.getSettingsStatus)
   const reloadApp = useStatusStore((state) => state.reloadApp)
   const checkStatus = useStatusStore((state) => state.checkStatus)

   return {
      isAdmin,
      isLoading,
      loadingAction,
      loadAdminStatus,

      applySettings,
       restoreSettings,

      osInfo,
      getOSInfo,

      shortDate,
      longDate,
      lastRead,
      loadCurrentDateSettings,

      loadDesiredSettings,
      desiredShortDate,
      desiredLongDate,
      shortPrev,
      longPrev,

      reloadApp,
      getSettingsStatus,
      checkStatus,
   }
}
