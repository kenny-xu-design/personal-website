import { useEffect, useState } from "react";
import { labs } from "../data/labs";
import SectionTitle from "./SectionTitle";

export default function LabsSection() {
  const [activeLabId, setActiveLabId] = useState<string | null>(null);
  const activeLab = labs.find((lab) => lab.id === activeLabId);

  useEffect(() => {
    if (!activeLab) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveLabId(null);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [activeLab]);

  return (
    <section id="labs" data-section className="relative scroll-mt-32 overflow-hidden bg-transparent py-20 md:scroll-mt-28 md:py-28">
      <div className="absolute right-[-12rem] top-12 h-80 w-80 rounded-full bg-ember-500/[0.07] blur-[120px]" />
      <div className="relative mx-auto max-w-portfolio px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionTitle eyebrow="实验项目 / Labs & Experiments" title="探索与原型" />
          <p className="max-w-lg text-sm leading-7 text-white/[0.5]">
            轻量实验项目，用于记录 AI、工具与技术探索中的原型思考。
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {labs.map((lab, index) => (
            <article key={lab.id} data-stagger-card className="glass-card group relative min-h-[270px] overflow-hidden rounded-[28px] p-5 sm:p-6">
              {lab.image ? (
                <button
                  type="button"
                  className="absolute inset-0 cursor-zoom-in text-left"
                  aria-label={`放大查看 ${lab.title} 原始图像`}
                  onClick={() => setActiveLabId(lab.id)}
                >
                  <img
                    src={lab.image}
                    alt={`${lab.title} 原型展示`}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover opacity-35 transition duration-500 group-hover:scale-105 group-hover:opacity-50"
                  />
                </button>
              ) : (
                <div className="absolute right-[-2rem] top-[-2rem] flex h-40 w-40 items-center justify-center rounded-full border border-ember-400/15 bg-ember-500/[0.05] text-4xl font-black text-ember-300/20">
                  {lab.icon}
                </div>
              )}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/80 to-ink-950/20" />
              <div className="relative z-10 flex h-full flex-col">
                <div className="flex items-center justify-between gap-3">
                  <span className="flex h-9 min-w-9 items-center justify-center rounded-full border border-ember-400/25 bg-ember-500/[0.08] px-2 text-xs font-bold text-ember-300">
                    {lab.icon}
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[0.68rem] font-medium text-white/55">
                    {lab.status}
                  </span>
                </div>
                <div className="mt-auto pt-10">
                  <span className="text-xs font-semibold tracking-[0.2em] text-ember-400">0{index + 1}</span>
                  <h3 className="mt-3 text-xl font-black leading-tight text-white">{lab.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/[0.58]">{lab.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2" aria-label={`${lab.title} 标签`}>
                    {lab.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-white/10 bg-black/20 px-2.5 py-1 text-[0.68rem] text-white/55">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {activeLab?.image ? (
        <div
          className="project-modal-overlay fixed inset-0 z-[120] flex items-center justify-center bg-black/85 px-4 py-6 backdrop-blur-xl"
          role="dialog"
          aria-modal="true"
          aria-label={`${activeLab.title} 原始图像预览`}
          onClick={() => setActiveLabId(null)}
        >
          <div className="project-modal-panel relative w-full max-w-[min(94vw,1440px)] overflow-hidden rounded-[28px] border border-white/12 bg-ink-950 shadow-[0_30px_120px_rgba(0,0,0,0.75)]" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-4">
              <div>
                <p className="text-xs font-semibold tracking-[0.24em] text-ember-400">LABS IMAGE</p>
                <h3 className="mt-1 text-lg font-black text-white">{activeLab.title}</h3>
              </div>
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] text-xl leading-none text-white/70 transition hover:border-ember-400/40 hover:text-white"
                aria-label="关闭原始图像预览"
                onClick={() => setActiveLabId(null)}
              >
                ×
              </button>
            </div>
            <div className="max-h-[82vh] overflow-auto bg-black/45 p-3 sm:p-5">
              <img src={activeLab.image} alt={`${activeLab.title} 原始图像`} className="mx-auto h-auto max-h-none max-w-none rounded-[18px]" />
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
