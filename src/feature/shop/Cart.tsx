import { useState } from "react";
import { Container } from "@/components/layout/Container";
import { SectionHeader, SHTitle, SHDescription } from "@/components/common/SectionHeader";
import { useShop } from "@/feature/shop/context/ShopContext";
import { EmptyCart } from "@/feature/shop/components/cart/EmptyCart";
import { CartItemList } from "@/feature/shop/components/cart/CartItemList";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, Loader2, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, currency, clearCart } = useShop();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

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
            <div className="border-border bg-secondary/50 rounded-2xl border p-6 sticky top-24">
              <h3 className="mb-6 text-xl font-bold">Order Summary</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal ({cartItems.length} items)</span>
                  <span>
                    {currency}{" "}
                    {cartItems.reduce((acc, item) => {
                      const price = parseInt(item.book.details?.price?.replace(/[^0-9]/g, "") || "150000");
                      return acc + price * item.quantity;
                    }, 0).toLocaleString("id-ID")}
                  </span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                
                <div className="border-border my-4 border-t pt-4">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-accent">
                      {currency}{" "}
                      {cartItems.reduce((acc, item) => {
                        const price = parseInt(item.book.details?.price?.replace(/[^0-9]/g, "") || "150000");
                        return acc + price * item.quantity;
                      }, 0).toLocaleString("id-ID")}
                    </span>
                  </div>
                </div>
                
                <Button 
                  onClick={handleCheckout} 
                  disabled={isCheckingOut}
                  className="bg-accent text-accent-foreground hover:bg-accent/90 flex w-full items-center justify-center gap-2 rounded-lg py-6 font-semibold transition-colors mt-6"
                >
                  {isCheckingOut ? (
                    <>
                      <Loader2 className="size-5 animate-spin" />
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
