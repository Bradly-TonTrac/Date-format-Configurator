import { useActionState } from "react";
import { useStatusStore } from "../components/ui/zustand/settingsStore";

export function useStatus() { 
  const isAdmin = useStatusStore((state) => state.isAdmin)
  const isLoading = useStatusStore((state) => state.isLoading)
  const loadAdminStatus = useStatusStore((state) => state.loadAdminStatus)
   const osInfo= useStatusStore((state) => state.osInfo)//OS
   const loadosInfomation = useStatusStore((state) => state.loadosInfomation)//OS
   const  shortDate = useStatusStore((state) => state.shortDate)//current Settings
   const longDate = useStatusStore((state) => state.longDate)
   const lastRead =useStatusStore((state) => state.lastRead)
   const loadCurrentDateSettings = useStatusStore((state) => state.loadCurrentDateSettings)
  return{isAdmin, isLoading, loadAdminStatus, osInfo, loadosInfomation, shortDate, longDate, lastRead, loadCurrentDateSettings}
}