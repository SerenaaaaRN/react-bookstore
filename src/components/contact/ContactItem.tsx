import { Map } from "lucide-react";

const ContactItem = ({
  icon: Icon,
  title,
  detail,
  href,
}: {
  icon: typeof Map;
  title: string;
  detail: string;
  href?: string;
}) => (
  <div className="flex items-start gap-4">
    <div className="bg-accent/10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
      <Icon className="text-accent size-4" />
    </div>
    <div>
      <p className="text-sm font-bold">{title}</p>
      {href ? (
        <a href={href} className="text-muted-foreground hover:text-accent text-sm transition-colors">
          {detail}
        </a>
      ) : (
        <p className="text-muted-foreground text-sm">{detail}</p>
      )}
    </div>
  </div>
);

export { ContactItem };
