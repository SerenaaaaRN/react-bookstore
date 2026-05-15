import { Container } from "@/components/layout/Container";
import { SectionHeader, SHTitle, SHDescription } from "@/components/common/SectionHeader";
import { Mail, Map, Phone, Clock } from "lucide-react";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactItem } from "@/components/contact/ContactItem";

const Contact = () => {
  return (
    <Container className="pt-28 pb-20">
      <SectionHeader className="pb-14">
        <SHTitle title="Get in" color="Touch" />
        <SHDescription content="Have a question, suggestion, or just want to say hello? We'd love to hear from you." />
      </SectionHeader>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <ContactForm />
        </div>

        <div className="lg:col-span-2">
          <div className="border-border bg-secondary shadow-warm-sm rounded-2xl border p-8">
            <h3 className="mb-8 text-xl font-bold">Contact Information</h3>

            <div className="space-y-6">
              <ContactItem icon={Map} title="Visit Us" detail="123 Library Lane, Oxford, OX1 2JD, United Kingdom" />
              <ContactItem
                icon={Mail}
                title="Email Us"
                detail="hello@rillahbook.co"
                href="mailto:hello@rillahbook.co"
              />
              <ContactItem icon={Phone} title="Call Us" detail="+44 123 456 7890" href="tel:+441234567890" />
              <ContactItem icon={Clock} title="Working Hours" detail="Mon – Fri: 9AM – 6PM (GMT)" />
            </div>

            <div className="ornament mt-8 mb-6">
              <span className="ornament-icon">✦</span>
            </div>

            <p className="text-muted-foreground text-center text-xs leading-relaxed italic">
              "The only thing that you absolutely have to know, is the location of the library."
              <span className="mt-1 block font-semibold not-italic">— Albert Einstein</span>
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Contact;
