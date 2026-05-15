import { Container } from "@/components/layout/Container";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useShop } from "@/feature/shop/context/ShopContext";
import { Autoplay } from "swiper/modules";
import type { Book } from "@/types";
import { BookCard, BookCardSkeleton } from "@/components/common/BookCard";

const Hero = () => {
  const { books, isLoading } = useShop();
  const popularBooks = books.slice(4, 8);

  return (
    <section className="relative overflow-hidden">
      <div className="noise-overlay bg-secondary absolute inset-0" />

      <Container className="relative z-10 pt-28 pb-16 lg:pt-36 lg:pb-24">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-16">
          <BannerHero />
          <BannerSpin popularBooks={popularBooks} isLoading={isLoading} />
        </div>
    </Container>
    </section>
  );
};

const BannerHero = () => {
  return (
    <div className="animate-fade-in-up flex-1 space-y-8">
      <div className="space-y-4">
        <h1 className="text-foreground text-5xl leading-[1.1] font-extralight tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl">
          Find Your
          <br />
          <span className="font-bold italic">Next Book</span>
        </h1>
      </div>

      <p className="text-muted-foreground max-w-lg text-lg leading-relaxed">
        Discover stories that move you, knowledge that transforms you, and worlds that await within every page.
      </p>

      <div className="flex flex-wrap items-center gap-4 pt-2">
        <ButtonLink to="/shop" variant="primary">
          Browse Collection
          <ArrowRight className="size-4" />
        </ButtonLink>

        <ButtonLink to="/blog" variant="ghost" className="hover-underline text-sm font-medium tracking-wide">
          Read Our Blog
        </ButtonLink>
      </div>
    </div>
  );
};

const BannerSpin = ({ popularBooks, isLoading }: { popularBooks: Book[]; isLoading: boolean }) => {
  return (
    <aside className="hidden shrink-0 lg:block lg:w-80 xl:w-96">
      <div className="animate-fade-in-up stagger-3">
        <Swiper
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          breakpoints={{
            355: { slidesPerView: 1, spaceBetween: 10 },
          }}
          modules={[Autoplay]}
          className="min-h-105"
        >
          {isLoading
            ? Array.from({ length: 5 }).map((_, i) => (
                <SwiperSlide key={`hero-skel-${i}`}>
                  <BookCardSkeleton />
                </SwiperSlide>
              ))
            : popularBooks.map((book) => (
                <SwiperSlide key={book._id}>
                  <BookCard book={book} />
                </SwiperSlide>
              ))}
        </Swiper>
      </div>
    </aside>
  );
};

export { Hero };
