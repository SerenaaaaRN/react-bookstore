import { Button } from "@/components/ui/Button";
import { ShoppingCart, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const EmptyCart = () => {
  const navigate = useNavigate();

  return (
    <div className="animate-fade-in-up flex flex-col items-center justify-center py-24 text-center">
      <div className="bg-secondary shadow-warm mb-8 flex h-28 w-28 items-center justify-center rounded-full">
        <ShoppingCart size={40} className="text-muted-foreground" />
      </div>
      <h2 className="mb-3 text-3xl font-bold">Your cart is empty</h2>
      <p className="text-muted-foreground mb-10 max-w-sm text-base leading-relaxed">
        Looks like you haven't added any books to your cart yet. Discover our curated collection and find your next read.
      </p>
      <Button variant="accent" size="lg" onClick={() => navigate("/shop")} className="flex items-center gap-3">
        Start Shopping
        <ArrowRight size={18} />
      </Button>
    </div>
  );
};

export { EmptyCart };
