import type { ComponentProps } from "react";
import { cn, formatPrice } from "@/lib/utils";

import { Card, CardContent } from "@/components/ui/Card";
import { ButtonLink } from "../ui/Button";
import { Badge } from "../ui/Badge";
import type { Book } from "@/types/book";
import { ShoppingBag } from "lucide-react";
import { useShopStore } from "@/store/useShopStore";
import { Skeleton } from "../ui/Skeleton";

type BookCardProps = ComponentProps<"div"> & {
  book: Book;
};

const BookCard = ({ className, book, ...props }: BookCardProps) => {
  const { currency } = useShopStore();

  return (
    <Card className={cn("group overflow-hidden", className)} {...props}>
      <div className="bg-secondary relative flex h-72 items-center justify-center overflow-hidden p-6">
        <Badge variant="ghost" className="bg-background/90 absolute top-3 left-3 z-10 text-xs backdrop-blur-sm">
          {book.category.name}
        </Badge>
        <img
          src={book.cover_image}
          alt={book.title}
          className="h-full max-w-full object-contain drop-shadow-md transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/placeholder.svg";
          }}
        />
      </div>

      <CardContent className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <h4 className="line-clamp-2 text-lg leading-tight font-bold tracking-tight">{book.title}</h4>
          <p className="text-accent shrink-0 text-lg font-bold">
            {currency} {formatPrice(book.details.price)}
          </p>
        </div>

        <p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed">{book.summary}</p>

        <div className="mt-auto flex items-end justify-between gap-2 pt-2">
          <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">{book.author.name}</p>
          <ButtonLink
            to={`/shop/${book.category.name.toLowerCase()}/${book._id}`}
            variant="accent"
            size="xs"
            className="rounded-full px-3 py-1.5 opacity-0 transition-all duration-300 group-hover:opacity-100"
          >
            <ShoppingBag className="size-3.5" />
            <span className="text-xs">View</span>
          </ButtonLink>
        </div>
      </CardContent>
    </Card>
  );
};

const BookCardSkeleton = ({ className, ...props }: ComponentProps<"div">) => {
  return (
    <Card className={cn("group overflow-hidden", className)} {...props}>
      <div className="bg-secondary relative flex h-72 items-center justify-center overflow-hidden p-6">
        <Skeleton className="absolute top-3 left-3 z-10 h-5 w-16" />
        <Skeleton className="h-full w-32" />
      </div>

      <CardContent className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-5 w-12" />
        </div>

        <div className="space-y-1">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-4/5" />
        </div>

        <div className="mt-auto flex items-end justify-between gap-2 pt-2">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
      </CardContent>
    </Card>
  );
};

export { BookCard, BookCardSkeleton };
