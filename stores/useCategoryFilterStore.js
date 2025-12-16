import { create } from "zustand";

export const useCategoryFilterStore = create((set, get) => ({
  selectedCategoryIds: ["all"],

  setSelectedCategoryIds: (ids) => set({ selectedCategoryIds: ids }),

  toggleCategory: (id) => {
    const { selectedCategoryIds } = get();

    if (id === "all") {
      set({ selectedCategoryIds: ["all"] });
      return;
    }

    const isSelected = selectedCategoryIds.includes(id);

    const base = selectedCategoryIds.filter((x) => x !== "all");

    if (isSelected) {
      const next = base.filter((x) => x !== id);
      set({ selectedCategoryIds: next.length ? next : ["all"] });
    } else {
      set({ selectedCategoryIds: [...base, id] });
    }
  },

  isAllSelected: () => get().selectedCategoryIds.includes("all"),
}));
