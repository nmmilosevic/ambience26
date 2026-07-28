import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Request an Appointment",
  description: "Book an interior design consultation with Ambience Home Design in Marbella.",
};

export default function AppointmentPage() {
  return (
    <>
      <PageHero
        title="Request an appointment"
        description="Marbella, Spain. Share a few details and the studio will contact you soon."
      />
      <section className="pb-24">
        <div className="container-pad grid gap-14 lg:grid-cols-[1fr_0.9fr]">
          <form className="space-y-6" action="#" method="post">
            <div>
              <label htmlFor="name" className="block text-sm text-muted">
                Name *
              </label>
              <input
                id="name"
                name="name"
                required
                className="mt-2 w-full border border-line bg-bg px-4 py-3 text-ink focus-ring"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm text-muted">
                Email *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-2 w-full border border-line bg-bg px-4 py-3 text-ink focus-ring"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm text-muted">
                Phone *
              </label>
              <input
                id="phone"
                name="phone"
                required
                className="mt-2 w-full border border-line bg-bg px-4 py-3 text-ink focus-ring"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm text-muted">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                className="mt-2 w-full border border-line bg-bg px-4 py-3 text-ink focus-ring"
              />
            </div>
            <label className="flex items-start gap-3 text-sm text-muted">
              <input type="checkbox" required className="mt-1" />
              <span>
                I have read and accept the{" "}
                <Link href="/legal/privacy" className="underline focus-ring">
                  Privacy Policy
                </Link>
                .
              </span>
            </label>
            <button
              type="submit"
              className="bg-ink px-7 py-3.5 text-sm text-bg transition-colors hover:bg-primary focus-ring"
            >
              Send request
            </button>
          </form>
          <aside className="border-t border-line pt-6 lg:border-t-0 lg:border-l lg:pl-10 lg:pt-0">
            <p className="font-display text-2xl tracking-[-0.02em]">
              A reputation built over the years
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Our testimonials speak for themselves. Visit the showroom or request an
              appointment and the team will follow up personally.
            </p>
            <Link
              href="/testimonials"
              className="mt-6 inline-block text-sm underline underline-offset-4 focus-ring"
            >
              See our testimonials
            </Link>
          </aside>
        </div>
      </section>
    </>
  );
}
