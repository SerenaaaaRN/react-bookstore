import { useMemo, useState } from "react";
import { Container } from "@/components/layout/Container";
import { SectionHeader, SHTitle, SHDescription } from "@/components/common/SectionHeader";
import { useShop } from "@/feature/shop/context/ShopContext";
import { Pagination } from "@/feature/shop/Pagination";
import CategoryFilter from "@/feature/shop/CategoryFilter";
import { BookGrid } from "@/feature/shop/BookGrid";

const Shop = () => {
  const { filteredBooks: books, category, setCategory, isLoading } = useShop();
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 10;

  const currentBooks = useMemo(() => {
    const indexOfLastPage = currentPage * booksPerPage;
    const indexOfFirstPage = indexOfLastPage - booksPerPage;
    return books.slice(indexOfFirstPage, indexOfLastPage);
  }, [books, currentPage]);

  const totalPage = Math.ceil(books.length / booksPerPage);

  const handleSetCategory = (newCategory: string) => {
    setCategory(newCategory);
    setCurrentPage(1);
  };

  return (
    <Container className="pt-28 pb-20">
      <SectionHeader className="pb-12">
        <SHTitle title="All" color="Books" />
        <SHDescription content="Explore our complete collection — filter by category to find exactly what you're looking for" />
      </SectionHeader>
      <CategoryFilter category={category} setCategory={handleSetCategory} />
      <BookGrid currentBooks={currentBooks} isLoading={isLoading} />
      <Pagination currentPage={currentPage} totalPage={totalPage} onPageChange={setCurrentPage} />
    </Container>
  );
};

export default Shop;
