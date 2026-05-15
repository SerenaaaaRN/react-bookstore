import { useParams, useNavigate } from "react-router-dom";
import { Container } from "@/components/layout/Container";
import { useShopStore } from "@/store/useShopStore";
import { Button } from "@/components/ui/Button";
import { ChevronLeft } from "lucide-react";
import { ProductSkeleton } from "@/components/shop/ProductSkeleton";
import { ProductNotFound } from "@/components/shop/ProductNotFound";
import { ProductCover } from "@/components/shop/ProductCover";
import { ProductInfo } from "@/components/shop/ProductInfo";

const ProductDetails = () => {
  const { id } = useParams();
  const currency = useShopStore((state) => state.currency);
  const isLoading = useShopStore((state) => state.isLoading);
  const booksById = useShopStore((state) => state.booksById);
  const navigate = useNavigate();
  const book = id ? booksById[id] : undefined;

  if (isLoading) {
    return <ProductSkeleton />;
  }

  if (!book) {
    return <ProductNotFound />;
  }

  return (
    <Container className="pt-28 pb-20">
      <Button variant="ghost" onClick={() => navigate(-1)} className="mb-10 flex items-center gap-2">
        <ChevronLeft size={18} />
        Back
      </Button>

      <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
        <ProductCover book={book} />
        <ProductInfo book={book} currency={currency} />
      </div>
    </Container>
  );
};

export default ProductDetails;
