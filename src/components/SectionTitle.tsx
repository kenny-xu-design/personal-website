type SectionTitleProps = {
  eyebrow: string;
  title: string;
  align?: "left" | "center";
};

export default function SectionTitle({ eyebrow, title, align = "left" }: SectionTitleProps) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-4xl"}>
      <p data-section-eyebrow className="mb-4 text-xs font-semibold uppercase tracking-[0.45em] text-ember-400">
        {eyebrow}
      </p>
      <h2 data-section-title className="text-[clamp(2.15rem,5vw,6.8rem)] font-black uppercase leading-[0.94] text-white md:leading-[0.9]">
        {title}
      </h2>
    </div>
  );
}
