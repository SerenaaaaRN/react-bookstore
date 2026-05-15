import { Button } from "@/components/ui/Button";
import type { ComponentProps } from "react";

type PaginationProps = ComponentProps<"button"> & {
  direction?: "prev" | "next";
  isDisabled?: boolean;
  page?: number;
  isActive?: boolean;
};

const PageStep = ({ direction, isDisabled, onClick }: PaginationProps) => {
  const isPrev = direction === "prev";
  return (
    <Button onClick={onClick} disabled={isDisabled} variant="outline" size="sm">
      {isPrev ? " Prev" : "Next "}
    </Button>
  );
};

const PageItem = ({ page, isActive, onClick }: PaginationProps) => {
  return (
    <Button onClick={onClick} variant={isActive ? "accent" : "outline"} size="sm">
      {page}
    </Button>
  );
};

interface PaginationMainProps {
  currentPage: number;
  totalPage: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPage, onPageChange }: PaginationMainProps) => {
  if (totalPage <= 1) return null;

  return (
    <div className="mt-14 flex items-center justify-center gap-2">
      <PageStep direction="prev" isDisabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)} />

      {Array.from({ length: totalPage }, (_, index) => index + 1).map((page) => (
        <PageItem key={page} page={page} isActive={page === currentPage} onClick={() => onPageChange(page)} />
      ))}

      <PageStep direction="next" isDisabled={currentPage === totalPage} onClick={() => onPageChange(currentPage + 1)} />
    </div>
  );
};

export { Pagination };
