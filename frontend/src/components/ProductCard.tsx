import { type IProductWithDetails } from "../types";
import { Card } from "./ui-components/Card";
import { Button } from "./ui-components/Button";
import { useCartStore } from "../store/useCartStore";
import toast from "react-hot-toast";

interface ProductCardProps {
  product: IProductWithDetails;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem(product);
    toast.success(`${product.name} Added to cart! 🍔`, {
      duration: 2000,
      position: "bottom-right", 
 
    });
  };
  return (
    <Card
      variant="bordered"
      className="group transition-all duration-300 hover:shadow-lg hover:shadow-accent/5"
    >
      <div className="relative h-30 mb-4 overflow-hidden rounded-xl bg-social-bg/20">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-text/20 italic text-xs">
            No image available
          </div>
        )}

        {product.category?.name && (
          <div className="absolute top-0 right-1 px-2 py-1 rounded-lg bg-yellow-300 backdrop-blur-sm text-[10px] font-bold uppercase text-text-h">
            {product.category.name}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3 pt-2">
        <div className="flex flex-col min-w-0">
          <h3 className="font-bold text-lg text-text-h mb-1 line-clamp-1 group-hover:text-accent transition-colors">
            {product.name}
          </h3>

          <div className="flex items-baseline overflow-hidden">
            <span className="text-xs text-accent/80 uppercase font-bold tracking-wider mr-1 shrink-0">
              Price:
            </span>
            <span className="text-lg font-black text-text-h leading-none truncate">
              {(product.price).toFixed(2)} грн
            </span>
          </div>
        </div>

        <Button
          size="sm"
          onClick={handleAddToCart}
          className="sm:self-end active:scale-95 transition-transform"
        >
          <svg
            className="w-4 h-4 mr-1.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              d="M12 4v16m8-8H4"
            />
          </svg>
          <span className="whitespace-nowrap">Add Card</span>
        </Button>
      </div>
    </Card>
  );
};
