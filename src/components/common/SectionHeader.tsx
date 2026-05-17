import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

const SectionHeader = ({ className, ...props }: ComponentProps<"header">) => {
  return <header className={cn("pb-4", className)} {...props} />;
};

type SHTitleProps = ComponentProps<"h3"> & {
  title?: string;
  color?: string;
};

const SHTitle = ({ className, title, color, ...props }: SHTitleProps) => {
  return (
    <h3 className={cn("text-foreground text-3xl font-bold capitalize md:text-4xl lg:text-5xl", className)} {...props}>
      {title}
      {color ? <span className="text-accent ml-3 font-extralight italic">{color}</span> : null}
    </h3>
  );
};

type SHDescriptionProps = ComponentProps<"p"> & {
  content?: string;
};

const SHDescription = ({ className, content, ...props }: SHDescriptionProps) => (
  <p className={cn("text-muted-foreground mt-5 max-w-lg text-base leading-relaxed md:text-lg", className)} {...props}>
    {content || "Discover books that spark curiosity, deliver quality, and bring inspiration to your everyday reading."}
  </p>
);

export { SectionHeader, SHTitle, SHDescription };
