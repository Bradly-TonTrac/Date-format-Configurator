import { useActionState } from "react";
import { useStatusStore } from "../components/ui/zustand/settingsStore";
//import { stat } from "original-fs";

export function useStatus() { 


   //Toast notifications
   const  toastMessage = useStatusStore((state) => state.toastMessage)
   const  toastType =  useStatusStore((state) => state.toastType)
   const  isToastVisible = useStatusStore((state)=> state. isToastVisible)
   const hideToast = useStatusStore((state) => state.hideToast)

   //USe status
   const isAdmin = useStatusStore((state) => state.isAdmin)
   const isLoading = useStatusStore((state) => state.isLoading)
   const loadingAction = useStatusStore((state) => state.loadingAction)
   const  hasApplied = useStatusStore((state)=> state.hasApplied)
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
   const canApply = useStatusStore ((state)=> state.canApply)

   //CopyDX button
   const  getDiagnostics = useStatusStore ((state) => state.getDiagnostics)
   const isCopied = useStatusStore ((state) => state.isCopied)
  // const  copyToClipboard = useStatusStore ((state) => state.copyToClipboard)

   //Close App Btn
   const getWindowExit = useStatusStore ((state) =>state.getWindowExit)


   //Minimize Btn
   const getWindowMin = useStatusStore ((state) =>state.getWindowMin)

   return{isAdmin,
       isLoading,
       loadAdminStatus,
       osInfo, 
      loadosInfomation, 
      shortDate, 
      longDate, 
      lastRead, 
      loadCurrentDateSettings,
      loadDesiredSettings,
    desiredShortDate,
    desiredLongDate,
    shortPrev,longPrev,
     applySettings, 
     restoreSettings,
    getDiagnostics,
     getWindowExit,
     loadingAction,
     hasApplied,
     canApply,
     isCopied,
      //copyToClipboard,
   


     //Toasts 
  toastMessage,
  toastType,
  isToastVisible,
  hideToast,
  getWindowMin

 }
}