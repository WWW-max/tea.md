# 🍵 TEA.md · Tactile & Editorial Aesthetics

> **No more instant AI slop. Steep your UI in T.E.A.**

> **Stop AI Slop.** Curated physical, industrial & cultural UI aesthetics — with live interactive demos, anti-slop `DESIGN.md` specs, and one-click prompts for AI coding agents.
>
> **专治 AI 塑料感。** 收录跨学科的物理材质、印刷工艺、工业硬件与东方古籍界面美学——提供 **实时交互 Demo + 防跑偏物理代码锚点 + 开箱即用的 `DESIGN.md` / Prompt 配方**。

---

## 🧐 为什么做这个项目？（Why TEA.md?）

AI 编程工具让写页面快了 10 倍，但也制造了严重的**「AI 审美同质化灾难（AI Slop）」**——满屏千篇一律的白底圆角卡片、毛玻璃与蓝紫渐变。

大多数开发者并不是不想做出惊艳的界面，而是卡在两个痛点上：
1. **人类叫不出词（Vocabulary Gap）**：不知道什么叫 *Risograph 孔版套色错位*、*墨水屏 GC16 反色全刷*、*博朗工业设计比例* 或 *宋刻乌丝栏*，自然写不出精准的 Prompt。
2. **AI 抓不住魂（Implementation Drift）**：只对 AI 说一句“做个复古印刷风”，AI 只会敷衍地改个泛黄背景色。只有同时提供**核心物理实现锚点（20 行关键 CSS/SVG/Canvas 公式）+ 明确的禁忌护栏（Anti-Slop Guardrails）**，AI 才能稳定输出大师级界面。

**TEA.md** 就是为此而生的**跨框架视觉配方词典**（无论你用 React、Vue、Svelte、Swift 还是原生 HTML 均可直接使用）。

---

## 📚 首批收录的 12 套美学配方（Curated Collection）

| 编号 | 词条 ID | 美学概念 | 分类 | 核心物理/视觉锚点 |
| :--- | :--- | :--- | :--- | :--- |
| `01` | [`tactile-synth`](./styles/tactile-synth/DESIGN.md) | **博朗 / TE 工业合成器** | 工业硬件 | 阳极氧化铝倒角、凹陷段码 LCD、机械键帽高光阴影、阻尼刻度旋钮 |
| `02` | [`cad-blueprint`](./styles/cad-blueprint/DESIGN.md) | **工程蓝图与 CAD 制图** | 技术制图 | 双层公制坐标网格、四角十字准星 `+`、动态像素尺寸标尺、折线引出批注 |
| `03` | [`thermal-receipt`](./styles/thermal-receipt/DESIGN.md) | **热敏小票与报刊半调网点** | 印刷纸品 | CSS 锯齿撕纸边缘、Canvas 半调网点滤镜（Halftone）、虚线副券与朱红邮戳 |
| `04` | [`eink-gc16`](./styles/eink-gc16/DESIGN.md) | **电子墨水屏 GC16 显影** | 复古屏幕 | `steps()` 反色黑闪刷新动效、1-bit Bayer 矩阵像素抖动灰阶、零渐变高对比碳墨 |
| `05` | [`magi-terminal`](./styles/magi-terminal/DESIGN.md) | **磁带未来主义 / MAGI 终端** | 复古屏幕 | CRT 扫描线遮罩、八角切角容器、黑黄 45° 斜纹警示条、荧光示波器 |
| `06` | [`xuan-wusilan`](./styles/xuan-wusilan/DESIGN.md) | **宋刻乌丝栏与宣纸朱砂印** | 文化古籍 | 宣纸微噪点肌理、内外双细线乌丝栏、阴阳文朱砂印章徽章、垂挂书签导航 |
| `07` | [`split-flap`](./styles/split-flap/DESIGN.md) | **Solari 机械翻页牌与登机牌** | 工业硬件 | 上下分叶 `rotateX` 翻牌动效、航站楼高对比导视黄、两侧半圆撕裂缺口 |
| `08` | [`risograph-print`](./styles/risograph-print/DESIGN.md) | **Risograph 孔版套色错位** | 印刷纸品 | `isolation: isolate` + `mix-blend-mode: multiply` 大豆油墨叠印、`3px` 套色偏移 |
| `09` | [`swiss-apothecary`](./styles/swiss-apothecary/DESIGN.md) | **瑞士药剂标签与弯月面量筒** | 技术制图 | 瑞士国际主义粗细黑线排版、琥珀遮光底衬、带毫升刻度的弯月面液位管 |
| `10` | [`analog-tape-deck`](./styles/analog-tape-deck/DESIGN.md) | **Hi-Fi 磁带卡座与指针 VU 表** | 工业硬件 | 拉丝金属面板、暖黄径向背光模拟红针 VU 表头、双卷轴同步旋转加载器 |
| `11` | [`atomic-purple`](./styles/atomic-purple/DESIGN.md) | **千禧透明紫外壳透视电路** | 工业硬件 | 半透明磨砂彩色塑料层 + 底层金色焊点/PCB 铜箔走线 SVG 透视 |
| `12` | [`corkboard-dossier`](./styles/corkboard-dossier/DESIGN.md) | **侦探软木塞红绳与机密档案** | 文化古籍 | 软木颗粒底板、贝塞尔重力下垂红绳连线、点击揭秘的 `████` 涂黑文本 |

---

## 🚀 三种使用方式（How to Use）

### 方式 1：在线预览 & 一键复制短 Prompt
本地启动或一键部署至 Vercel：
```bash
pnpm install
pnpm dev
```
1. 在左侧交互沙盒实时体验旋钮、盖章、翻牌与墨水屏闪烁；
2. 点击右侧 **「一键复制 Prompt」** 或下载 `DESIGN.md`，直接交给 Claude / ChatGPT / v0 / Cursor 生成页面。

### 方式 2：将 `DESIGN.md` 放入你的项目根目录（推荐）
挑选心仪的风格，将对应的 `styles/<style-id>/DESIGN.md` 复制到你项目的根目录并命名为 `DESIGN.md`，然后对 Cursor / Claude Code / Antigravity 说：
> *"请严格遵循根目录 `DESIGN.md` 中的色彩 Token、物理锚点 CSS 公式与禁忌规则（Anti-Slop Guardrails）来构建当前页面。"*

### 方式 3：作为 Agent Skill 安装
本仓库根目录自带标准 [`SKILL.md`](./SKILL.md)，将其链接或复制到你的 Agent Skills 目录后，即可在对话中直接通过风格名调用对应配方。

---

## 🗂 仓库目录结构（Next.js App Router）

服务端构建时自动读取 `styles/<slug>/DESIGN.md` 原文作为唯一数据源，无需重复维护字符串，部署至 Vercel 零配置即用：

```text
tea.md/
├── app/                       # Next.js App Router 交互图鉴站点
│   ├── page.tsx               # 服务端直读 styles/*/DESIGN.md
│   └── components/            # 12 套物理交互沙盒与配方检视器
├── styles/                    # 美学配方词条库（1 个文件夹 = 1 套完整美学体系）
│   ├── tactile-synth/
│   │   └── DESIGN.md
│   ├── risograph-print/
│   │   └── DESIGN.md
│   └── ... (共 12 套首发配方)
├── SKILL.md                   # 供 Claude Code / Cursor / Antigravity 加载的技能入口
└── TEMPLATE_DESIGN.md         # 社区贡献新美学词条的标准规范模板
```

---

## 🤝 贡献新美学词条（Contributing）

非常欢迎设计师与开发者提交你私藏的独特视觉体系（例如：包豪斯招贴风、NASA 阿波罗仪表盘、敦煌矿物设色、复古股票行情纸带等）！

1. 复制 [`TEMPLATE_DESIGN.md`](./TEMPLATE_DESIGN.md) 到 `styles/<your-style-slug>/DESIGN.md`；
2. 确保包含**明确的物理实现代码片段（Physical Anchors）**与**至少 4 条防 AI 跑偏禁忌（DON'Ts）**；
3. 在 `app/components/almanac-data.ts` 与 `sandbox-stage.tsx` 注册预览并发起 Pull Request。

## 📄 License
MIT License
