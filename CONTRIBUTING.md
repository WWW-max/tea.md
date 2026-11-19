# Contributing a New Style · 贡献新美学风格指南

TEA.md uses a **Zero-Conflict Self-Contained Folder Architecture**.
**You do NOT need to modify any core TypeScript/React files!** Every subfolder inside `styles/<slug>/` is automatically discovered at build time and registered into the Home Gallery, Detail Showcase, `shadcn` Registry (`/r/<slug>.json`), and Remote MCP Server (`/api/mcp`).

TEA.md 采用**「零冲突独立文件夹自动发现架构」**。
**你不需要修改任何核心前端源码！** 只需在 `styles/<slug>/` 下新建一个文件夹，构建时就会自动出现在首页画廊、独立详情页、`shadcn` 组件源与远程 MCP 接口中，多人同时提 PR 永远不会发生代码冲突。

---

## ⚡ 3-Minute Quick Start（3 分钟极速投稿）

### Step 1: Scaffold your style folder（一键生成目录骨架）
```bash
pnpm new-style bauhaus-poster
```
This creates `styles/bauhaus-poster/` with two required files:
- `meta.json` — Bilingual metadata, 4 hex swatches, `DON'Ts`, prompts, and basic visual tokens (`font`, `radius`, `borderWidth`, `shadow`).
- `DESIGN.md` — Full Markdown specification including **Signature Physical Anchors (CSS)** and **Anti-Slop Guardrails**.

*(With just `meta.json` + `DESIGN.md`, TEA.md automatically synthesizes a homepage preview card, a full detail specimen page, and an installable `shadcn` surface primitive!)*

### Step 2 (Optional): Add Custom Interactive Demo or `shadcn` Primitive
Want total creative freedom? Drop either of these optional files into `styles/<your-slug>/`:
- **`preview.html`** *(Optional)*: A self-contained HTML/CSS/JS interactive widget rendered inside an isolated sandbox on your style's detail page.
- **`primitive.tsx`** *(Optional)*: A self-contained React TypeScript "soul component" served directly when users run `npx shadcn@latest add https://.../r/<your-slug>.json`.

### Step 3: Preview & Submit PR
```bash
pnpm dev
# Open http://localhost:3000/styles/bauhaus-poster
pnpm build
```
Commit your `styles/<your-slug>/` folder and open a Pull Request!

---

## 🤖 Copy-Paste Prompt for AI Coding Agents（让 AI 帮你 1 分钟填完）

After running `pnpm new-style <your-slug>`, paste this into Cursor / Claude Code / Antigravity:

> Read `styles/risograph-print/meta.json` and `styles/risograph-print/DESIGN.md` as quality benchmarks, then fill out `styles/<your-slug>/meta.json`, `styles/<your-slug>/DESIGN.md`, and `styles/<your-slug>/primitive.tsx` for the **[Your Aesthetic Name]** design system. Include authentic historical origins, 4 accurate hex swatches, concrete CSS physical formulas, and strict Anti-Slop DON'Ts.
