import { Hero } from "@/components/home/Hero";
import Categories from "@/components/home/Categories";
import NewArrivals from "@/components/home/NewArrivals";
import FeaturedBooks from "@/components/home/FeaturedBooks";
import PopularBooks from "@/components/home/PopularBooks";
import NewsLetter from "@/components/home/NewsLetter";

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
