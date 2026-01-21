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

      //Desired settings states
      desiredShortDate:null,
      desiredLongDate:null,
       shortPrev:null,
        longPrev:null,
     
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
                            const currentSettings = await window.api.getCurrentSettings()
                             set({shortDate:currentSettings.shortDate,
                                longDate:currentSettings.longDate,
                                lastRead: currentSettings.lastRead})
                        }catch{
                            set({loading:false})
                        }

     },

     loadDesiredSettings: async () =>{
         set({loading:true, error:null})
           try{
                 const desiredSettings = await window.api.getDesiredSettings()
                 console.log(desiredSettings)
                    set({
                        desiredShortDate:desiredSettings.formats.shortDate,
                        desiredLongDate:desiredSettings.formats.longDate,
                           shortPrev: getPreview(desiredSettings.formats.shortDate),
                          longPrev: getPreview(desiredSettings.formats.longDate),
                       
                    })
           }catch(error){
                   set({loading:false})
     }
             
     }

}))