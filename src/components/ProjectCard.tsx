import type { Project } from "../data/projects";

type ProjectCardProps = {
  project: Project;
  index: number;
};

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <article
      id={`work-${project.id}`}
      data-stagger-card
      className="glass-card group grid scroll-mt-28 overflow-hidden rounded-[28px] lg:grid-cols-[minmax(0,1.68fr)_minmax(320px,0.82fr)]"
    >
      <div data-image-reveal className="relative min-h-[300px] overflow-hidden bg-project-placeholder md:min-h-[420px]">
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

      <div className="relative flex min-h-[300px] flex-col justify-center border-t border-white/[0.08] bg-ink-950/82 p-7 md:p-10 lg:border-l lg:border-t-0">
        <p className="text-[clamp(3.5rem,7vw,6.5rem)] font-black leading-none text-[#FF9A2D]">
          {String(index + 1).padStart(2, "0")}
        </p>
        <h3 className="mt-5 max-w-xl text-3xl font-black leading-tight text-white md:text-4xl">
          {project.title}
        </h3>
        <p className="mt-3 text-sm font-semibold uppercase tracking-[0.18em] text-white/[0.42]">
          {project.type}
        </p>
        <p className="mt-7 max-w-xl text-base leading-8 text-white/[0.58]">{project.description}</p>

        <div className="mt-8 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-white/54"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-9 flex items-center gap-3 text-sm font-semibold text-white/[0.82]">
          <span className="rounded-full border border-white/[0.12] px-5 py-3 transition duration-300 group-hover:border-ember-500/70 group-hover:text-ember-400">
            View Project
          </span>
          <span className="grid h-11 w-11 place-items-center rounded-full bg-white/[0.08] text-xl transition duration-300 group-hover:translate-x-1 group-hover:bg-ember-500 group-hover:text-white">
            {"\u2192"}
          </span>
        </div>
      </div>
    </article>
  );
}
