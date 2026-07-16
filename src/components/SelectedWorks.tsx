import { useEffect, useState } from "react";
import { projects } from "../data/projects";
import type { Project } from "../data/projects";
import ImagePreviewModal from "./ImagePreviewModal";
import PdfPreviewModal from "./PdfPreviewModal";
import ProjectWheel from "./ProjectWheel";
import SectionTitle from "./SectionTitle";

const workProjects = [
  ...projects.filter((project) => project.id !== "video-insight"),
  ...projects.filter((project) => project.id === "video-insight"),
];

export default function SelectedWorks() {
  const [previewProject, setPreviewProject] = useState<Project | null>(null);

  useEffect(() => {
    if (!previewProject) return undefined;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPreviewProject(null);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [previewProject]);

  const openProject = (project: Project) => {
    if (project.href) {
      window.location.href = project.href;
      return;
    }
    if (project.pdfUrl || project.detailImage) setPreviewProject(project);
  };

  return (
    <>
      <section id="work" data-section className="relative scroll-mt-32 overflow-hidden bg-transparent py-20 md:scroll-mt-28 md:py-36">
        <div className="absolute right-[-18rem] top-48 h-[34rem] w-[34rem] rounded-full bg-ember-500/10 blur-[140px]" />
        <div className="mx-auto max-w-portfolio px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionTitle eyebrow="代表作品 / Selected Works" title="" />
            <p className="max-w-xl text-base leading-8 text-white/[0.52]">
              从工业设计、AI 产品、智能硬件到品牌视觉，将概念、形态、交互与叙事放在同一条产品体验链路里。
            </p>
          </div>

          <ProjectWheel projects={workProjects} onOpen={openProject} />
        </div>
      </section>

      {previewProject?.pdfUrl ? (
        <PdfPreviewModal project={previewProject} onClose={() => setPreviewProject(null)} />
      ) : null}
      {previewProject?.detailImage ? (
        <ImagePreviewModal project={previewProject} onClose={() => setPreviewProject(null)} />
      ) : null}
    </>
  );
}
