import { useNavigate } from "react-router-dom";
import { Container } from "@/components/layout/Container";
import { SectionHeader, SHTitle, SHDescription } from "@/components/common/SectionHeader";
import { categories } from "@/constant/categories";

const CATEGORY_TONES = [
  "bg-[#f0ebe1]", // parchment
  "bg-[#e8ece6]", // sage
  "bg-[#f2e6de]", // clay
  "bg-[#e6e4ec]", // lavender
  "bg-[#eae6db]", // sand
  "bg-[#e0e8e4]", // mint
  "bg-[#f0e8e0]", // peach
];

const Categories = () => {
  const navigate = useNavigate();

  return (
    <Container className="py-20">
      <SectionHeader className="pb-12">
        <SHTitle title="Browse by" color="Category" />
        <SHDescription content="Explore our curated collection across genres that inspire, thrill, and enlighten" />
      </SectionHeader>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {categories.map((cat, inx) => (
          <button
            key={inx}
            onClick={() => navigate(`/shop/${cat.name.toLowerCase()}`)}
            className="group border-border shadow-warm-sm hover:shadow-warm flex cursor-pointer flex-col items-center justify-center gap-4 rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-2"
          >
            <div
              className={`flex h-16 w-16 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 ${
                CATEGORY_TONES[inx % CATEGORY_TONES.length]
              }`}
            >
              <img
                src={cat.image}
                alt={cat.name}
                height={36}
                width={36}
                className="object-cover opacity-70 mix-blend-multiply transition-opacity group-hover:opacity-100"
              />
            </div>
            <h5 className="text-center text-sm leading-tight font-semibold capitalize">{cat.name}</h5>
          </button>
        ))}
      </div>
    </Container>
  );
};

export default Categories;
