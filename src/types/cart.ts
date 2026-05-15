import type { Book } from "./book";

export type CartItem = {
  book: Book;
  quantity: number;
};
