import { BookCard, BookCardSkeleton } from "@/components/common/BookCard";
import { BookOpen } from "lucide-react";
import type { Book } from "@/types";

type BookGridProps = {
  currentBooks: Book[];
  isLoading?: boolean;
};

const BookGrid = ({ currentBooks, isLoading }: BookGridProps) => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {isLoading ? (
        Array.from({ length: 10 }).map((_, i) => (
          <div key={`skel-${i}`} className="animate-fade-in-up" style={{ animationDelay: `${i * 0.05}s` }}>
            <BookCardSkeleton />
          </div>
        ))
      ) : currentBooks.length > 0 ? (
        currentBooks.map((book, index) => (
          <div key={book._id} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.05}s` }}>
            <BookCard book={book} />
          </div>
        ))
      ) : (
        <div className="col-span-full flex flex-col items-center justify-center py-24 text-center">
          <div className="bg-muted mb-6 flex h-20 w-20 items-center justify-center rounded-full">
            <BookOpen className="text-muted-foreground size-8" />
          </div>
          <h3 className="mb-2 text-xl font-bold">No books found</h3>
          <p className="text-muted-foreground max-w-xs text-sm">
            Try adjusting your search or category filter to discover more books.
          </p>
        </div>
      )}
    </div>
  );
};

export { BookGrid };
