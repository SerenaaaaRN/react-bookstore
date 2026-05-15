import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ShoppingBag, Star } from "lucide-react";
import type { Book } from "@/types/book";
import { useShopStore } from "@/store/useShopStore";
import { toast } from "sonner";
import { formatPrice } from "@/lib/utils";


const DetailItem = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">{label}</p>
    <p className="mt-1 font-bold">{value}</p>
  </div>
);

const ProductInfo = ({ book, currency }: { book: Book; currency: string }) => {
  const addToCart = useShopStore((state) => state.addToCart);
  const navigate = useNavigate();

  const handleAddToCart = () => {
    addToCart(book);
    toast.success(`${book.title} added to cart!`, {
      description: "You can view your cart or continue shopping.",
      action: {
        label: "View Cart",
        onClick: () => navigate("/cart"),
      },
    });
  };

  return (
    <div className="flex flex-1 flex-col gap-6">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Badge variant="outline">{book.category.name}</Badge>
          <Badge variant="gold" className="gap-1">
            <Star className="size-3" />
            Featured
          </Badge>
        </div>
        <h1 className="text-4xl leading-tight font-bold tracking-tight md:text-5xl">{book.title}</h1>
        <p className="text-muted-foreground text-lg font-medium">{book.author.name}</p>
        <p className="text-accent text-3xl font-bold">
          {currency} {formatPrice(book.details.price)}
        </p>
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-bold tracking-tight">Synopsis</h3>
        <p className="text-muted-foreground text-base leading-relaxed">{book.summary}</p>
      </div>

      <div className="border-border bg-muted/30 grid grid-cols-2 gap-4 rounded-2xl border p-6">
        <DetailItem label="Author" value={book.author.name} />
        <DetailItem label="Publisher" value={book.publisher} />
        <DetailItem label="Pages" value={book.details.total_pages} />
        <DetailItem label="Format" value={book.details.format} />
      </div>

      <div className="flex flex-col gap-3 pt-2 sm:flex-row">
        <Button variant="accent" size="lg" onClick={handleAddToCart} className="flex flex-1 items-center justify-center gap-3">
          <ShoppingBag size={20} />
          Add to Cart
        </Button>
        <Button variant="outline" size="lg" className="flex flex-1 items-center justify-center">
          Add to Wishlist
        </Button>
      </div>
    </div>
  );
};

export { ProductInfo };
