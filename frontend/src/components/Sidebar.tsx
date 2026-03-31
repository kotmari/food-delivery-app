import { useEffect } from "react";
import { useShopStore } from "../store/useShopStore";
import type { RatingRange } from "../types";
import { ShopItem } from "./ShopItem";

export const Sidebar = () => {
  const {
    shops,
    activeRatingFilter,
    setRatingFilter,
    getFilteredShops,
    isLoading,
    error,
    fetchShops,
    selectedShopId,
    setSelectedShop,
  } = useShopStore();

  const filteredShops = getFilteredShops();

  const filterOptions: { label: string; value: RatingRange }[] = [
    { label: "All", value: "all" },
    { label: "4.0 - 5.0", value: "4-5" },
    { label: "3.0 - 4.0", value: "3-4" },
    { label: "2.0 - 3.0", value: "2-3" },
  ];

  useEffect(() => {
    fetchShops();
  }, [fetchShops]);

  if (isLoading && shops.length === 0) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-20 bg-card rounded-xl"></div>
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="text-center mt-20 text-red-500">Error: {error}</div>;
  }

  return (
    <aside className="w-42 sm:w-72 border-r border-border/50 p-2.5 sm:p-6 overflow-y-auto">
      <h2 className="text-center text-xl font-bold mb-6">Shops:</h2>
      <h4 className="text-md font-bold mb-4">Rating Shops:</h4>

      <div className="flex flex-wrap gap-2 mb-8">
        {filterOptions.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setRatingFilter(opt.value)}
            className={`px-2 py-1.5 text-xs rounded-full border transition-all ${
              activeRatingFilter === opt.value
                ? "bg-accent border-accent text-white shadow-md"
                : "bg-card border-border hover:border-accent/50 text-text/70"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-3">
        {filteredShops.length > 0 ? (
          filteredShops.map((shop) => (
            <ShopItem
              key={shop.id}
              shop={shop}
              isActive={selectedShopId === shop.id}
              onSelect={setSelectedShop}
            />
          ))
        ) : (
          !isLoading && (
            <p className="text-sm text-text/40 text-center py-10">
              No shops found.
            </p>
          )
        )}
      </div>
    </aside>
  );
};
