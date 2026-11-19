# 🍵 TEA.md · 触感与编辑美学引擎

**[English](./README.md) | [简体中文](./README.zh-CN.md)**

> **No more instant AI slop. Steep your UI in T.E.A. (Tactile & Editorial Aesthetics).**
>
> **告别速溶塑料感 AI 界面。** 集「跨学科美学图鉴 + 真实业务样板间切换 + 参数化实时调配器 + `shadcn` 灵魂原件直装 + 远程 MCP 服务」于一体的开源界面美学引擎。

---

## 🧐 为什么做 TEA.md？

AI 编程让页面开发快了 10 倍，但也制造了严重的**「AI 审美同质化灾难（AI Slop）」**——满屏千篇一律的白底圆角卡片、毛玻璃与蓝紫渐变。

大多数开发者卡在两个核心痛点上：
1. **人类叫不出词（提示词盲区）**：不知道什么叫 *Risograph 孔版套色错位*、*墨水屏 GC16 反色全刷*、*博朗工业设计比例* 或 *宋刻乌丝栏*，自然写不出精准的 Prompt。
2. **AI 抓不住魂（复杂交互易写崩）**：纯文字约束是软性的。只有通过 **「90% 靠 `DESIGN.md` 物理锚点与禁忌护栏约束常规布局 + 10% 靠 `shadcn` Registry 直接注入高难度灵魂原件」**，才能稳定做出大师级界面。

---

## ✨ 四大核心能力

1. **🖼 平铺美学画廊与丰富完整样板页（`/` & `/styles/[slug]`）**
   首页平铺预览全部 12 套风格卡片；点进任意风格详情页后，直接呈现一张**内容丰富的沉浸式完整样板页面**（包含专属灵魂交互装置、按钮印记、表单进度条、校验清单与三栏方案卡片矩阵，支持一键切换全宽沉浸预览与全站中/英双语）。
2. **🎛 参数化茶方调配器（Interactive Steep Mixer）**
   实时拖动滑块调节**肌理噪点浓度、物理拟物键程强度、版面留白紧凑度与自定义点缀色**，舞台实时响应，右侧同步动态编译导出 `DESIGN.md`、`Tailwind v4 CSS` 或 `Cursor Rules`。
3. **🧩 `shadcn` 灵魂原件直装接口（`/r/[slug].json`）**
   无需重造通用表格轮子，专门把 AI 最容易写歪的那 10% 物理组件（阻尼刻度旋钮、墨水屏反色刷新层、双色错位卡、机械翻页牌等）连同 `DESIGN.md` 一行命令装进项目。
4. **🔌 内置零依赖远程 MCP Server（`/api/mcp`）**
   将部署后的 `/api/mcp` 地址配入 Cursor / Claude Code / Antigravity，编程 Agent 即可自动检索匹配的茶方、拉取校准后的 `DESIGN.md` 与 TSX 原件源码。

---

## 📚 已收录的 16 味美学茶方

| 编号 | 词条 ID | 美学概念 | 分类 | 核心物理/视觉锚点 |
| :--- | :--- | :--- | :--- | :--- |
| `01` | [`tactile-synth`](./styles/tactile-synth/DESIGN.md) | **博朗 / TE 工业合成器** | 工业硬件 | 阳极氧化铝倒角、凹陷段码 LCD、3px 键程键帽、阻尼刻度旋钮 |
| `02` | [`cad-blueprint`](./styles/cad-blueprint/DESIGN.md) | **工程蓝图与 CAD 制图** | 技术制图 | 双层公制坐标网格、四角十字准星 `+`、ResizeObserver 实时尺寸标尺 |
| `03` | [`thermal-receipt`](./styles/thermal-receipt/DESIGN.md) | **热敏小票与报刊网点** | 印刷纸品 | 纯 CSS 锯齿撕纸边缘、Canvas 半调网点滤镜、虚线副券与朱红橡胶戳 |
| `04` | [`eink-gc16`](./styles/eink-gc16/DESIGN.md) | **电子墨水屏 GC16 显影** | 复古屏幕 | `steps()` 反色黑闪刷新波形、1-bit Bayer 矩阵棋盘点阵灰阶 |
| `05` | [`magi-terminal`](./styles/magi-terminal/DESIGN.md) | **磁带未来主义 / MAGI 终端** | 复古屏幕 | CRT 扫描线、八角切角装甲面板、`-45deg` 黑橙斜纹警示带、荧光示波器 |
| `06` | [`xuan-wusilan`](./styles/xuan-wusilan/DESIGN.md) | **宋刻乌丝栏与宣纸朱砂印** | 文化古籍 | 手工生宣肌理、外粗内细双线乌丝栏、阴阳文朱砂石章徽章 |
| `07` | [`split-flap`](./styles/split-flap/DESIGN.md) | **Solari 机械翻页牌与登机牌** | 工业硬件 | 单字符分叶 `rotateX` 翻牌动效、航站楼导视亮黄、两侧半圆缺口 |
| `08` | [`risograph-print`](./styles/risograph-print/DESIGN.md) | **Risograph 孔版套色错位** | 印刷纸品 | `isolation: isolate` + `mix-blend-mode: multiply` 大豆油墨双版偏移 |
| `09` | [`swiss-apothecary`](./styles/swiss-apothecary/DESIGN.md) | **瑞士药剂标签与实验刻度** | 技术制图 | 瑞士国际主义 4px/1px 粗细黑线秩序、遮光琥珀玻璃、弯月面液位量筒 |
| `10` | [`analog-tape-deck`](./styles/analog-tape-deck/DESIGN.md) | **磁带卡座与暖光指针表** | 工业硬件 | 拉丝香槟银铝面板、钨丝暖黄背光模拟红针 VU 表、双轴旋转磁带仓 |
| `11` | [`atomic-purple`](./styles/atomic-purple/DESIGN.md) | **千禧透明紫掌机透视电路** | 工业硬件 | 低模糊度半透聚碳酸酯壳叠加 45° 布线镀金焊盘 SVG 电路板 |
| `12` | [`corkboard-dossier`](./styles/corkboard-dossier/DESIGN.md) | **侦探线索板红绳与机密档案** | 文化古籍 | 软木颗粒底板、重力下垂贝塞尔红绳、点击揭秘的 `████` 脱敏黑条 |
| `13` | [`looseleaf-sketch`](./styles/looseleaf-sketch/DESIGN.md) | **手绘活页纸笔草图风** | 印刷纸品 | 横格活页纸（`looseleaf`）、非对称手绘抖动线框、荧光笔涂抹与胶带贴 |
| `14` | [`pixel-8bit`](./styles/pixel-8bit/DESIGN.md) | **8-Bit 像素游戏风** | 复古屏幕 | 零圆角阶梯内倒角边框（`8bitcn`）、分格 HP/MP 血槽、`steps(1)` 跳帧按压 |
| `15` | [`neobrutalism`](./styles/neobrutalism/DESIGN.md) | **新粗野主义波普风** | 现代数字 | `3px` 纯黑粗描边、`5px` 零模糊硬投影、高饱和撞色与点击位移归零 |
| `16` | [`aurora-spotlight`](./styles/aurora-spotlight/DESIGN.md) | **流光溢彩 SaaS 动效风** | 现代数字 | 曜石点阵暗底、`1.5px` 旋转圆锥流光边框（Magic UI）与光标跟随聚光灯 |

---

## 🚀 快速开始

### 1. 本地开发或一键部署至 Vercel
```bash
pnpm install
pnpm dev
```

### 2. 通过 `shadcn` CLI 一行命令直装灵魂原件 + `DESIGN.md`
```bash
npx shadcn@latest add https://tea-md.vercel.app/r/tactile-synth.json
```

### 3. 接入远程 MCP Server
在 Cursor / Claude Code / Antigravity 中添加以下配置：
```json
{
  "mcpServers": {
    "tea-md": {
      "url": "https://tea-md.vercel.app/api/mcp"
    }
  }
}
```
支持工具：`list_aesthetics`、`get_design_recipe`、`get_soul_primitive`。

### 4. 作为本地 Agent Skill 使用
将仓库根目录下的 [`SKILL.md`](./SKILL.md) 与 `./styles` 目录复制或软链至你的 Agent Skills 目录即可离线调用。

---

## 🤝 贡献新美学茶方（零核心文件改动、零冲突！）

`styles/<slug>/` 下的每个独立文件夹都会在构建时**自动扫描发现**——无需修改任何核心源码，多人同时提 PR 永不冲突：

```bash
pnpm new-style bauhaus-poster
```
填好生成的 `meta.json` 与 `DESIGN.md`（可选附带 `preview.html` 自定义演示或 `primitive.tsx` 原件）即可直接发起 PR！详见 [`CONTRIBUTING.md`](./CONTRIBUTING.md)（内附 AI 一键生成提示词模板）。

## 📄 开源协议
MIT License
