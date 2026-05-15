import { Container } from "@/components/layout/Container";
import { SectionHeader, SHTitle, SHDescription } from "@/components/common/SectionHeader";
import { blogs } from "@/constant/blogs";
import { BlogCard } from "@/components/blog/BlogCard";

const Blog = () => {
  return (
    <Container className="pt-28 pb-20">
      <SectionHeader className="pb-14">
        <SHTitle title="Our" color="Journal" />
        <SHDescription content="Stories, insights, and recommendations from the world of literature" />
      </SectionHeader>

      {blogs.length > 0 && <BlogCard blog={blogs[0]} isHero />}

      <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
        {blogs.slice(1).map((b) => (
          <BlogCard key={b.title} blog={b} />
        ))}
      </div>
    </Container>
  );
};

export default Blog;
