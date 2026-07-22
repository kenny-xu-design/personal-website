export type Lab = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  icon: string;
  status: "原型完成" | "已完成";
  image?: string;
  url?: string;
};

export const labs: Lab[] = [
  {
    id: "infinite-canvas",
    title: "Infinite Canvas",
    description: "面向工业设计探索的 AI 无限画布工作台。",
    tags: ["AI Workflow", "Canvas", "Design Tool"],
    icon: "∞",
    status: "原型完成",
    image: "/images/labs/infinite-canvas.png",
  },
  {
    id: "chrome-download-router",
    title: "Chrome 下载分流器",
    description: "根据扩展名、MIME 和规则自动整理下载内容的浏览器扩展。",
    tags: ["Chrome Extension", "Workflow", "Automation"],
    icon: "DL",
    status: "已完成",
    image: "/images/labs/chrome-download-router.png",
    url: "https://github.com/kenny-xu-design/cent-download-router",
  },
  {
    id: "sugar-care",
    title: "衡糖 GlyCare",
    description: "智能血糖监测与注射管理腕表。Smart Glucose Monitoring and Injection Management Watch.",
    tags: ["Smart Hardware", "Healthcare", "Wearable"],
    icon: "SC",
    status: "原型完成",
    image: "/images/labs/sugar-care.png",
  },
  {
    id: "m5-ai-dashboard",
    title: "M5 AI Dashboard",
    description: "USB 桌面 Agent 状态终端原型。",
    tags: ["AI Agent", "Smart Hardware", "USB Serial"],
    icon: "M5",
    status: "原型完成",
    image: "/images/labs/m5-ai-dashboard.png",
  },
  {
    id: "focus-lab",
    title: "Focus Lab",
    description: "面向学习、写作、设计与深度工作的专注力训练工具箱。",
    tags: ["Focus Tool", "Productivity", "Web App"],
    icon: "FL",
    status: "原型完成",
    image: "/images/labs/focus-lab.png",
    url: "https://focus-lab-cus.pages.dev/",
  },
];
