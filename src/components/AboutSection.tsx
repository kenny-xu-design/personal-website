import { experience } from "../data/experience";
import BorderGlow from "./BorderGlow";

const stats = [
  { value: "8+", label: "完整设计项目" },
  { value: "3+", label: "AI 产品实践" },
  { value: "6", label: "全流程综合能力" },
];

const info = [
  { label: "Identity", value: "工业设计师 / 产品设计师" },
  { label: "Focus", value: "智能硬件 / AI 产品 / 产品体验" },
  { label: "Email", value: "Kenny-xu@Foxmail.com", href: "mailto:Kenny-xu@Foxmail.com" },
  { label: "Location", value: "成都" },
];

const glowProps = {
  glowColor: "32 100 70",
  colors: ["#ff7a1a", "#ff9a2d", "#ffc857"],
};

export default function AboutSection() {
  return (
    <section
      id="about"
      data-section
      className="about-section relative scroll-mt-32 overflow-hidden bg-transparent md:scroll-mt-[var(--nav-height)]"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute left-[-10rem] top-24 h-96 w-96 rounded-full bg-ember-600/10 blur-[120px]" />
      <div className="absolute right-[-8rem] bottom-24 h-80 w-80 rounded-full bg-ember-500/6 blur-[130px]" />

      <div className="about-screen mx-auto max-w-portfolio px-5 sm:px-8 lg:px-12">
        <div className="about-layout grid gap-8 lg:grid-cols-[minmax(0,31fr)_minmax(0,69fr)] lg:items-stretch">
          <BorderGlow
            data-stagger-card
            className="about-portrait-card group min-h-[520px] overflow-hidden"
            backgroundColor="#06070a"
            borderRadius={34}
            glowRadius={30}
            fillOpacity={0.14}
            glowIntensity={0.68}
            {...glowProps}
          >
            <div className="about-portrait-frame relative h-full overflow-hidden rounded-[34px] p-4 sm:p-5">
              <div className="absolute inset-x-8 top-8 h-28 rounded-full bg-ember-500/[0.14] blur-3xl" />
              <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/70 to-transparent" />
              <div data-image-reveal className="relative h-full overflow-hidden rounded-[28px] bg-black">
                <img
                  src="/images/avatar.webp"
                  alt="XUMENGLE portrait"
                  data-parallax-image
                  loading="lazy"
                  decoding="async"
                  className="about-portrait-image h-full w-full object-cover opacity-0 transition duration-700"
                  onLoad={(event) => event.currentTarget.classList.remove("opacity-0")}
                />
                <div className="about-portrait-label-wrap absolute inset-x-0 bottom-0 p-4 sm:p-5">
                  <div className="about-portrait-label rounded-[22px] border border-white/10 bg-black/55 px-5 py-4 backdrop-blur-xl">
                    <p className="text-xs uppercase tracking-[0.36em] text-white/40">设计师档案</p>
                    <p className="mt-2 text-xl font-semibold text-white sm:text-2xl">工业设计 / AI 产品</p>
                  </div>
                </div>
              </div>
            </div>
          </BorderGlow>

          <div className="about-content flex flex-col gap-8">
            <div className="about-heading shrink-0 pt-1">
              <p data-section-eyebrow className="mb-4 text-xs font-semibold uppercase tracking-[0.45em] text-ember-400">关于我 / About</p>
              <div className="about-title-row flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
                <h2 data-section-title className="about-title font-black uppercase text-white">I’M XUMENGLE.</h2>
                <a
                  href="/resume/xumengle-resume.pdf"
                  download="xumengle-resume.pdf"
                  className="about-resume-link inline-flex shrink-0 items-center gap-2 rounded-full border border-ember-500/35 bg-ember-500/[0.08] px-4 py-2 text-xs font-semibold text-ember-300 transition hover:border-ember-400 hover:bg-ember-500/15 hover:text-white"
                >
                  下载简历 PDF <span aria-hidden="true">↓</span>
                </a>
              </div>
            </div>

            <BorderGlow
              data-stagger-card
              className="about-info-panel flex-1"
              backgroundColor="#08090d"
              borderRadius={34}
              glowRadius={30}
              fillOpacity={0.16}
              glowIntensity={0.7}
              {...glowProps}
            >
              <div className="about-info-inner flex h-full flex-col justify-between p-6 sm:p-7 md:p-9">
                <div className="about-info-main space-y-8">
                  <p className="about-copy max-w-4xl text-[1.08rem] leading-8 text-white/72 sm:text-[1.18rem] sm:leading-9 md:text-[1.35rem] md:leading-10">
                我是一名工业设计与 AI 产品方向的设计师，具备从用户研究、需求定义、概念设计、造型与 CMF、三维建模到原型验证的完整实践能力。同时具备 AI Agent、Web UI 与 AI 辅助开发设计经验，能够将设计思考转化为兼顾实体产品、数字交互与系统体验的可验证方案。
                  </p>

                  <div className="about-info-grid grid gap-3 md:grid-cols-2">
                    {info.map((item) => (
                      <BorderGlow
                        data-stagger-card
                        key={item.label}
                        backgroundColor="#0a0b10"
                        borderRadius={24}
                        glowRadius={18}
                        fillOpacity={0.1}
                        glowIntensity={0.52}
                        edgeSensitivity={36}
                        {...glowProps}
                      >
                        <div className="about-info-card p-4">
                          <p className="text-xs uppercase tracking-[0.28em] text-white/36">{item.label}</p>
                          {item.href ? (
                            <a className="mt-2 block text-sm text-white/78 transition hover:text-ember-400" href={item.href}>
                              {item.value}
                            </a>
                          ) : (
                            <p className="mt-2 text-sm text-white/78">{item.value}</p>
                          )}
                        </div>
                      </BorderGlow>
                    ))}
                  </div>
                </div>

                <div className="about-stats grid gap-4 sm:grid-cols-3">
                  {stats.map((stat) => (
                    <BorderGlow
                      data-stagger-card
                      key={stat.label}
                      backgroundColor="#090a0f"
                      borderRadius={28}
                      glowRadius={24}
                      fillOpacity={0.12}
                      glowIntensity={0.62}
                      edgeSensitivity={34}
                      {...glowProps}
                    >
                      <div className="about-stat-card p-5 sm:p-6">
                        <p className="about-stat-value text-4xl font-black text-ember-400 sm:text-5xl">{stat.value}</p>
                        <p className="mt-3 text-sm text-white/48">{stat.label}</p>
                      </div>
                    </BorderGlow>
                  ))}
                </div>
              </div>
            </BorderGlow>
          </div>
        </div>

        <div className="experience-section">
          <BorderGlow
            data-stagger-card
            backgroundColor="#08090d"
            borderRadius={34}
            glowRadius={28}
            fillOpacity={0.14}
            glowIntensity={0.66}
            {...glowProps}
          >
            <div className="experience-inner p-6 sm:p-7 lg:p-8">
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <p className="experience-title text-2xl font-semibold text-white/80 sm:text-3xl">项目经历</p>
                <p className="experience-eyebrow text-xs font-semibold uppercase tracking-[0.42em] text-white/34">PROJECT EXPERIENCE</p>
              </div>
              <p className="experience-timeline-label hidden text-white/36 md:block">横向时间轴</p>
            </div>

            <div className="relative">
              <div className="absolute left-0 right-0 top-4 hidden h-px bg-gradient-to-r from-ember-500 via-ember-400 to-transparent md:block" />
              <div className="grid gap-6 md:grid-cols-3 md:gap-8">
                {experience.map((item) => (
                  <div key={item.year} className="group relative pt-8 md:pt-0">
                    <span className="absolute left-0 top-0 h-3 w-3 rounded-full bg-ember-500 shadow-ember transition group-hover:shadow-ember-strong md:left-0 md:top-2" />
                    <p className="text-sm font-semibold text-ember-400">{item.year}</p>
                    <h3 className="mt-2 text-lg font-semibold text-white">{item.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-white/45">{item.note}</p>
                  </div>
                ))}
              </div>
            </div>
            </div>
          </BorderGlow>
        </div>
      </div>
    </section>
  );
}
