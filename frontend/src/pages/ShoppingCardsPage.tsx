import { useEffect } from "react";
import { ProductCard } from "../components/ProductCard";

import { useProductStore } from "../store/useProductStore";
import { useShopStore } from "../store/useShopStore";
import { TagBadge } from "../components/ui-components/TagBadge";

export const ShoppingCardsPage = () => {
  const {
    products,
    isLoading,
    categories,
    activeCategoryId,
    setSortBy,
    error,
    setCategory,
    sortBy,
    fetchCategories,
    fetchProducts,
  } = useProductStore();
  const { selectedShopId } = useShopStore();

  useEffect(() => {
    fetchCategories();
    if (selectedShopId) {
      fetchProducts(selectedShopId);
    }
  }, [selectedShopId, fetchCategories, fetchProducts]);

  if (!selectedShopId) {
    return (
      <div className="flex items-center justify-center h-[60vh] text-text/40 italic">
        Please select a shop to see the menu
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 mb-8">
      <div className="flex flex-col md:flex-row items-start justify-between gap-4">
        <div className="flex flex-wrap gap-2 overflow-x-auto pb-2 sm:pb-0">
          <TagBadge
            name="All"
            isSelected={!activeCategoryId}
            onClick={() => setCategory(selectedShopId, undefined)}
          />

          {categories.map((cat) => (
            <TagBadge
              key={cat.id}
              name={cat.name}
              isSelected={activeCategoryId === cat.id}
              onClick={() => setCategory(selectedShopId, cat.id)}
            />
          ))}
        </div>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(selectedShopId, e.target.value as any)}
          className="bg-card border border-border/50 p-2.5 rounded-xl text-sm outline-none focus:border-accent/50 transition-colors cursor-pointer w-full sm:w-auto"
        >
          <option value="name-asc">Name A-Z</option>
          <option value="name-desc">Name Z-A</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-64 bg-card rounded-4xl border border-border/20"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-full py-20 text-center text-text/40">
              No products found in this category.
            </div>
          )}
        </div>
      )}
    </div>
  );
};
