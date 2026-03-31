
import type { IShop } from "../types";

interface ShopItemProps {
  shop: IShop;
  isActive: boolean;
  onSelect: (id: string) => void;
}

export const ShopItem = ({ shop, isActive, onSelect }: ShopItemProps) => {
  return (
    <div
      onClick={() => onSelect(shop.id)}
      className={`
        relative flex items-center sm:gap-4 p-3 rounded-2xl cursor-pointer transition-all duration-300
        border-2 group
        ${isActive
          ? "border-accent bg-accent-bg/40 shadow-sm"
          : "border-transparent bg-card hover:border-border hover:bg-social-bg/30"
        }
      `}
    >
      <div className="hidden sm:block h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-white border border-border/20">
        {shop.image_url ? (
          <img 
            src={shop.image_url} 
            alt={shop.name} 
            className="h-full w-full object-contain p-1 transition-transform group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-accent/10 text-accent font-bold">
            {shop.name[0]}
          </div>
        )}
      </div>

      <div className="flex flex-col min-w-0 flex-1">
        <span className={`font-bold truncate ${isActive ? "text-accent" : "text-text-h"}`}>
          {shop.name}
        </span>

        <div className="flex items-center gap-1 mt-0.5">
          <svg className="h-3.5 w-3.5 fill-amber-400 stroke-amber-400" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          <span className="text-xs font-medium text-text/70">
            {shop.rating ? Number(shop.rating).toFixed(1) : "0.0"}
          </span>
        </div>
      </div>

        <div className={`transition-transform duration-300 ${isActive ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"}`}>
        <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  );
};