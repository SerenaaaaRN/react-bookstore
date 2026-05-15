import { Button } from "@/components/ui/Button";
import { categories } from "@/constant/categories";

type CategoryFilterProps = {
  category: string;
  setCategory: (category: string) => void;
};

const CategoryFilter = ({ category, setCategory }: CategoryFilterProps) => (
  <div className="mb-10 flex flex-wrap gap-2">
    <Button
      onClick={() => setCategory("All")}
      variant={category === "All" ? "accent" : "outline"}
      size="sm"
      className="rounded-full px-5"
    >
      All Categories
    </Button>

    {categories.map((cat) => (
      <Button
        key={cat.name}
        onClick={() => setCategory(cat.name)}
        variant={category === cat.name ? "accent" : "outline"}
        size="sm"
        className="rounded-full px-5"
      >
        {cat.name}
      </Button>
    ))}
  </div>
);

export default CategoryFilter;
