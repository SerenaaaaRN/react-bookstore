import { useParams } from "react-router-dom";
import { Container } from "@/components/layout/Container";
import { SectionHeader, SHTitle, SHDescription } from "@/components/common/SectionHeader";
import { useShop } from "@/feature/shop/context/ShopContext";
import { BookGrid } from "@/feature/shop/BookGrid";
import { useMemo } from "react";
import type { Book } from "@/types";

const CategoryShop = () => {
  const { category } = useParams();
  const { books, isLoading } = useShop();

  const filteredBooks = useMemo(() => {
    if (!category) return books;
    return (books as Book[]).filter((book: Book) => book.category.name.toLowerCase() === category.toLowerCase());
  }, [books, category]);

  return (
    <Container className="pt-28 pb-20">
      <SectionHeader className="pb-12">
        <SHTitle title={category || "Category"} color="Collection" />
        <SHDescription content={`Browsing ${filteredBooks.length} books in the ${category} category`} />
      </SectionHeader>
      <BookGrid currentBooks={filteredBooks} isLoading={isLoading} />
    </Container>
  );
};

export default CategoryShop;
