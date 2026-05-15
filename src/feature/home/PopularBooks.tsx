import { BookSlider } from "@/components/ui/BookSlider";
import { Container } from "@/components/layout/Container";
import { SectionHeader, SHTitle, SHDescription } from "@/components/common/SectionHeader";
import { useShop } from "@/feature/shop/context/ShopContext";

const PopularBooks = () => {
  const { books, isLoading } = useShop();
  const popularBooks = books.slice(3, 11);

  return (
    <Container className="py-20">
      <SectionHeader className="pb-12">
        <SHTitle title="Popular" color="Books" />
        <SHDescription content="Beloved by our readers — the most popular books with exciting plots and vibrant voices" />
      </SectionHeader>
      <BookSlider books={popularBooks} isLoading={isLoading} />
    </Container>
  );
};

export default PopularBooks;
