const navItems = [
  { label: "关于我", href: "#about" },
  { label: "作品", href: "#work" },
  { label: "能力", href: "#strengths" },
  { label: "联系", href: "#contact" },
];

export default function Header() {
  return (
    <header className="fixed left-0 right-0 top-3 z-50 px-3 sm:top-5 sm:px-8 lg:px-12">
      <nav className="mx-auto flex max-w-portfolio flex-wrap items-center justify-between gap-y-2 rounded-[26px] border border-white/[0.18] bg-ink-950/72 px-4 py-3 text-sm text-white/76 shadow-[0_22px_80px_rgba(0,0,0,0.42),inset_0_1px_0_rgba(255,255,255,0.14)] backdrop-blur-[28px] backdrop-saturate-150 md:flex-nowrap md:rounded-full md:px-6">
        <a href="#hero" className="group flex items-center gap-3 font-semibold tracking-[0.18em] text-white">
          <span className="h-2.5 w-2.5 rounded-full bg-ember-500 shadow-ember" />
          XML
        </a>
        <div className="order-3 flex w-full items-center justify-between gap-1 rounded-full border border-white/[0.12] bg-black/28 p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] md:order-none md:w-auto md:justify-start md:gap-2">
          {navItems.map((item) => (
            <a
              key={item.href}
              className="rounded-full px-3 py-2 text-xs text-white/[0.64] transition duration-300 hover:bg-white/[0.1] hover:text-ember-400 sm:px-4 sm:text-sm"
              href={item.href}
            >
              {item.label}
            </a>
          ))}
        </div>
        <a
          href="mailto:XML_Design@163.com"
          className="rounded-full border border-white/[0.16] bg-white/[0.04] px-4 py-2 text-xs text-white transition duration-300 hover:border-ember-500/70 hover:text-ember-400 hover:shadow-ember sm:text-sm md:px-5"
        >
          联系我
        </a>
      </nav>
    </header>
  );
}
