import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Search, X } from "lucide-react";
import { useShopStore } from "@/store/useShopStore";
import { Button } from "@/components/ui/Button";

const SearchBar = () => {
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const { setSearchTerm } = useShopStore();

  return (
    <div className="relative hidden items-center xl:flex">
      <div
        className={`transition-all duration-300 ease-in-out ${
          showSearch ? "w-72 opacity-100" : "w-0 overflow-hidden opacity-0"
        }`}
      >
        <Input
          type="text"
          placeholder="Search books..."
          className="border-border/60 shadow-warm-sm w-full rounded-full pr-10"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <Button
        onClick={() => setShowSearch(!showSearch)}
        variant="outline"
        className="bg-secondary hover:bg-muted hover:text-accent absolute right-0.5 z-10 cursor-pointer rounded-full p-2.5 transition-all duration-200"
        aria-label={showSearch ? "Close search" : "Open search"}
      >
        {showSearch ? <X className="size-4" /> : <Search className="size-4" />}
      </Button>
    </div>
  );
};

export { SearchBar };
