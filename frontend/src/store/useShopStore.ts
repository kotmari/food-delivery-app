import { create } from "zustand";
import { api } from "../api/axios";
import type { IShop, IShopState } from "../types";

export const useShopStore = create<IShopState>()((set, get) => ({
  shops: [],
  activeRatingFilter: "all",
  selectedShopId: null,
  isLoading: false,
  error: null,

  fetchShops: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await api.get<IShop[]>("/shops");
      set({
        shops: data,
        isLoading: false,
        selectedShopId: data.length > 0 ? data[0].id : null,
      });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  setSelectedShop: (id: string) => set({ selectedShopId: id }),
  setRatingFilter: (range) => set({ activeRatingFilter: range }),
  getFilteredShops: () => {
    const { shops, activeRatingFilter } = get();

    if (activeRatingFilter === "all") return shops;

    return shops.filter((shop) => {
      const r = shop.rating;
      if (activeRatingFilter === "4-5") return r >= 4.0 && r <= 5.0;
      if (activeRatingFilter === "3-4") return r >= 3.0 && r < 4.0;
      if (activeRatingFilter === "2-3") return r >= 2.0 && r < 3.0;
      return true;
    });
  },
}));
