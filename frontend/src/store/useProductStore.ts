import { create } from "zustand";
import type { ICategory, IProduct, IProductState } from "../types";
import { api } from "../api/axios";

export const useProductStore = create<IProductState>()((set, get) => ({
  products: [],
  categories: [],
  currentProduct: null,
  activeCategoryId: undefined,
  sortBy: "name-asc",
  isLoading: false,
  error: null,

  fetchCategories: async () => {
    try {
      const { data } = await api.get<ICategory[]>("/categories");
      set({ categories: data });
    } catch (err: any) {
      console.error("Categories fetch error", err);
    }
  },

  fetchProducts: async (shopId: string) => {
    const { activeCategoryId, sortBy } = get();
    set({ isLoading: true, error: null });
    try {
      const { data } = await api.get<IProduct[]>(`/products/shop/${shopId}`, {
        params: {
          categoryId: activeCategoryId,
          sortBy: sortBy,
        },
      });
      set({
        products: data,
        isLoading: false,
      });
    } catch (err: any) {
      set({
        products: [],
        error: err.response?.status === 404 ? null : err.message,
        isLoading: false,
      });
    }
  },
  fetchProductById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await api.get<IProduct>(`/products/${id}`);
      set({ currentProduct: data, isLoading: false });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },

  setCategory: (shopId, catId) => {
    set({ activeCategoryId: catId });
    get().fetchProducts(shopId);
  },

  setSortBy: (shopId, option) => {
    set({ sortBy: option });
    get().fetchProducts(shopId);
  },
}));
