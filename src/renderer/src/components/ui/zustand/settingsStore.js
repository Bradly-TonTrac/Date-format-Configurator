import { create } from "zustand";

export const useStatusStore = create ((set) => ({

     isAdmin:false,
     isLoading:false,

     //Operating system info states
     osInfo:null,
     error:null,
     //Current settings states
      shortDate:null,
      longDate:null,
      lastRead:null,
     
     loadAdminStatus: async () =>{
        set({loading:true, error:null})
        try{
            const status = await window.api.getAdminStatus()
              set({isAdmin: status, loading:false})
           
        } catch(error){
            console.log("Error")
            set({loading:false})
        }
     },

     loadosInfomation: async () =>{
                set({loading:true, error:null})

                try{
                      const osStatus =  await window.api.getOSInfo()
                      set({osInfo:osStatus, loading:false})
                }catch(error){
                    set({loading:false})
                }


     },

     loadCurrentDateSettings: async () =>{
                        set({loading:true, error:null})
                        try{
                            const currentSettings = await window.api. getCurrentSettings()
                             set({shortDate:currentSettings.shortDate,
                                 longDate:currentSettings.longDate,
                                  lastRead: currentSettings.lastRead})
                        }catch{
                            set({loading:false})
                        }

     }

}))