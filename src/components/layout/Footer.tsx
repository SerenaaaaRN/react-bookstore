import { Link } from "react-router-dom";
import { Container } from "../layout/Container";
import { navLinks, socialLinks } from "@/constant/navigation";
import { BookOpen, Mail, Map, BookUser } from "lucide-react";

const Footer = () => (
  <footer className="bg-primary text-primary-foreground relative mt-20 overflow-hidden">
    <div className="bg-accent h-1 w-full" />

    <Container className="py-20">
      <div className="grid grid-cols-1 gap-16 md:grid-cols-12">
        <FooterBrand />
        <FooterNav />
        <FooterContact />
      </div>
    </Container>
  </footer>
);

const FooterBrand = () => (
  <div className="flex flex-col gap-8 md:col-span-5">
    <Link to="/" className="group flex w-fit items-center gap-2">
      <div className="flex items-baseline text-3xl font-bold tracking-tight">
        Rillah<span className="text-accent text-5xl leading-none">.</span>
      </div>
    </Link>

    <div className="space-y-6">
      <blockquote className="border-accent/40 border-l-2 pl-5">
        <p className="text-lg leading-relaxed italic opacity-80">
          "A room without books is like a body without a soul."
        </p>
        <cite className="mt-2 block text-xs font-semibold tracking-[0.2em] uppercase not-italic opacity-50">
          — Cicero
        </cite>
      </blockquote>

      <p className="max-w-sm text-sm leading-relaxed opacity-60">
        Curating the world's most inspiring literature, delivered with a minimalist touch for the modern reader.
      </p>
    </div>

    <div className="flex gap-3">
      {socialLinks.map((social) => (
        <a
          key={social.label}
          href={social.href}
          className="hover:border-accent hover:bg-accent flex h-10 w-10 items-center justify-center rounded-full border border-white/15 transition-all duration-300 hover:text-white"
          aria-label={social.label}
        >
          <social.icon className="size-4" />
        </a>
      ))}
    </div>
  </div>
);

const FooterNav = () => (
  <div className="md:col-span-3">
    <h4 className="relative mb-8 text-lg font-bold tracking-wide">
      Navigation
      <span className="bg-accent absolute -bottom-3 left-0 h-0.5 w-8 rounded-full" />
    </h4>
    <ul className="flex flex-col gap-4">
      {navLinks.map((link) => (
        <li key={link.label}>
          <Link
            to={link.path.startsWith("mailto") ? "#" : link.path}
            className="hover:text-accent inline-block text-sm opacity-60 transition-all duration-200 hover:translate-x-1 hover:opacity-100"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

const FooterContact = () => (
  <div className="md:col-span-4">
    <h4 className="relative mb-8 text-lg font-bold tracking-wide">
      Get in Touch
      <span className="bg-accent absolute -bottom-3 left-0 h-0.5 w-8 rounded-full" />
    </h4>
    <ul className="space-y-5 text-sm">
      <li className="flex items-start gap-3">
        <Map className="text-accent mt-0.5 size-4 shrink-0" />
        <span className="opacity-60">123 Library Lane, Oxford, OX1 2JD, United Kingdom</span>
      </li>
      <li className="flex items-center gap-3">
        <Mail className="text-accent size-4 shrink-0" />
        <a href="mailto:hello@rillahbook.co" className="hover:text-accent opacity-60 transition-all hover:opacity-100">
          hello@rillahbook.co
        </a>
      </li>
      <li className="flex items-center gap-3">
        <BookUser className="text-accent size-4 shrink-0" />
        <a href="tel:+441234567890" className="hover:text-accent opacity-60 transition-all hover:opacity-100">
          +44 123 456 7890
        </a>
      </li>
    </ul>

    {/* Decorative book icon */}
    <div className="mt-10 flex items-center gap-3 opacity-20">
      <BookOpen className="size-5" />
      <span className="text-xs tracking-[0.3em] uppercase">Read More, Live More</span>
    </div>
  </div>
);

export default Footer;
