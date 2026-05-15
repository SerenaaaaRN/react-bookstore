import type { FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
import { Input } from "@/components/ui/Input";

const NewsLetter = () => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <Container className="py-16">
      <div className="bg-secondary relative overflow-hidden rounded-3xl p-8 shadow-lg md:p-16">
        <div className="relative z-10">
          <h2 className="text-dark-surface mb-6 text-3xl font-bold md:text-5xl">Join Our Literary Circle</h2>
          <p className="text-dark-surface mb-10 text-lg leading-relaxed italic">
            Curated book recommendations, exclusive author interviews, and limited edition releases — directly in your
            inbox.
          </p>

          <form className="flex max-w-lg flex-row gap-4" onSubmit={handleSubmit}>
            <Input type="email" placeholder="Enter your email address..." className="grow" required />
            <Button variant="primary" type="submit" className="whitespace-nowrap shadow-lg">
              Subscribe Today
            </Button>
          </form>

          <p className="mt-8 text-sm text-gray-500">We respect your privacy. Unsubscribe at any time.</p>
        </div>
      </div>
    </Container>
  );
};

export default NewsLetter;
