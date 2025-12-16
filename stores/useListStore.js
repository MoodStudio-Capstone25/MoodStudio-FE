import { create } from "zustand";

export const useListStore = create((set) => ({
  sortBy: "updated_at",
  sortDirection: "desc",
  setSortBy: (sortBy) => set({ sortBy }),
  setSortDirection: (sortDirection) => set({ sortDirection }),
}));
