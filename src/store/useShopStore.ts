import { create } from "zustand";

import type { Book } from "@/types/book";
import type { CartItem } from "@/types/cart";

const API_URL = import.meta.env.VITE_API_URL;

type ShopState = {
  books: Book[];
  category: string;
  searchTerm: string;
  currency: string;
  cartItems: CartItem[];
  isLoading: boolean;
  booksById: Record<string, Book>;

  // Actions
  setBooks: (books: Book[]) => void;
  setCategory: (category: string) => void;
  setSearchTerm: (term: string) => void;
  setCartItems: (items: CartItem[]) => void;
  setIsLoading: (loading: boolean) => void;
  addToCart: (book: Book, quantity?: number) => void;
  removeFromCart: (bookId: string) => void;
  updateQuantity: (bookId: string, quantity: number) => void;
  clearCart: () => void;
  fetchBooks: () => Promise<void>;
};

export const useShopStore = create<ShopState>((set) => ({
  books: [],
  category: "All",
  searchTerm: "",
  currency: "Rp",
  cartItems: [],
  isLoading: true,
  booksById: {},

  setBooks: (books) => set({ books }),
  setCategory: (category) => set({ category }),
  setSearchTerm: (searchTerm) => set({ searchTerm }),
  setCartItems: (cartItems) => set({ cartItems }),
  setIsLoading: (isLoading) => set({ isLoading }),

  addToCart: (book: Book, quantity: number = 1) => {
    set((state) => {
      const existing = state.cartItems.find((item) => item.book._id === book._id);
      if (existing) {
        return {
          cartItems: state.cartItems.map((item) =>
            item.book._id === book._id ? { ...item, quantity: item.quantity + quantity } : item
          ),
        };
      }
      return { cartItems: [...state.cartItems, { book, quantity }] };
    });
  },

  removeFromCart: (bookId: string) => {
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.book._id !== bookId),
    }));
  },

  updateQuantity: (bookId: string, quantity: number) => {
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.book._id === bookId ? { ...item, quantity: Math.max(1, quantity) } : item
      ),
    }));
  },

  clearCart: () => set({ cartItems: [] }),

  fetchBooks: async () => {
    set({ isLoading: true });
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Gagal mengambil data dari server");
      const data = await res.json();
      const formattedBooks = data.books.map((book: Book) => ({
        ...book,
        cover_image: book.cover_image || "/placeholder.svg",
      }));
      const booksById = formattedBooks.reduce((acc: Record<string, Book>, book: Book) => {
        acc[book._id] = book;
        return acc;
      }, {});

      set({ books: formattedBooks, booksById });
    } catch (err) {
      console.error("Error fetching books:", err);
    } finally {
      set({ isLoading: false });
    }
  },
}));
