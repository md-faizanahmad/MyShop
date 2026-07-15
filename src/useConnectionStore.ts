import { create } from "zustand";

interface ConnectionStore {
  isConnected: boolean;
  setConnected: (connected: boolean) => void;
}

export const useConnectionStore = create<ConnectionStore>((set) => ({
  isConnected: navigator.onLine,

  setConnected: (connected) => {
    set((state) =>
      state.isConnected === connected ? state : { isConnected: connected },
    );
  },
}));
