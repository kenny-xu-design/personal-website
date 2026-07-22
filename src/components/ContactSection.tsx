export default function ContactSection() {
  return (
    <section id="contact" data-section className="relative flex min-h-[720px] scroll-mt-32 overflow-hidden bg-transparent py-20 md:min-h-screen md:scroll-mt-28 md:py-28">
      <div className="absolute bottom-[-18%] right-[-8%] h-[46rem] w-[46rem] rounded-full bg-ember-500/[0.18] blur-[150px]" />
      <div className="absolute left-[18%] top-[12%] h-80 w-80 rounded-full bg-ember-gold/[0.08] blur-[120px]" />
      <div className="noise-layer" />

      <div className="relative z-10 mx-auto flex w-full max-w-portfolio flex-col justify-center px-5 sm:px-8 lg:px-12">
        <p data-section-eyebrow className="mb-5 text-xs font-semibold uppercase tracking-[0.55em] text-ember-400">联系 / Contact</p>
        <h2 data-section-title className="max-w-6xl text-[clamp(2.75rem,8.5vw,10rem)] font-black uppercase leading-[0.9] text-white md:leading-[0.86]">
          LET&apos;S CREATE
          <span className="block">SOMETHING MEANINGFUL.</span>
        </h2>
        <p data-stagger-card className="mt-8 max-w-2xl text-lg leading-9 text-white/[0.62]">
          如果你正在寻找工业设计、AI 产品或智能硬件方向的设计合作与岗位人选，欢迎与我联系。
        </p>

        <div className="mt-12 grid max-w-5xl gap-3 md:grid-cols-2 xl:grid-cols-4">
          <a data-stagger-card href="mailto:Kenny-xu@Foxmail.com" className="glass-card rounded-[28px] p-5 hover:text-ember-400">
            <p className="text-xs uppercase tracking-[0.28em] text-white/[0.36]">Email</p>
            <p className="mt-3 text-sm text-white/[0.76]">Kenny-xu@Foxmail.com</p>
          </a>
          <a data-stagger-card href="https://github.com/kenny-xu-design" target="_blank" rel="noreferrer" className="glass-card rounded-[28px] p-5 hover:text-ember-400">
            <p className="text-xs uppercase tracking-[0.28em] text-white/[0.36]">GitHub</p>
            <p className="mt-3 text-sm text-white/[0.76]">kenny-xu-design</p>
          </a>
          <div data-stagger-card className="glass-card rounded-[28px] p-5">
            <p className="text-xs uppercase tracking-[0.28em] text-white/[0.36]">Work Intent</p>
            <p className="mt-3 text-sm text-white/[0.76]">成都｜接受外地工作机会，可远程面试</p>
          </div>
          <a data-stagger-card href="/resume/xumengle-resume.pdf" download="xumengle-resume.pdf" className="glass-card rounded-[28px] p-5 hover:text-ember-400">
            <p className="text-xs uppercase tracking-[0.28em] text-white/[0.36]">Resume</p>
            <p className="mt-3 text-sm text-white/[0.76]">下载简历 PDF</p>
          </a>
        </div>

        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="mailto:Kenny-xu@Foxmail.com"
            data-stagger-card
            className="rounded-full bg-white px-7 py-4 text-sm font-semibold text-black transition duration-300 hover:-translate-y-1 hover:bg-ember-500 hover:text-white hover:shadow-ember"
          >
            发送邮件
          </a>
          <a
            href="/resume/xumengle-resume.pdf"
            download="xumengle-resume.pdf"
            data-stagger-card
            className="rounded-full border border-white/[0.12] px-7 py-4 text-sm font-semibold text-white transition duration-300 hover:-translate-y-1 hover:border-ember-500 hover:text-ember-400 hover:shadow-ember"
          >
            下载简历
          </a>
        </div>
      </div>
    </section>
  );
}
