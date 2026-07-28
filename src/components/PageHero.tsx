type Props = {
  title: string;
  description?: string;
  dark?: boolean;
};

export function PageHero({ title, description, dark }: Props) {
  return (
    <section
      className={`pt-32 pb-16 sm:pt-40 sm:pb-20 ${
        dark ? "bg-ink text-bg" : "bg-bg text-ink"
      }`}
    >
      <div className="container-pad max-w-4xl">
        <h1 className="font-display text-[clamp(2.25rem,5vw,4rem)] tracking-[-0.02em]">
          {title}
        </h1>
        {description ? (
          <p
            className={`mt-5 max-w-prose text-base leading-relaxed sm:text-lg ${
              dark ? "text-bg/80" : "text-muted"
            }`}
          >
            {description}
          </p>
        ) : null}
      </div>
    </section>
  );
}
