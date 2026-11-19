export type CategoryZh =
  | "工业硬件"
  | "印刷纸品"
  | "技术制图"
  | "复古屏幕"
  | "文化古籍"
  | "现代数字";

export type CategoryEn =
  | "Industrial Hardware"
  | "Print & Paper"
  | "Technical & Schematic"
  | "Retro Displays"
  | "Cultural & Archival"
  | "Modern Web";

export interface StyleTokens {
  font?: "mono" | "serif" | "sans";
  radius?: string;
  borderWidth?: string;
  shadow?: "hard" | "soft" | "none";
}

export interface StylePrimitiveInfo {
  componentName: string;
  fileName: string;
  summary: string;
  summaryEn: string;
  code: string;
}

export interface StyleEntry {
  order?: number;
  num: string;
  slug: string;
  name: string;
  en: string;
  cat: CategoryZh;
  catEn: CategoryEn;
  origin: string;
  originEn: string;
  bestFor: string;
  bestForEn: string;
  swatches: [string, string, string][]; // [hex, zhLabel, enLabel]
  donts: string[];
  dontsEn: string[];
  prompt: string;
  promptEn: string;
  tokens?: StyleTokens;
  designMd?: string;
  primitive?: StylePrimitiveInfo;
  customPreviewHtml?: string;
}

export const CATEGORY_DEFS = [
  { id: "all", zh: "全部", en: "All" },
  { id: "工业硬件", zh: "工业硬件", en: "Hardware" },
  { id: "印刷纸品", zh: "印刷纸品", en: "Print & Paper" },
  { id: "技术制图", zh: "技术制图", en: "Technical" },
  { id: "复古屏幕", zh: "复古屏幕", en: "Retro Displays" },
  { id: "文化古籍", zh: "文化古籍", en: "Cultural & Archival" },
  { id: "现代数字", zh: "现代数字", en: "Modern Web" },
] as const;
