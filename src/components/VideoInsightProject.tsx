import { useEffect, useState } from "react";

const painPoints = [
  ["01", "观看成本高", "长视频必须线性播放，用户很难在有限时间内完成筛选与理解。"],
  ["02", "重点难定位", "有效信息散落在时间轴中，回看时无法快速跳转到原始语境。"],
  ["03", "摘要不可追溯", "脱离时间戳的总结无法验证来源，也难以复用到后续研究。"],
  ["04", "内容难沉淀", "字幕、洞察与个人笔记分散，无法自然进入长期知识管理流程。"],
];

const modes = ["摘要", "章节总结", "高光", "教程提取", "深度解读", "评论洞察"];
const completed = ["视频输入与媒体解析", "音频抽取与字幕转写", "章节、摘要与高光生成", "时间戳回链", "Markdown 导出"];
const planned = ["AI 对话后端", "笔记持久化", "Obsidian 双向同步"];

export default function VideoInsightProject() {
  const [isImageOpen, setIsImageOpen] = useState(false);

  useEffect(() => {
    const previousTitle = document.title;
    const meta = document.querySelector('meta[name="description"]');
    const previousDescription = meta?.getAttribute("content") ?? "";
    document.title = "视频内容解析与知识沉淀系统｜Video Insight｜XML 作品集";
    meta?.setAttribute("content", "将长视频转化为带时间戳的字幕、摘要、高光与结构化笔记，并导出至 Markdown 与个人知识库的 AI 产品实践。");
    return () => {
      document.title = previousTitle;
      meta?.setAttribute("content", previousDescription);
    };
  }, []);

  useEffect(() => {
    if (!isImageOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    const close = (event: KeyboardEvent) => event.key === "Escape" && setIsImageOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", close);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", close);
    };
  }, [isImageOpen]);

  return (
    <main className="min-h-screen bg-[#090807] text-white">
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#090807]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-portfolio items-center justify-between px-5 py-4 sm:px-8 lg:px-12">
          <a href="/#work-video-insight" className="text-sm font-semibold tracking-[.2em]">← XML / WORK</a>
          <a href="#process" className="rounded-full border border-white/15 px-4 py-2 text-xs text-white/70">设计过程</a>
        </div>
      </nav>

      <header className="mx-auto max-w-portfolio px-5 pb-14 pt-32 sm:px-8 md:pb-24 lg:px-12">
        <p className="text-sm font-semibold uppercase tracking-[.22em] text-[#ef6949]">Video Insight &amp; Knowledge Pipeline</p>
        <div className="mt-5 grid gap-7 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
          <h1 className="text-[clamp(3rem,7.5vw,7.5rem)] font-black leading-[.92] tracking-[-.06em]">视频内容解析<br />与知识沉淀系统</h1>
          <div className="max-w-xl lg:pb-2">
            <p className="text-xl leading-9 text-white/78 md:text-2xl">AI 产品 / 视频解析 / 知识管理</p>
            <p className="mt-5 leading-8 text-white/52">将长视频转化为带时间戳的字幕、摘要、高光与结构化笔记，并沉淀至个人知识库。</p>
            <p className="mt-5 text-sm leading-7 text-white/42">职责：产品定义、系统架构、交互设计、分析模板设计、AI 辅助开发与验收</p>
          </div>
        </div>
        <button type="button" onClick={() => setIsImageOpen(true)} aria-label="放大查看三栏系统主界面" className="group mt-12 block w-full cursor-zoom-in overflow-hidden rounded-[28px] border border-white/10 text-left shadow-[0_40px_140px_rgba(239,105,73,.14)] md:mt-20">
          <img src="/images/project-video-insight.png" alt="视频内容解析与知识沉淀系统三栏 Web UI" className="block h-auto w-full transition duration-500 group-hover:scale-[1.01]" />
        </button>
      </header>

      <section id="process" className="border-y border-white/10 bg-white/[.025]">
        <div className="mx-auto grid max-w-portfolio gap-12 px-5 py-20 sm:px-8 md:py-32 lg:grid-cols-2 lg:px-12">
          <p className="text-sm font-semibold uppercase tracking-[.22em] text-[#ef6949]">01 / Problem definition</p>
          <div><h2 className="text-3xl font-black leading-tight md:text-5xl">长视频不是没有价值，而是价值难以被快速定位、验证和复用。</h2><div className="mt-10 grid gap-5 sm:grid-cols-2">{painPoints.map(([n,t,c]) => <div key={n} className="border-t border-white/12 pt-5"><p className="text-xs font-bold text-[#ef6949]">{n}</p><h3 className="mt-3 text-xl font-bold">{t}</h3><p className="mt-3 leading-7 text-white/48">{c}</p></div>)}</div></div>
        </div>
      </section>

      <section className="mx-auto max-w-portfolio px-5 py-20 sm:px-8 md:py-32 lg:px-12">
        <p className="text-sm font-semibold uppercase tracking-[.22em] text-[#ef6949]">02 / Workflow</p>
        <h2 className="mt-4 text-4xl font-black md:text-6xl">从视频输入，到知识回链。</h2>
        <div className="mt-12 flex flex-wrap items-center gap-3 text-sm md:text-base">{["视频输入", "音频抽取", "字幕转写", "AI 分析", "时间戳回链", "Markdown / Obsidian 导出"].map((item,index,array) => <span key={item} className="contents"><span className="rounded-full border border-white/12 bg-white/[.04] px-5 py-3">{item}</span>{index < array.length - 1 ? <span className="text-[#ef6949]">→</span> : null}</span>)}</div>
      </section>

      <section className="border-y border-white/10 bg-white/[.025]">
        <div className="mx-auto grid max-w-portfolio gap-12 px-5 py-20 sm:px-8 md:py-32 lg:grid-cols-[.8fr_1.2fr] lg:px-12">
          <div><p className="text-sm font-semibold uppercase tracking-[.22em] text-[#ef6949]">03 / Three-panel workspace</p><h2 className="mt-5 text-4xl font-black leading-tight md:text-6xl">信息、原文与思考，同屏发生。</h2></div>
          <div className="grid gap-4 sm:grid-cols-3">{[["左侧","总结与章节","按时间组织全文总结与章节内容。"],["中间","视频与高光","播放原视频，并通过时间戳跳转高光。"],["右侧","AI 对话与笔记","围绕当前知识记录提问并沉淀笔记。"]].map(([side,title,copy]) => <article key={side} className="rounded-[24px] border border-white/10 bg-white/[.035] p-6"><p className="text-xs font-bold text-[#ef6949]">{side}</p><h3 className="mt-8 text-xl font-black">{title}</h3><p className="mt-4 leading-7 text-white/48">{copy}</p></article>)}</div>
        </div>
      </section>

      <section className="mx-auto max-w-portfolio px-5 py-20 sm:px-8 md:py-32 lg:px-12">
        <p className="text-sm font-semibold uppercase tracking-[.22em] text-[#ef6949]">04 / Analysis modes</p><h2 className="mt-4 text-4xl font-black md:text-6xl">一套输入，多种理解方式。</h2>
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{modes.map((mode,index) => <div key={mode} className="rounded-[22px] border border-white/10 bg-white/[.035] p-6"><span className="text-xs text-[#ef6949]">0{index + 1}</span><p className="mt-7 text-xl font-bold">{mode}</p></div>)}</div>
      </section>

      <section className="bg-[#eee7dc] text-[#201d1a]">
        <div className="mx-auto grid max-w-portfolio gap-12 px-5 py-20 sm:px-8 md:py-32 lg:grid-cols-[.75fr_1.25fr] lg:px-12">
          <div><p className="text-sm font-bold uppercase tracking-[.22em] text-[#d94f32]">05 / Build</p><h2 className="mt-5 text-4xl font-black leading-tight md:text-6xl">本地管线，<br />可追溯输出。</h2></div>
          <div><p className="leading-8 text-[#655b51]">Python · FFmpeg · yt-dlp · bilibili-cli · Faster Whisper · Ollama · Markdown · Obsidian</p><p className="mt-8 leading-8 text-[#655b51]"><strong className="block text-[#201d1a]">项目职责</strong>产品定义、系统架构、交互设计、分析模板设计、AI 辅助开发与验收。</p></div>
        </div>
      </section>

      <section className="mx-auto max-w-portfolio px-5 py-20 sm:px-8 md:py-32 lg:px-12">
        <p className="text-sm font-semibold uppercase tracking-[.22em] text-[#ef6949]">06 / Status</p><h2 className="mt-4 text-4xl font-black md:text-6xl">已完成与规划中</h2>
        <div className="mt-12 grid gap-5 md:grid-cols-2"><div className="rounded-[28px] border border-emerald-400/20 bg-emerald-400/[.05] p-7 md:p-10"><p className="text-sm font-bold text-emerald-300">已完成</p><ul className="mt-7 space-y-4 text-white/65">{completed.map(item => <li key={item}>✓　{item}</li>)}</ul></div><div className="rounded-[28px] border border-[#ef6949]/25 bg-[#ef6949]/[.05] p-7 md:p-10"><p className="text-sm font-bold text-[#ff8b71]">规划中</p><ul className="mt-7 space-y-4 text-white/65">{planned.map(item => <li key={item}>○　{item}</li>)}</ul></div></div>
      </section>

      <footer className="mx-auto flex max-w-portfolio flex-col gap-8 border-t border-white/10 px-5 py-16 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-12"><a href="/#work-video-insight" className="text-sm text-white/55 transition hover:text-white">← 返回全部作品</a><a href="/projects/tomatodesk" className="rounded-full bg-[#df5c3d] px-5 py-3 text-sm font-semibold">上一个：TomatoDesk</a></footer>

      {isImageOpen ? <div role="dialog" aria-modal="true" aria-label="三栏系统主界面大图" onClick={() => setIsImageOpen(false)} className="fixed inset-0 z-[100] grid cursor-zoom-out place-items-center bg-black/92 p-3 backdrop-blur-lg md:p-8"><button type="button" onClick={() => setIsImageOpen(false)} className="absolute right-5 top-5 rounded-full border border-white/20 bg-black/50 px-4 py-2 text-sm">关闭 ×</button><img src="/images/project-video-insight.png" alt="视频内容解析与知识沉淀系统三栏 Web UI 大图" onClick={(event) => event.stopPropagation()} className="max-h-full max-w-full cursor-default rounded-xl object-contain shadow-2xl" /></div> : null}
    </main>
  );
}
