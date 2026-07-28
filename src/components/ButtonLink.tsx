import Link from "next/link";
import { type ComponentProps } from "react";

type Variant = "solid" | "ghost" | "outline" | "light";

const styles: Record<Variant, string> = {
  solid:
    "bg-ink text-bg hover:bg-primary border border-transparent",
  ghost:
    "bg-transparent text-bg border border-bg/50 hover:bg-bg/10",
  outline:
    "bg-transparent text-ink border border-ink/20 hover:border-ink/50",
  light:
    "bg-bg text-ink hover:bg-surface border border-transparent",
};

type Props = {
  href: string;
  variant?: Variant;
  children: React.ReactNode;
  className?: string;
} & Omit<ComponentProps<"a">, "href" | "className">;

export function ButtonLink({
  href,
  variant = "solid",
  children,
  className = "",
  ...rest
}: Props) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm tracking-wide transition-colors duration-300 ease-out focus-ring ${styles[variant]} ${className}`}
      {...rest}
    >
      {children}
    </Link>
  );
}
