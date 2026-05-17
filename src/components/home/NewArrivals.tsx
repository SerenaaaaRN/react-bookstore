import { useShopStore } from "@/store/useShopStore";
import { BookSlider } from "@/components/ui/BookSlider";
import { Container } from "@/components/layout/Container";
import { SectionHeader, SHTitle, SHDescription } from "@/components/common/SectionHeader";

const NewArrivals = () => {
  const { books, isLoading } = useShopStore();
  const newArrivals = books.slice(13, 20);

  return (
    <Container className="py-20">
      <SectionHeader className="pb-12">
        <SHTitle title="New" color="Arrivals" />
        <SHDescription content="Fresh additions to our shelves — discover the latest books arriving weekly with captivating stories" />
      </SectionHeader>
      <BookSlider books={newArrivals} isLoading={isLoading} />
    </Container>
  );
};

export default NewArrivals;
