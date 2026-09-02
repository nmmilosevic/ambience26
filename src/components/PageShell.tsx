import { SiteHeader } from "@/components/SiteHeader";

type PageShellProps = {
  children: React.ReactNode;
  overMedia?: boolean;
};

export function PageShell({ children, overMedia = false }: PageShellProps) {
  return (
    <>
      <SiteHeader overMedia={overMedia} />
      <main>{children}</main>
    </>
  );
}