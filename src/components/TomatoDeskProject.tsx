import { useEffect } from "react";

const features = [
  ["01", "任务与计时绑定", "每一颗番茄都归属于具体任务，让投入时间与实际推进结果建立联系。"],
  ["02", "拖拽看板与状态", "在收集箱、明日计划与今日执行之间拖拽任务，清晰表达工作的下一步。"],
  ["03", "成果累计", "完成番茄后自动累积任务成果，把抽象的专注转换为可回看的进展。"],
  ["04", "归档与导出", "完成事项进入归档，并可导出成果记录，形成个人工作的长期证据。"],
];

export default function TomatoDeskProject() {
  useEffect(() => {
    const previousTitle = document.title;
    const meta = document.querySelector('meta[name="description"]');
    const previousDescription = meta?.getAttribute("content") ?? "";
    document.title = "TomatoDesk｜桌面效率工具与 AI 产品实践｜XML 作品集";
    meta?.setAttribute("content", "TomatoDesk 是融合番茄钟、任务管理、成果累计与归档导出的 Tauri 桌面效率工具，展示从问题定义到 AI 辅助开发的完整产品实践。");
    return () => {
      document.title = previousTitle;
      meta?.setAttribute("content", previousDescription);
    };
  }, []);

  return (
    <main className="min-h-screen bg-[#090807] text-white">
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#090807]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-portfolio items-center justify-between px-5 py-4 sm:px-8 lg:px-12">
          <a href="/#work-tomatodesk" className="text-sm font-semibold tracking-[.2em]">← XML / WORK</a>
          <a href="#process" className="rounded-full border border-white/15 px-4 py-2 text-xs text-white/70">设计过程</a>
        </div>
      </nav>

      <header className="mx-auto max-w-portfolio px-5 pb-14 pt-32 sm:px-8 md:pb-24 lg:px-12">
        <p className="text-sm font-semibold uppercase tracking-[.22em] text-[#ef6949]">Desktop productivity / AI product practice</p>
        <div className="mt-5 grid gap-7 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
          <h1 className="text-[clamp(3.5rem,10vw,9rem)] font-black leading-[.85] tracking-[-.07em]">Tomato<br />Desk</h1>
          <div className="max-w-xl lg:pb-2">
            <p className="text-xl leading-9 text-white/78 md:text-2xl">桌面效率工具 / AI 产品实践</p>
            <p className="mt-5 leading-8 text-white/52">融合番茄钟、任务管理与成果记录的桌面效率工具，建立从计划、执行到归档的专注工作闭环。</p>
          </div>
        </div>
        <div className="mt-12 overflow-hidden rounded-[28px] border border-white/10 shadow-[0_40px_140px_rgba(223,92,61,.18)] md:mt-20">
          <img src="/images/project-tomatodesk.png" alt="TomatoDesk 桌面应用界面" className="block h-auto w-full" />
        </div>
      </header>

      <section id="process" className="border-y border-white/10 bg-white/[.025]">
        <div className="mx-auto grid max-w-portfolio gap-12 px-5 py-20 sm:px-8 md:py-32 lg:grid-cols-2 lg:px-12">
          <p className="text-sm font-semibold uppercase tracking-[.22em] text-[#ef6949]">01 / Problem definition</p>
          <div>
            <h2 className="text-3xl font-black leading-tight md:text-5xl">效率工具很多，真正缺少的是一条不掉链的工作闭环。</h2>
            <p className="mt-8 max-w-2xl text-base leading-8 text-white/55">计划、计时和复盘常常散落在不同工具里。TomatoDesk 将任务作为主线：先收集，再安排，随后绑定番茄执行，最终把成果归档。用户不必维护复杂系统，也能持续看见工作的累积。</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-portfolio px-5 py-20 sm:px-8 md:py-32 lg:px-12">
        <div className="flex items-end justify-between gap-8">
          <div><p className="text-sm font-semibold uppercase tracking-[.22em] text-[#ef6949]">02 / Core workflow</p><h2 className="mt-4 text-4xl font-black md:text-6xl">从待办，到成果。</h2></div>
          <p className="hidden max-w-md text-right leading-7 text-white/45 md:block">收集 → 计划 → 执行 → 累计 → 归档</p>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {features.map(([number, title, copy]) => (
            <article key={number} className="rounded-[28px] border border-white/10 bg-white/[.035] p-7 md:p-10">
              <p className="text-sm font-bold text-[#ef6949]">{number}</p><h3 className="mt-10 text-2xl font-black md:text-3xl">{title}</h3><p className="mt-4 max-w-xl leading-8 text-white/50">{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#eee7dc] text-[#201d1a]">
        <div className="mx-auto grid max-w-portfolio gap-12 px-5 py-20 sm:px-8 md:py-32 lg:grid-cols-[.75fr_1.25fr] lg:px-12">
          <div><p className="text-sm font-bold uppercase tracking-[.22em] text-[#d94f32]">03 / Build</p><h2 className="mt-5 text-4xl font-black leading-tight md:text-6xl">Tauri 桌面端，<br />AI 协作开发。</h2></div>
          <div className="grid gap-8 text-base leading-8 text-[#655b51] md:grid-cols-2">
            <p><strong className="mb-2 block text-[#201d1a]">轻量本地体验</strong>使用 Tauri 构建桌面端，将任务、计时与成果数据保存在本地，获得更快启动速度与更克制的资源占用。</p>
            <p><strong className="mb-2 block text-[#201d1a]">AI 辅助开发过程</strong>AI 参与需求拆解、交互边界检查、代码实现与迭代调试；产品判断、信息架构和体验取舍仍由设计目标驱动。</p>
          </div>
        </div>
      </section>

      <footer className="mx-auto flex max-w-portfolio flex-col gap-8 px-5 py-16 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-12">
        <a href="/#work-tomatodesk" className="text-sm text-white/55 transition hover:text-white">← 返回全部作品</a>
        <div className="flex gap-3"><a href="/#work-teahood" className="rounded-full border border-white/12 px-5 py-3 text-sm">上一个：Teahood</a><a href="/#work-video-insight" className="rounded-full bg-[#df5c3d] px-5 py-3 text-sm font-semibold">下一个：Video Insight →</a></div>
      </footer>
    </main>
  );
}
