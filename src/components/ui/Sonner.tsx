import { CircleCheckIcon, InfoIcon, Loader2Icon, OctagonXIcon, TriangleAlertIcon } from "lucide-react";
import { useTheme } from "next-themes";
import type { CSSProperties } from "react";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      style={
        {
          "--normal-bg": theme === "dark" ? "#1c1a17" : "#ffffff",
          "--normal-text": theme === "dark" ? "#ede8de" : "#1c1a17",
          "--normal-border": theme === "dark" ? "#332e28" : "#e2dbd0",
          "--border-radius": "12px",
        } as CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: "cn-toast border shadow-warm",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
