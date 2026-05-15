import { Hero } from "@/feature/home/Hero";
import Categories from "@/feature/home/Categories";
import NewArrivals from "@/feature/home/NewArrivals";
import FeaturedBooks from "@/feature/home/FeaturedBooks";
import PopularBooks from "@/feature/home/PopularBooks";
import NewsLetter from "@/feature/home/NewsLetter";

const Home = () => {
  return (
    <>
      <Hero />
      <Categories />
      <NewArrivals />
      <FeaturedBooks />
      <PopularBooks />
      <NewsLetter />
    </>
  );
};

export default Home;
