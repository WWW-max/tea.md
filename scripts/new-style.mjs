#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const rawSlug = process.argv[2]?.trim().toLowerCase();

if (!rawSlug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(rawSlug)) {
  console.error("Usage: pnpm new-style <kebab-case-slug>");
  console.error("Example: pnpm new-style bauhaus-poster");
  process.exit(1);
}

const targetDir = path.join(process.cwd(), "styles", rawSlug);
if (fs.existsSync(targetDir)) {
  console.error(`Error: styles/${rawSlug} already exists.`);
  process.exit(1);
}

fs.mkdirSync(targetDir, { recursive: true });

const titleEn = rawSlug
  .split("-")
  .map((w) => w[0].toUpperCase() + w.slice(1))
  .join(" ");

const meta = {
  slug: rawSlug,
  name: `${titleEn} 美学`,
  en: titleEn,
  cat: "印刷纸品",
  catEn: "Print & Paper",
  origin: "请用一句话描述该风格的工业、印刷或文化设计史渊源。",
  originEn: "Describe the industrial, print, or cultural design origin in one crisp sentence.",
  bestFor: "独立产品官网、创意工具、编辑专栏。",
  bestForEn: "Indie landing pages, creative tools, editorial essays.",
  swatches: [
    ["#F5F2EB", "基底材质色", "Primary Substrate"],
    ["#181816", "主墨色", "Primary Ink"],
    ["#D9381E", "灵魂点缀色", "Signature Accent"],
    ["#2B5B84", "次要辅助色", "Secondary Tone"],
  ],
  donts: [
    "严禁使用千篇一律的紫蓝渐变或廉价毛玻璃阴影",
    "严禁违背该材质本身的物理边界与圆角秩序",
  ],
  dontsEn: [
    "NEVER use generic purple-to-blue gradients or blurred glassmorphism",
    "NEVER violate the physical border and corner rules of this substrate",
  ],
  prompt: `请采用「${titleEn}」美学体系构建此界面：\n1. 严格使用基底色 #F5F2EB、主墨色 #181816 与点缀色 #D9381E。\n2. 保持鲜明的边框层级与排版秩序，严禁使用廉价毛玻璃与紫蓝渐变。`,
  promptEn: `Build this interface using the "${titleEn}" aesthetic:\n1. Strictly apply substrate #F5F2EB, primary ink #181816, and accent #D9381E.\n2. Maintain crisp rule hierarchy and strictly avoid generic glassmorphism or SaaS gradients.`,
  tokens: {
    font: "mono",
    radius: "4px",
    borderWidth: "2px",
    shadow: "hard",
  },
};

const templatePath = path.join(process.cwd(), "TEMPLATE_DESIGN.md");
const designMd = fs.existsSync(templatePath)
  ? fs
      .readFileSync(templatePath, "utf-8")
      .replace("<Style Name / 美学中文名>", `${titleEn}`)
      .replace("<kebab-case-slug>", rawSlug)
  : `# UI Design System: "${titleEn}"\n\n> **Slug:** \`${rawSlug}\`\n`;

fs.writeFileSync(path.join(targetDir, "meta.json"), JSON.stringify(meta, null, 2) + "\n", "utf-8");
fs.writeFileSync(path.join(targetDir, "DESIGN.md"), designMd, "utf-8");

console.log(`\n✅ Scaffolded new style folder: styles/${rawSlug}/`);
console.log(`   ├── meta.json      (Edit bilingual metadata, swatches & prompts)`);
console.log(`   ├── DESIGN.md      (Fill in physical CSS anchors & DON'Ts)`);
console.log(`   ├── primitive.tsx  (Optional: custom shadcn React primitive)`);
console.log(`   └── preview.html   (Optional: custom standalone HTML interactive demo)\n`);
console.log(`🚀 Zero core files need editing! Run "pnpm dev" and visit http://localhost:3000/styles/${rawSlug}\n`);
