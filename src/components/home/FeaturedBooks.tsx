import { Container } from "@/components/layout/Container";
import { formatPrice } from "@/lib/utils";

import { SectionHeader, SHTitle, SHDescription } from "@/components/common/SectionHeader";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useShopStore } from "@/store/useShopStore";
import { ShoppingBag, Star } from "lucide-react";
import { Skeleton } from "@/components/ui/Skeleton";
import type { Book } from "@/types/book";

const FeaturedBooks = () => {
  const { books, currency, isLoading } = useShopStore();

  if (isLoading) {
    return (
      <section className="bg-secondary py-20">
        <Container>
          <SectionHeader className="pb-12">
            <SHTitle title="Featured" color="Books" />
            <SHDescription content="Hand-picked by our editors — books that deserve a place on every shelf" />
          </SectionHeader>

          <div className="flex flex-col gap-8 xl:flex-row xl:gap-12">
            <FeaturedBookDetailSkeleton />
            <FeaturedBookGridSkeleton />
          </div>
        </Container>
      </section>
    );
  }

  const featuredBook = books[7];

  if (!featuredBook) return null;

  return (
    <section className="bg-secondary py-20">
      <Container>
        <SectionHeader className="pb-12">
          <SHTitle title="Featured" color="Books" />
          <SHDescription content="Hand-picked by our editors — books that deserve a place on every shelf" />
        </SectionHeader>

        <div className="flex flex-col gap-8 xl:flex-row xl:gap-12">
          <FeaturedBookDetail book={featuredBook} currency={currency} />
          <FeaturedBookGrid books={books} />
        </div>
      </Container>
    </section>
  );
};

const FeaturedBookDetail = ({ book, currency }: { book: Book; currency: string }) => (
  <div className="border-border bg-background shadow-warm flex flex-col gap-6 rounded-2xl border p-6 sm:flex-row sm:gap-8 sm:p-8 xl:flex-1">
    <div className="bg-primary relative flex min-w-48 items-center justify-center rounded-xl p-6">
      <Badge variant="gold" className="absolute top-3 left-3 gap-1">
        <Star className="size-3" />
        Editor's Pick
      </Badge>
      <img
        src={book.cover_image || "/placeholder.svg"}
        alt={book.title}
        className="h-72 w-auto object-contain drop-shadow-lg"
        onError={(e) => {
          (e.target as HTMLImageElement).src = "/placeholder.svg";
        }}
      />
    </div>

    <div className="flex flex-1 flex-col justify-between gap-4">
      <div className="space-y-3">
        <Badge variant="outline">{book.category.name}</Badge>
        <h3 className="text-2xl leading-tight font-bold tracking-tight sm:text-3xl">{book.title}</h3>
        <p className="text-muted-foreground text-sm font-medium">{book.author.name}</p>
        <p className="text-accent text-2xl font-bold">
          {currency} {formatPrice(book.details.price)}
        </p>
      </div>

      <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed">{book.summary}</p>

      {/* Details grid */}
      <div className="bg-muted/50 grid grid-cols-2 gap-3 rounded-xl p-4 text-sm">
        <DetailItem label="Published" value={book.details.published_date.split("-")[0]} />
        <DetailItem label="Pages" value={book.details.total_pages} />
        <DetailItem label="Format" value={book.details.format} />
        <DetailItem label="Stock" value="Available" />
      </div>

      <Button variant="accent" className="mt-2 flex w-fit items-center gap-2">
        <ShoppingBag className="size-4" />
        Add to Cart
      </Button>
    </div>
  </div>
);

const DetailItem = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">{label}</p>
    <p className="font-semibold">{value}</p>
  </div>
);

const FeaturedBookGrid = ({ books }: { books: Book[] }) => (
  <div className="hidden xl:flex xl:flex-1">
    <div className="grid grid-cols-3 gap-4">
      {books.slice(4, 10).map((b) => (
        <ButtonLink
          key={b._id}
          to={`/shop/${b.category.name.toLowerCase()}/${b._id}`}
          className="group border-border bg-background shadow-warm-sm hover:shadow-warm flex h-auto flex-col items-center justify-center rounded-xl border p-4 transition-all duration-300 hover:-translate-y-1"
        >
          <img
            src={b.cover_image || "/placeholder.svg"}
            alt={b.title}
            className="h-40 object-contain drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/placeholder.svg";
            }}
          />
          <p className="mt-3 line-clamp-1 text-center text-xs font-semibold">{b.title}</p>
        </ButtonLink>
      ))}
    </div>
  </div>
);

const FeaturedBookDetailSkeleton = () => (
  <div className="border-border bg-background shadow-warm flex flex-col gap-6 rounded-2xl border p-6 sm:flex-row sm:gap-8 sm:p-8 xl:flex-1">
    <div className="bg-primary relative flex min-w-48 items-center justify-center rounded-xl p-6">
      <Skeleton className="absolute top-3 left-3 h-5 w-24" />
      <Skeleton className="h-72 w-48" />
    </div>

    <div className="flex flex-1 flex-col justify-between gap-4">
      <div className="space-y-3">
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-8 w-24" />
      </div>

      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/5" />
      </div>

      <div className="bg-muted/50 grid grid-cols-2 gap-3 rounded-xl p-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i}>
            <Skeleton className="mb-1 h-3 w-16" />
            <Skeleton className="h-4 w-20" />
          </div>
        ))}
      </div>

      <Skeleton className="mt-2 h-10 w-32 rounded-md" />
    </div>
  </div>
);

const FeaturedBookGridSkeleton = () => (
  <div className="hidden xl:flex xl:flex-1">
    <div className="grid grid-cols-3 gap-4">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="border-border bg-background shadow-warm-sm flex h-auto flex-col items-center justify-center rounded-xl border p-4"
        >
          <Skeleton className="h-40 w-28" />
          <Skeleton className="mt-3 h-4 w-20" />
        </div>
      ))}
    </div>
  </div>
);

export default FeaturedBooks;
