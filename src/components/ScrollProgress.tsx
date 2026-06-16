import { useEffect, useRef } from "react";

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;

    const updateProgress = () => {
      frame = 0;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      if (barRef.current) {
        barRef.current.style.height = `${Math.max(progress * 100, 4)}%`;
      }
    };

    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  return (
    <div className="fixed right-4 top-1/2 z-50 hidden h-48 w-px -translate-y-1/2 bg-white/10 md:block">
      <div
        ref={barRef}
        className="w-full rounded-full bg-ember-500 shadow-ember transition-[height] duration-150"
        style={{ height: "4%" }}
      />
    </div>
  );
}
