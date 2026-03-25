import { create } from "zustand";

export const useFilterStore = create((set) => ({
  filter: "all",
  setFilter: (newFilter) => set({ filter: newFilter })
}));