import { Swiper, SwiperSlide, type SwiperProps } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { BookCard, BookCardSkeleton } from "@/components/common/BookCard";
import type { Book } from "@/types/book";

type BookSliderProps = SwiperProps & {
  books: Book[];
  fromHero?: string;
  className?: string;
  isLoading?: boolean;
};

const BookSlider = ({ className = "min-h-80", books, fromHero, isLoading, ...props }: BookSliderProps) => {
  return (
    <div className="relative">
      <div className="bg-background/80 pointer-events-none absolute top-0 left-0 z-10 h-full w-12 to-transparent mask-[linear-gradient(to_right,black,transparent)]" />
      <div className="bg-background/80 pointer-events-none absolute top-0 right-0 z-10 h-full w-12 to-transparent mask-[linear-gradient(to_left,black,transparent)]" />
      <Swiper
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        breakpoints={{
          355: { slidesPerView: fromHero ? 1 : 2, spaceBetween: fromHero ? 10 : 20 },
          600: { slidesPerView: fromHero ? 1 : 3, spaceBetween: 24 },
          900: { slidesPerView: fromHero ? 1 : 4, spaceBetween: 24 },
          1200: { slidesPerView: fromHero ? 1 : 5, spaceBetween: 24 },
        }}
        modules={[Autoplay]}
        className={className}
        {...props}
      >
        {isLoading
          ? Array.from({ length: 5 }).map((_, i) => (
              <SwiperSlide key={`skeleton-${i}`}>
                <BookCardSkeleton />
              </SwiperSlide>
            ))
          : books.map((book) => (
              <SwiperSlide key={book._id}>
                <BookCard book={book} />
              </SwiperSlide>
            ))}
      </Swiper>
    </div>
  );
};

export { BookSlider };
