/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Book } from "@/types";
import type { Item } from "@/types";

type ShopContextType = {
  books: Book[];
  filteredBooks: Book[];
  category: string;
  setCategory: (category: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  currency: string;
  cartItems: Item[];
  setCartItems: (items: Item[]) => void;
  isLoading: boolean;
  addToCart: (book: Book, quantity?: number) => void;
  removeFromCart: (bookId: string) => void;
  updateQuantity: (bookId: string, quantity: number) => void;
  clearCart: () => void;
};

export const ShopContext = createContext<ShopContextType | null>(null);

const API_URL = import.meta.env.VITE_API_URL;

export const ShopContextProvider = ({ children }: { children: ReactNode }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState("All");
  const [cartItems, setCartItems] = useState<Item[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const currency = "Rp";

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Gagal mengambil data dari server");
        const data = await res.json();
        const formattedBooks = data.books.map((book: Book) => ({
          ...book,
          cover_image: book.cover_image || "/placeholder.svg",
        }));
        setBooks(formattedBooks);
      } catch (err) {
        console.error("Error fetching books:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const titleMatch = book.title.toLowerCase().includes(searchTerm.toLowerCase());
      const categoryMatch = category === "All" || book.category.name === category;
      return titleMatch && categoryMatch;
    });
  }, [books, searchTerm, category]);

  const addToCart = (book: Book, quantity: number = 1) => {
    setCartItems((prev) => {
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
    setCartItems((prev) => prev.filter((item) => item.book._id !== bookId));
  };

  const updateQuantity = (bookId: string, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) => (item.book._id === bookId ? { ...item, quantity: Math.max(1, quantity) } : item))
    );
  };

  const clearCart = () => setCartItems([]);

  const value = useMemo(
    () => ({
      books,
      filteredBooks,
      category,
      setCategory,
      searchTerm,
      setSearchTerm,
      currency,
      cartItems,
      setCartItems,
      isLoading,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
    }),
    [books, filteredBooks, category, searchTerm, currency, cartItems, isLoading]
  );

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("useShop must be used within a ShopContextProvider");
  }
  return context;
};
