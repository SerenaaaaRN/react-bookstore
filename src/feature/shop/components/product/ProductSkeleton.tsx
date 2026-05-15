import { Skeleton } from "@/components/ui/Skeleton";
import { Container } from "@/components/layout/Container";

const ProductSkeleton = () => {
  return (
    <Container className="pt-28 pb-20">
      <Skeleton className="mb-10 h-10 w-24" />

      <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
        <div className="bg-secondary shadow-warm flex flex-1 items-center justify-center rounded-3xl p-12 lg:p-16">
          <Skeleton className="h-[500px] w-full max-w-sm rounded-lg" />
        </div>

        <div className="flex flex-1 flex-col gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-24 rounded-full" />
            </div>
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-12 w-1/2" />
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-10 w-32" />
          </div>

          <div className="space-y-3 mt-4">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>

          <div className="border-border bg-muted/30 grid grid-cols-2 gap-4 rounded-2xl border p-6 mt-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i}>
                <Skeleton className="mb-2 h-4 w-16" />
                <Skeleton className="h-5 w-24" />
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <Skeleton className="h-12 flex-1 rounded-md" />
            <Skeleton className="h-12 flex-1 rounded-md" />
          </div>
        </div>
      </div>
    </Container>
  );
};

export { ProductSkeleton };
