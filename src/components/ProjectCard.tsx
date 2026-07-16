import type { Project } from "../data/projects";

type ProjectCardProps = {
  project: Project;
  index: number;
  onPreview?: (project: Project) => void;
};

export default function ProjectCard({ project, index, onPreview }: ProjectCardProps) {
  const isPreviewable = Boolean(project.pdfUrl || project.detailImage || project.href);
  const actionClassName =
    "rounded-full border border-white/[0.12] px-5 py-3 transition duration-300 group-hover:border-ember-500/70 group-hover:text-ember-400";
  const arrowClassName =
    "grid h-11 w-11 place-items-center rounded-full bg-white/[0.08] text-xl transition duration-300 group-hover:translate-x-1 group-hover:bg-ember-500 group-hover:text-white";
  const handlePreview = () => {
    if (project.href) {
      window.location.href = project.href;
      return;
    }
    if (isPreviewable) onPreview?.(project);
  };
  const handlePreviewKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (!isPreviewable) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (project.href) window.location.href = project.href;
      else onPreview?.(project);
    }
  };

  return (
    <article
      id={`work-${project.id}`}
      data-stagger-card
      role={isPreviewable ? "button" : undefined}
      tabIndex={isPreviewable ? 0 : undefined}
      aria-label={isPreviewable ? `预览${project.title}` : undefined}
      onClick={handlePreview}
      onKeyDown={handlePreviewKeyDown}
      className={`glass-card group grid scroll-mt-28 overflow-hidden rounded-[28px] lg:grid-cols-[minmax(0,1.68fr)_minmax(320px,0.82fr)] ${
        isPreviewable ? "cursor-pointer" : ""
      }`}
    >
      <div data-image-reveal className="relative min-h-[230px] overflow-hidden bg-project-placeholder sm:min-h-[300px] md:min-h-[420px]">
        <img
          src={project.image}
          alt={project.title}
          data-parallax-image
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover opacity-0 transition duration-700 group-hover:scale-[1.04]"
          onLoad={(event) => event.currentTarget.classList.remove("opacity-0")}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/5 via-transparent to-ink-950/50" />
      </div>

      <div className="relative flex flex-col justify-center border-t border-white/[0.08] bg-ink-950/82 p-5 sm:min-h-[300px] sm:p-7 md:p-10 lg:border-l lg:border-t-0">
        <p className="text-[clamp(3.25rem,7vw,6.5rem)] font-black leading-none text-[#FF9A2D]">
          {String(index + 1).padStart(2, "0")}
        </p>
        <h3 className="mt-4 max-w-xl text-[1.75rem] font-black leading-tight text-white sm:mt-5 sm:text-3xl md:text-4xl">
          {project.titleLines
            ? project.titleLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))
            : project.title}
        </h3>
        <p className="mt-3 text-sm font-semibold uppercase tracking-[0.18em] text-white/[0.42]">
          {project.type}
        </p>
        <p className="mt-5 max-w-xl text-sm leading-7 text-white/[0.58] sm:mt-7 sm:text-base sm:leading-8">{project.description}</p>

        <div className="mt-6 flex flex-wrap gap-2 sm:mt-8">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-white/54"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-7 flex items-center gap-3 text-sm font-semibold text-white/[0.82] sm:mt-9">
          <span className={actionClassName}>查看项目</span>
          <span className={arrowClassName}>{"\u2192"}</span>
        </div>
      </div>
    </article>
  );
}
