import { Button } from "@/components/ui/Button";
import { BookOpen, Trash2, Plus, Minus } from "lucide-react";
import type { CartItem } from "@/types/cart";
import { useShopStore } from "@/store/useShopStore";
import { formatPrice } from "@/lib/utils";

const CartItemList = ({ cartItems }: { cartItems: CartItem[] }) => {
  const removeFromCart = useShopStore((state) => state.removeFromCart);
  const updateQuantity = useShopStore((state) => state.updateQuantity);
  const currency = useShopStore((state) => state.currency);

  return (
    <div className="space-y-6">
      <div className="border-border bg-background shadow-warm-sm rounded-2xl border">
        {cartItems.map((item) => (
          <div key={item.book._id} className="border-border flex items-center gap-6 border-b p-6 last:border-b-0">
            <div className="bg-secondary flex h-20 w-16 shrink-0 items-center justify-center rounded-lg p-2">
              <BookOpen className="text-muted-foreground size-6" />
            </div>
            <div className="flex-1">
              <h4 className="line-clamp-1 font-bold">{item.book.title}</h4>
              <p className="text-accent mt-1 text-sm font-semibold">
                {currency} {formatPrice(item.book.details?.price || "150000")}
              </p>
            </div>

            {/* Quantity Controls */}
            <div className="border-border flex items-center gap-3 rounded-lg border p-1">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 rounded-md p-0"
                onClick={() => updateQuantity(item.book._id, item.quantity - 1)}
                disabled={item.quantity <= 1}
              >
                <Minus className="size-4" />
              </Button>
              <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 rounded-md p-0"
                onClick={() => updateQuantity(item.book._id, item.quantity + 1)}
              >
                <Plus className="size-4" />
              </Button>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeFromCart(item.book._id)}
              className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 shrink-0"
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export { CartItemList };
