import { strengths } from "../data/strengths";
import SectionTitle from "./SectionTitle";

export default function StrengthsSection() {
  return (
    <section id="strengths" data-section className="relative scroll-mt-32 overflow-hidden bg-transparent py-20 md:scroll-mt-28 md:py-36">
      <div className="absolute left-1/2 top-40 h-[38rem] w-[38rem] -translate-x-1/2 rounded-full bg-ember-gold/[0.08] blur-[150px]" />
      <div className="mx-auto max-w-portfolio px-5 sm:px-8 lg:px-12">
        <SectionTitle eyebrow="核心能力 / Core Strengths" title="个人优势" align="center" />

        <div className="mt-10 grid auto-rows-[minmax(230px,auto)] gap-4 md:mt-14 md:grid-cols-2 md:gap-5 xl:grid-cols-4">
          {strengths.map((strength, index) => (
            <article
              key={strength.title}
              data-stagger-card
              className={`group relative overflow-hidden rounded-[32px] border p-7 transition duration-300 hover:-translate-y-1 ${
                strength.accent
                  ? "border-ember-400/[0.35] bg-[linear-gradient(135deg,#FF7A1A,#FFB347)] text-black shadow-ember-strong"
                  : "glass-card"
              } ${strength.wide ? "md:col-span-2" : ""} ${index === 4 ? "xl:col-span-2" : ""}`}
              style={{ animationDelay: `${index * 90}ms` }}
            >
              <div className="absolute right-[-4rem] top-[-4rem] h-48 w-48 rounded-full border border-current/15" />
              <div className="absolute bottom-[-6rem] right-10 h-48 w-48 rounded-full bg-current/10 blur-3xl" />
              <div className="relative z-10 flex h-full flex-col justify-between">
                <span className={`text-sm font-semibold uppercase tracking-[0.32em] ${strength.accent ? "text-black/[0.48]" : "text-ember-400"}`}>
                  0{index + 1}
                </span>
                <div>
                  <h3 className={`text-3xl font-black leading-tight ${strength.accent ? "text-black" : "text-white"}`}>
                    {strength.title}
                  </h3>
                  <p className={`mt-5 max-w-xl text-base leading-8 ${strength.accent ? "text-black/[0.68]" : "text-white/[0.58]"}`}>
                    {strength.description}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
