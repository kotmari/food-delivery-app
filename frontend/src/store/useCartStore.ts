import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ICartItem, ICartState, IProduct } from "../types";


export const useCartStore = create<ICartState>()(
  persist(
    (set, get) => ({
      items: [],

addItem: (product: IProduct) => { 
  const { items } = get();
  const existingItem = items.find((item) => item.product.id === product.id);

if (existingItem) {
    const updatedItems = items.map((item) =>
      item.product.id === product.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    set({ items: updatedItems }); 
  } else {
       set({ items: [...items, { product, quantity: 1 }] as ICartItem[] });
  }
},

      removeItem: (productId) => set((state) => ({
        items: state.items.filter((item) => item.product.id !== productId)
      })),

      updateQuantity: (productId, delta) => set((state) => ({
        items: state.items.map((item) =>
          item.product.id === productId
            ? { ...item, quantity: Math.max(1, item.quantity + delta) }
            : item
        )
      })),

      clearCart: () => set({ items: [] }),

      getTotalPrice: () => {
        return get().items.reduce(
          (sum, item) => sum + item.product.price * item.quantity, 
          0
        );
      },
    }),
    { name: "shopping-cart" } 
  )
);