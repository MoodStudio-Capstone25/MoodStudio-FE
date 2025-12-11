import { create } from "zustand";

export const useListStore = create((set) => ({
  sortBy: "modifiedAt",
  sortDirection: "desc",
  setSortBy: (sortBy) => set({ sortBy }),
  setSortDirection: (sortDirection) => set({ sortDirection }),
}));
