import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: string | number) {
  const numericPrice = typeof price === "string" 
    ? parseInt(price.replace(/[^0-9]/g, "") || "0")
    : price;
  return numericPrice.toLocaleString("id-ID");
}

export function parsePrice(price: string): number {
  return parseInt(price.replace(/[^0-9]/g, "") || "0");
}

