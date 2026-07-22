export type Strength = {
  title: string;
  description: string;
  projects: string[];
  accent?: boolean;
  wide?: boolean;
};

export const strengths: Strength[] = [
  {
    title: "产品系统设计能力",
    description: "能够从用户需求、使用场景、功能结构到产品形态进行整体推导。",
    projects: ["LUMI", "Fitness Master"],
    wide: true,
  },
  {
    title: "AI 产品与 Agent 工作流",
    description: "能够设计模型、工具、数据与交互之间的任务处理链路。",
    projects: ["Video Insight", "TomatoDesk", "M5 AI Dashboard"],
    accent: true,
  },
  {
    title: "三维建模与视觉表达",
    description: "具备产品建模、材质表现、灯光搭建与高质量视觉输出能力。",
    projects: ["Fitness Master", "Care Plus", "LUMI"],
  },
  {
    title: "原型验证与落地能力",
    description: "具备 FDM 3D 打印、结构验证、柔性材料和交互原型实践。",
    projects: ["Care Plus", "LUMI", "M5 AI Dashboard"],
  },
  {
    title: "调研分析与设计叙事能力",
    description: "能够将用户研究、竞品分析和产品策略转化为清晰的设计案例表达。",
    projects: ["LUMI", "Video Insight", "Teahood"],
  },
];
