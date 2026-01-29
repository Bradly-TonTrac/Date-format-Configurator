import { create } from "zustand";



//Toast notifications
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
  canApply: false, //newly constructed

  //Minimize button
  hideToast: () => set({isToastVisible: false}),


  

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

  //Close window/App Button
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

  //Minimize button
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



//Make the app compare Reset and apply settings
getSettingsStatus: async () => {
  const applied = await window.api.getSettingsStatus();
   //set({hasApplied: applied || false})
   return applied;

},

// Apply Button 
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

// Restore settings button
restoreSettings: async () => {
  set({ isLoading: true, loadingAction: "restore" });
  const addToast = useToastStore.getState().addToast;

  try {
    await window.api.restoreSettings();
    const currentSettings = await window.api.getCurrentSettings();
    
    set({
      shortDate: currentSettings.shortDate,
      longDate: currentSettings.longDate,
      lastRead: currentSettings.lastRead,
      //hasApplied: false, // re-enables Apply button
    });

    addToast("Prev Settings restored successfully", "success");

  } catch (error) {
    addToast("Failed to restore settings", "error");

  } finally {
    set({ isLoading: false, loadingAction: null });
  }
},


//Admin and non admin status checks 
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

  //In replacement of LoadOS information
  getOSInfo: async () => {
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
