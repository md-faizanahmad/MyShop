import { create } from "zustand";

interface ConnectionState {
  connected: boolean;
  setConnected: (value: boolean) => void;
}

export const useConnectionStore = create<ConnectionState>((set) => ({
  connected: true,
  setConnected: (value) => set({ connected: value }),
}));
