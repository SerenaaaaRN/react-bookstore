import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/provider/theme-provider";
import { Toaster } from "@/components/ui/Sonner";
import Home from "@/feature/home/Home";
import Shop from "@/feature/shop/Shop";
import Blog from "@/feature/blog/Blog";
import Contact from "@/feature/contact/Contact";
import Cart from "@/feature/shop/Cart";
import CategoryShop from "@/feature/shop/CategoryShop";
import ProductDetails from "@/feature/shop/ProductDetails";
import NotFound from "@/pages/NotFound";
import DemoPage from "@/pages/DemoPage";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const App = () => {
  return (
    <ThemeProvider attribute="class" defaultTheme="white" enableSystem>
      <div className="bg-background text-foreground flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/shop/:category" element={<CategoryShop />} />
            <Route path="/shop/:category/:id" element={<ProductDetails />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />

            <Route path="/DemoPage" element={<DemoPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
      <Toaster />
    </ThemeProvider>
  );
};

export default App;
