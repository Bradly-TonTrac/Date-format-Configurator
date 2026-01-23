import { useActionState } from "react";
import { useStatusStore } from "../components/ui/zustand/settingsStore";

export function useStatus() { 

   //USe status
   const isAdmin = useStatusStore((state) => state.isAdmin)
   const isLoading = useStatusStore((state) => state.isLoading)
   const loadAdminStatus = useStatusStore((state) => state.loadAdminStatus)

   //Os information hoocks still under useStatus
   const osInfo= useStatusStore((state) => state.osInfo)
   const loadosInfomation = useStatusStore((state) => state.loadosInfomation)

   //Current Settings hoocks
   const  shortDate = useStatusStore((state) => state.shortDate)
   const longDate = useStatusStore((state) => state.longDate)
   const lastRead =useStatusStore((state) => state.lastRead)
   const loadCurrentDateSettings = useStatusStore((state) => state.loadCurrentDateSettings)


   //Desired Settings side.
   const loadDesiredSettings = useStatusStore((state) => state.loadDesiredSettings)
   const desiredShortDate = useStatusStore((state) => state.desiredShortDate)
   const desiredLongDate = useStatusStore((state) => state.desiredLongDate)
   const shortPrev = useStatusStore((state) => state.shortPrev )
   const longPrev = useStatusStore((state)=> state.longPrev)

   //Apply Button state
   const applySettings = useStatusStore ((state) => state.applySettings)

   //Restore settings button
   const restoreSettings = useStatusStore ((state) => state.restoreSettings)

   return{isAdmin, isLoading, loadAdminStatus, osInfo, loadosInfomation, shortDate, longDate, lastRead, loadCurrentDateSettings,loadDesiredSettings,
    desiredShortDate,
    desiredLongDate,
    shortPrev,longPrev,
     applySettings, 
      restoreSettings
 }
}