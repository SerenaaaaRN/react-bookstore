import { useMemo, useState } from "react";
import { Container } from "@/components/layout/Container";
import { SectionHeader, SHTitle, SHDescription } from "@/components/common/SectionHeader";
import { useShopStore } from "@/store/useShopStore";
import { Pagination } from "@/components/ui/Pagination";
import CategoryFilter from "@/components/shop/CategoryFilter";
import { BookGrid } from "@/components/shop/BookGrid";

const Shop = () => {
  const { books, category, setCategory, searchTerm, isLoading } = useShopStore();

  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 10;

  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const titleMatch = book.title.toLowerCase().includes(searchTerm.toLowerCase());
      const categoryMatch = category === "All" || book.category.name === category;
      return titleMatch && categoryMatch;
    });
  }, [books, searchTerm, category]);

  const currentBooks = useMemo(() => {
    const indexOfLastPage = currentPage * booksPerPage;
    const indexOfFirstPage = indexOfLastPage - booksPerPage;
    return filteredBooks.slice(indexOfFirstPage, indexOfLastPage);
  }, [filteredBooks, currentPage]);

  const totalPage = Math.ceil(filteredBooks.length / booksPerPage);

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
