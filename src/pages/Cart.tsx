import { useState } from "react";
import { Container } from "@/components/layout/Container";
import { parsePrice, formatPrice } from "@/lib/utils";

import { SectionHeader, SHTitle, SHDescription } from "@/components/common/SectionHeader";
import { useShopStore } from "@/store/useShopStore";
import { EmptyCart } from "@/components/shop/EmptyCart";
import { CartItemList } from "@/components/shop/CartItemList";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, Loader2, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const cartItems = useShopStore((state) => state.cartItems);
  const currency = useShopStore((state) => state.currency);
  const clearCart = useShopStore((state) => state.clearCart);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();
  
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartItems.reduce((acc, item) => {
    const price = parsePrice(item.book.details?.price || "150000");
    return acc + price * item.quantity;
  }, 0);



  const handleCheckout = () => {
    setIsCheckingOut(true);
    // simulasi request
    setTimeout(() => {
      setIsCheckingOut(false);
      setIsSuccess(true);
      clearCart();
    }, 1500);
  };

  if (isSuccess) {
    return (
      <Container className="pt-28 pb-20">
        <div className="animate-fade-in-up flex flex-col items-center justify-center py-24 text-center">
          <div className="bg-accent/10 shadow-warm mb-8 flex h-28 w-28 items-center justify-center rounded-full">
            <CheckCircle2 size={50} className="text-accent" />
          </div>
          <h2 className="mb-3 text-3xl font-bold">Payment Successful!</h2>
          <p className="text-muted-foreground mb-10 max-w-sm text-base leading-relaxed">
            Thank you for your purchase. Your order has been placed and will be processed shortly.
          </p>
          <Button variant="accent" size="lg" onClick={() => navigate("/shop")} className="flex items-center gap-3">
            Continue Shopping
            <ArrowRight size={18} />
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <Container className="pt-28 pb-20">
      <SectionHeader className="pb-10">
        <SHTitle title="Your" color="Cart" />
        <SHDescription content="Review your selected books before checkout" />
      </SectionHeader>

      {cartItems.length === 0 ? (
        <EmptyCart />
      ) : (
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <CartItemList cartItems={cartItems} />
          </div>

          <div className="lg:col-span-1">
            <div className="border-border bg-secondary/50 sticky top-24 rounded-2xl border p-6">
              <h3 className="mb-6 text-xl font-bold">Order Summary</h3>

              <div className="space-y-4">
                <div className="text-muted-foreground flex justify-between">
                  <span>Subtotal ({totalItems} items)</span>
                  <span>
                    {currency} {formatPrice(totalPrice)}


                  </span>
                </div>
                <div className="text-muted-foreground flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>

                <div className="border-border my-4 border-t pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-accent">
                      {currency} {formatPrice(totalPrice)}


                    </span>
                  </div>
                </div>

                <Button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="bg-accent text-accent-foreground hover:bg-accent/90 mt-6 flex w-full items-center justify-center gap-2 rounded-lg py-6 font-semibold transition-colors"
                >
                  {isCheckingOut ? (
                    <>
                      <span className="animate-spin inline-block">
                        <Loader2 className="size-5" />
                      </span>

                      Processing...
                    </>
                  ) : (
                    "Proceed to Checkout"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};

export default Cart;
