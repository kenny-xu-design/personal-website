import type { Project } from "../data/projects";

type ProjectWheelCardProps = {
  project: Project;
  index: number;
  isActive: boolean;
  setRef: (node: HTMLElement | null) => void;
  onCenter: () => void;
  onOpen: () => void;
};

export default function ProjectWheelCard({ project, index, isActive, setRef, onCenter, onOpen }: ProjectWheelCardProps) {
  const handleClick = () => {
    if (isActive) onOpen();
    else onCenter();
  };

  return (
    <article
      ref={setRef}
      id={`work-${project.id}`}
      role="option"
      aria-selected={isActive}
      aria-current={isActive ? "true" : undefined}
      tabIndex={isActive ? 0 : -1}
      data-active={isActive ? "true" : "false"}
      className="project-wheel-card"
      onClick={handleClick}
    >
      <div className="project-wheel-card__image">
        <img src={project.image} alt={project.title} loading="lazy" decoding="async" />
        <span>{String(index + 1).padStart(2, "0")}</span>
      </div>
      <div className="project-wheel-card__content">
        <div>
          <p className="project-wheel-card__type">{project.type}</p>
          <h3>{project.title}</h3>
          <p className="project-wheel-card__description">{project.description}</p>
        </div>
        <div className="project-wheel-card__footer">
          <div className="project-wheel-card__tags" aria-label="项目标签">
            {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
          </div>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              if (isActive) onOpen();
              else onCenter();
            }}
          >
            查看项目 <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </article>
  );
}
