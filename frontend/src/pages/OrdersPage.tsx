import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCartStore } from "../store/useCartStore";
import { Button } from "../components/ui-components/Button";
import { Input } from "../components/ui-components/Input";
import toast from "react-hot-toast";
import { Trash2, Plus, Minus } from "lucide-react";
import { orderSchema } from "../utils/validation";
import { api } from "../api/axios";
import type { IOrderFormData, IOrderPayload } from "../types";
import { useState } from "react";

export const OrdersPage = () => {
  const { items, getTotalPrice, updateQuantity, removeItem, clearCart } =
    useCartStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IOrderFormData>({
    resolver: yupResolver(orderSchema),
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit: SubmitHandler<IOrderFormData> = async (data) => {
    setIsSubmitting(true)
    if (items.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    const orderPayload: IOrderPayload = {
      ...data,
      totalPrice: getTotalPrice(),
      items: items.map((item) => ({
        productId: item.product.id,
        quantity: item.quantity,
      })),
    };

    try {
      const response = await api.post("/orders", orderPayload);

      if (response.status === 201 || response.status === 200) {
        toast("Order created successfully!");
        clearCart();
        reset();
      }
    } catch (error: unknown) {
      console.error(error);
      toast.error("Failed to create order");
    } finally {
    setIsSubmitting(false);
  }
  };

  return (
    <div className="max-w-7xl mx-auto pt-10 px-1 sm:px-4 pb-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid gap-8 grid-cols-1 min-[900px]:grid-cols-2 rounded-4xl bg-card border border-border/50 p-4 sm:p-8 shadow-sm"
      >
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-bold text-text-h border-b border-border/20 pb-4">
            Customer Info
          </h2>

          <div className="space-y-2">
            <Input
              label="Name:"
              placeholder="Your name..."
              {...register("userName")}
              error={errors.userName?.message}
            />
            <Input
              label="Email:"
              placeholder="email@example.com"
              {...register("userEmail")}
              error={errors.userEmail?.message}
            />
            <Input
              label="Phone:"
              placeholder="+380..."
              {...register("userPhone")}
              error={errors.userPhone?.message}
            />
            <Input
              label="Address:"
              placeholder="Delivery address..."
              {...register("userAddress")}
              error={errors.userAddress?.message}
            />
          </div>
        </div>

        <div className="flex flex-col overflow-hidden min-h-0">
          <div className="flex-1 min-h-0 max-h-110 overflow-y-auto p-2 sm:p-6 space-y-4 bg-amber-50">
            {items.length > 0 ? (
              items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-2 sm:gap-4 bg-social-bg border border-border/30 py-3 px-2 rounded-2xl group transition-all hover:border-accent/30"
                >
                  <div className="w-20 sm:w-32 sm:h-26 bg-border/20 rounded-xl flex items-center justify-center overflow-hidden shrink-0">
                    {item.product.image_url ? (
                      <img
                        src={item.product.image_url}
                        alt=""
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="w-full h-full border-2 border-dashed border-border/40 relative">
                        <div className="absolute inset-0 flex items-center justify-center opacity-20">
                          ✕
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col justify-between flex-1 py-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-text-h text-lg">
                        {item.product.name}
                      </h3>
                      <button
                        type="button"
                        onClick={() => removeItem(item.product.id)}
                        className="text-text/40 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={20} className="text-accent" />
                      </button>
                    </div>

                    <div className="flex items-end justify-between">
                      <p className="text-accent font-semibold sm:font-bold">
                        Price: {(item.product.price * item.quantity).toFixed(2)} грн
                      </p>

                      <div className="flex items-center border border-border/60 rounded-xl bg-card overflow-hidden">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.product.id, -1)}
                          className="p-1.5 hover:bg-social-bg/20 border-r border-border/60"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="px-2.5 font-black text-sm">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.product.id, 1)}
                          className="p-2 hover:bg-social-bg/20 border-l border-border/60"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="h-full flex items-center justify-center text-text/40 italic">
                Your cart is empty
              </div>
            )}
          </div>

          <div className="p-8 bg-social-bg/5 border-t border-border/40">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="text-center sm:text-left">
                <p className="text-text/80 text-sm font-medium uppercase tracking-widest">
                  Total amount:
                </p>
                <p className="text-3xl font-black text-text-h">
                  {getTotalPrice().toFixed(2)} <span className="text-lg">грн</span>
                </p>
              </div>

              <Button type="submit" size="lg" disabled={isSubmitting}>
                {isSubmitting ? "Processing..." : "Submit Order"}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
