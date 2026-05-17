import { createContext, useContext, useState, useEffect } from "react";
import type { Book } from "@/types/book";
import type { CartItem } from "@/types/cart";
import React from "react";

const API_URL = import.meta.env.VITE_API_URL;

export type ShopState = {
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

const ShopContext = createContext<ShopState | undefined>(undefined);

export const ShopProvider = ({ children }: { children: React.ReactNode }) => {
  const [books, setBooksState] = useState<Book[]>([]);
  const [category, setCategoryState] = useState<string>("All");
  const [searchTerm, setSearchTermState] = useState<string>("");
  const [currency] = useState<string>("Rp");
  const [cartItems, setCartItemsState] = useState<CartItem[]>([]);
  const [isLoading, setIsLoadingState] = useState<boolean>(true);
  const [booksById, setBooksById] = useState<Record<string, Book>>({});

  const setBooks = (books: Book[]) => {
    setBooksState(books);
  };

  const setCategory = (category: string) => {
    setCategoryState(category);
  };

  const setSearchTerm = (term: string) => {
    setSearchTermState(term);
  };

  const setCartItems = (items: CartItem[]) => {
    setCartItemsState(items);
  };

  const setIsLoading = (loading: boolean) => {
    setIsLoadingState(loading);
  };

  const addToCart = (book: Book, quantity: number = 1) => {
    setCartItemsState((prev) => {
      const existing = prev.find((item) => item.book._id === book._id);
      if (existing) {
        return prev.map((item) =>
          item.book._id === book._id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { book, quantity }];
    });
  };

  const removeFromCart = (bookId: string) => {
    setCartItemsState((prev) => prev.filter((item) => item.book._id !== bookId));
  };

  const updateQuantity = (bookId: string, quantity: number) => {
    setCartItemsState((prev) =>
      prev.map((item) =>
        item.book._id === bookId ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  const clearCart = () => {
    setCartItemsState([]);
  };

  const fetchBooks = async () => {
    setIsLoadingState(true);
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Gagal mengambil data dari server");
      const data = await res.json();

      const formattedBooks = data.books.map((book: Book) => ({
        ...book,
        cover_image: book.cover_image || "/placeholder.svg",
      }));

      const newBooksById = formattedBooks.reduce((acc: Record<string, Book>, book: Book) => {
        acc[book._id] = book;
        return acc;
      }, {});

      setBooksState(formattedBooks);
      setBooksById(newBooksById);
    } catch (err) {
      console.error("Error fetching books:", err);
    } finally {
      setIsLoadingState(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const value: ShopState = {
    books,
    category,
    searchTerm,
    currency,
    cartItems,
    isLoading,
    booksById,
    setBooks,
    setCategory,
    setSearchTerm,
    setCartItems,
    setIsLoading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    fetchBooks,
  };

  return React.createElement(ShopContext.Provider, { value }, children);
};

export function useShopStore() {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("useShopStore must be used within a ShopProvider");
  }
  return context;
}
