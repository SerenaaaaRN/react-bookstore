import type { FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Send } from "lucide-react";

const ContactForm = () => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-semibold tracking-wide">Your Name</label>
          <Input type="text" placeholder="John Doe" required />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold tracking-wide">Email Address</label>
          <Input type="email" placeholder="john@example.com" required />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold tracking-wide">Subject</label>
        <Input type="text" placeholder="How can we help you?" required />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold tracking-wide">Message</label>
        <textarea
          placeholder="Tell us more about your inquiry..."
          required
          rows={6}
          className="border-border bg-background text-foreground placeholder:text-muted-foreground focus-visible:border-accent focus-visible:ring-accent/20 w-full rounded-lg border px-4 py-3 font-serif text-base transition-all duration-200 outline-none focus-visible:ring-3 md:text-sm"
        />
      </div>

      <Button variant="accent" size="lg" type="submit" className="flex items-center gap-2">
        <Send className="size-4" />
        Send Message
      </Button>
    </form>
  );
};

export { ContactForm };
