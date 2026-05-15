import type { Book } from "@/types/book";

const ProductCover = ({ book }: { book: Book }) => {
  return (
    <div className="bg-secondary shadow-warm flex flex-1 items-center justify-center rounded-3xl p-12 lg:p-16">
      <img
        src={book.cover_image}
        alt={book.title}
        className="h-auto max-h-125 max-w-full rounded-lg object-contain drop-shadow-xl transition-transform duration-500 hover:scale-105"
      />
    </div>
  );
};

export { ProductCover };
