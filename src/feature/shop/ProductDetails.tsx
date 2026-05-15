import { useParams, useNavigate } from "react-router-dom";
import { Container } from "@/components/layout/Container";
import { useShop } from "@/feature/shop/context/ShopContext";
import { Button } from "@/components/ui/Button";
import { ChevronLeft } from "lucide-react";
import type { Book } from "@/types";
import { ProductSkeleton } from "@/feature/shop/components/product/ProductSkeleton";
import { ProductNotFound } from "@/feature/shop/components/product/ProductNotFound";
import { ProductCover } from "@/feature/shop/components/product/ProductCover";
import { ProductInfo } from "@/feature/shop/components/product/ProductInfo";

const ProductDetails = () => {
  const { id } = useParams();
  const { books, currency, isLoading } = useShop();
  const navigate = useNavigate();

  const book = (books as Book[]).find((b: Book) => b._id === id);

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
