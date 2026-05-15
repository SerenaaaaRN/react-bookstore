import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProductNotFound = () => {
  const navigate = useNavigate();

  return (
    <Container className="mt-32 text-center">
      <div className="flex flex-col items-center justify-center py-20">
        <div className="bg-muted mb-6 flex h-20 w-20 items-center justify-center rounded-full">
          <BookOpen className="text-muted-foreground size-8" />
        </div>
        <h2 className="mb-2 text-2xl font-bold">Book not found</h2>
        <p className="text-muted-foreground mb-6">The book you're looking for doesn't seem to exist.</p>
        <Button onClick={() => navigate("/shop")}>Back to Shop</Button>
      </div>
    </Container>
  );
};

export { ProductNotFound };
