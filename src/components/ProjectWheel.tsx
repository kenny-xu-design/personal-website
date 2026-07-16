import type { Project } from "../data/projects";
import ProjectWheelCard from "./ProjectWheelCard";
import useProjectWheel from "./useProjectWheel";

type ProjectWheelProps = {
  projects: Project[];
  onOpen: (project: Project) => void;
};

export default function ProjectWheel({ projects, onOpen }: ProjectWheelProps) {
  const wheel = useProjectWheel({ projects, onOpen });

  return (
    <div className="project-wheel-shell">
      <div className="project-wheel-toolbar" aria-live="polite">
        <p>拖动或滚动选择作品</p>
        <p><strong>{String(wheel.activeIndex + 1).padStart(2, "0")}</strong> / {String(projects.length).padStart(2, "0")}</p>
      </div>
      <div className="project-wheel-guides" aria-hidden="true" />
      <div
        ref={wheel.containerRef}
        className="project-wheel"
        role="listbox"
        aria-label="代表作品 3D 滚轮"
        aria-activedescendant={`work-${projects[wheel.activeIndex]?.id}`}
        tabIndex={0}
        onKeyDown={wheel.onKeyDown}
        onPointerDown={wheel.onPointerDown}
        onPointerMove={wheel.onPointerMove}
        onPointerUp={wheel.onPointerUp}
        onPointerCancel={wheel.onPointerUp}
      >
        <div className="project-wheel-spacer" aria-hidden="true" />
        {projects.map((project, index) => (
          <ProjectWheelCard
            key={project.id}
            project={project}
            index={index}
            isActive={index === wheel.activeIndex}
            setRef={(node) => wheel.setCardRef(index, node)}
            onCenter={() => wheel.centerProject(index)}
            onOpen={() => onOpen(project)}
          />
        ))}
        <div className="project-wheel-spacer" aria-hidden="true" />
      </div>
    </div>
  );
}
