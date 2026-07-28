import type { Metadata } from "next";
import { ButtonLink } from "@/components/ButtonLink";
import { PageHero } from "@/components/PageHero";
import { outletProducts } from "@/content/pages";

export const metadata: Metadata = {
  title: "Outlet",
  description: "Designer furniture and lighting for sale from Ambience Home Design, Marbella.",
};

export default function OutletPage() {
  return (
    <>
      <PageHero
        title="Designer products for sale"
        description="Selected indoor furniture and lighting available from the Marbella studio."
      />
      {outletProducts.map((group) => (
        <section key={group.category} className="border-t border-line section-y">
          <div className="container-pad">
            <h2 className="font-display text-3xl tracking-[-0.02em]">{group.category}</h2>
            <ul className="mt-10 divide-y divide-line">
              {group.items.map((item) => (
                <li
                  key={item.name}
                  className="grid gap-2 py-6 sm:grid-cols-[1.4fr_0.6fr_0.6fr] sm:items-baseline"
                >
                  <div>
                    <p className="font-display text-xl tracking-[-0.02em]">{item.name}</p>
                    <p className="mt-1 text-sm text-muted">{item.brand}</p>
                  </div>
                  <p className="text-sm text-muted line-through">Before: {item.before}</p>
                  <p className="text-sm text-ink">Now: {item.after}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}
      <section className="border-t border-line section-y bg-surface">
        <div className="container-pad flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-prose text-muted">
            Availability changes. Contact the studio for current stock and showroom viewing.
          </p>
          <ButtonLink href="/contact">Contact the studio</ButtonLink>
        </div>
      </section>
    </>
  );
}
