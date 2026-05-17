import { useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button, ButtonLink } from "@/components/ui/Button";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useShopStore } from "@/store/useShopStore";
import { SearchBar } from "../common/SearchBar";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const navLinks = [
  { title: "Home", href: "/" },
  { title: "Shop", href: "/shop" },
  { title: "Blog", href: "/blog" },
  { title: "Contact", href: "/contact" },
];

const Navbar = () => {
  const { cartItems } = useShopStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      <header className="bg-background border-border shadow-warm-sm sticky top-0 z-50 w-full border-b">
        <div className="container mx-auto flex h-18 items-center justify-between px-6 lg:px-12">
          <Link to="/" className="group flex items-center gap-2">
            <div className="flex items-baseline text-2xl font-bold tracking-tight transition-colors">
              Rillah Books
              <span className="text-accent text-4xl leading-none transition-transform duration-300 group-hover:scale-125">
                .
              </span>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <ButtonLink
                key={link.title}
                to={link.href}
                variant="ghost"
                size="sm"
                className={cn(
                  "hover-underline relative px-4 font-medium transition-colors",
                  location.pathname === link.href && "text-accent"
                )}
              >
                {link.title}
              </ButtonLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <SearchBar />

            <Link
              to="/cart"
              className="hover:bg-muted relative rounded-lg p-2.5 transition-colors"
              aria-label="Shopping cart"
            >
              <ShoppingCart className="size-5" />
              {totalItems > 0 ? (
                <span className="bg-accent shadow-warm-sm animate-fade-in absolute -top-0.5 -right-0.5 flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[10px] font-bold text-white">
                  {totalItems}
                </span>
              ) : null}
            </Link>

            <div className="border-border hidden border-l pl-3 md:block">
              <ThemeToggle />
            </div>

            <Button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="hover:bg-muted rounded-lg p-2 transition-colors md:hidden"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen ? (
        <div className="fixed inset-0 z-40 md:hidden" onClick={() => setMobileOpen(false)}>
          <div className="animate-fade-in absolute inset-0 bg-black/30" />
          <nav
            className="bg-background border-border shadow-warm-xl animate-slide-in-right absolute top-0 right-0 h-full w-72 border-l p-8 pt-24"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.title}
                  to={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "hover:bg-muted rounded-lg px-4 py-3 text-lg font-medium transition-colors",
                    location.pathname === link.href && "text-accent bg-muted"
                  )}
                >
                  {link.title}
                </Link>
              ))}
            </div>

            <div className="border-border mt-8 border-t pt-6">
              <ThemeToggle />
            </div>
          </nav>
        </div>
      ) : null}
    </>
  );
};

export default Navbar;
