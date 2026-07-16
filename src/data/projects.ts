export type Project = {
  id: string;
  title: string;
  titleLines?: string[];
  type: string;
  description: string;
  image: string;
  thumbnail?: string;
  pdfUrl?: string;
  previewImages?: string[];
  detailImage?: string;
  href?: string;
  tags: string[];
  featured?: boolean;
};

export const projects: Project[] = [
  {
    id: "lumi",
    title: "LUMI AI 陪伴机器人设计",
    type: "AI 硬件 / 工业设计",
    description:
      "面向独居青年的低压力社交 AI 陪伴机器人，通过桌面交互、异步留言与场景陪伴，缓解社交启动压力。",
    image: "/images/project-lumi.webp",
    thumbnail: "/images/project-lumi-thumb.webp",
    pdfUrl: "/pdf/lumi-presentation.pdf",
    previewImages: Array.from(
      { length: 14 },
      (_, index) => `/images/lumi-pages/page-${String(index + 1).padStart(2, "0")}.webp`,
    ),
    tags: ["AI 硬件", "陪伴机器人", "CMF 设计"],
    featured: true,
  },
  {
    id: "video-insight",
    title: "视频内容解析与知识沉淀系统",
    titleLines: ["视频内容解析", "与知识沉淀系统"],
    type: "AI 产品 / 视频解析 / 知识管理",
    description:
      "将长视频转化为带时间戳的字幕、摘要、高光与结构化笔记，并沉淀至个人知识库。",
    image: "/images/project-video-insight.png",
    href: "/projects/video-insight",
    tags: ["视频解析", "知识管理", "AI 产品"],
  },
  {
    id: "fitness-master",
    title: "Fitness Master 智能健身舱",
    titleLines: ["Fitness Master", "智能健身舱"],
    type: "AI 健身 / 智能家居 / 产品设计",
    description:
      "集成深蹲架、龙门架、肋木架与 AI 健身镜，通过隐藏式结构与动作识别系统，让专业训练进入家庭空间。",
    image: "/images/project-fitness-master.webp",
    thumbnail: "/images/project-fitness-master-thumb.webp",
    pdfUrl: "/pdf/fitness-master-portfolio-v2.pdf",
    previewImages: [
      "/images/fitness-master-board.webp",
      ...Array.from(
        { length: 9 },
        (_, index) => `/images/fitness-pages/page-${String(index + 1).padStart(2, "0")}.webp`,
      ),
    ],
    tags: ["智能家居", "健身产品", "产品设计"],
  },
  {
    id: "inclusive-razor",
    title: "Care Plus 无障碍剃须刀设计",
    titleLines: ["Care Plus", "无障碍剃须刀设计"],
    type: "无障碍设计 / 产品设计",
    description:
      "面向手部障碍人群设计辅助握持剃须产品，提升日常清洁场景中的操作便利性与使用尊严。",
    image: "/images/project-razor.webp",
    detailImage: "/images/care-plus-detail.webp",
    tags: ["无障碍设计", "人机工学", "日常护理"],
  },
  {
    id: "teahood",
    title: "Teahood 吃茶品牌生态设计",
    type: "品牌系统 / 包装设计",
    description:
      "围绕茶饮品牌构建包装、视觉与周边系统，形成从品牌识别到消费体验的完整生态表达。",
    image: "/images/project-teahood.webp",
    pdfUrl: "/pdf/teahood-brand-packaging.pdf",
    previewImages: Array.from(
      { length: 14 },
      (_, index) => `/images/teahood-pages/page-${String(index + 1).padStart(2, "0")}.webp`,
    ),
    tags: ["品牌设计", "包装设计", "视觉设计"],
  },
  {
    id: "tomatodesk",
    title: "TomatoDesk",
    type: "桌面效率工具 / AI 产品实践",
    description:
      "融合番茄钟、任务管理与成果记录的桌面效率工具，建立从计划、执行到归档的专注工作闭环。",
    image: "/images/project-tomatodesk.png",
    href: "/projects/tomatodesk",
    tags: ["效率工具", "Tauri", "AI 辅助开发"],
  },
];
