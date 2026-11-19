# 🍵 TEA.md · Tactile & Editorial Aesthetics

**[English](./README.md) | [简体中文](./README.zh-CN.md)**

> **No more instant AI slop. Steep your UI in T.E.A.**
>
> An aesthetic engine, interactive gallery, `shadcn` soul-primitive registry, and remote MCP server bringing real-world industrial, print, and cultural textures back to AI-generated interfaces.

---

## Why TEA.md?

AI coding agents ship features 10× faster, yet 90% of vibe-coded apps look identical: white rounded cards, arbitrary glassmorphism, and purple-to-blue SaaS gradients (**AI Slop**).

Developers struggle to break out of generic templates for two reasons:
1. **The Vocabulary Gap:** Most people don't know the exact industrial or print terminology (*Risograph soy-ink misregistration*, *E-Ink GC16 waveform flash*, *Braun anodized bevels*, *Song-dynasty Wusilan double rules*) to prompt an LLM effectively.
2. **Implementation Drift:** Vague text prompts yield vague results. Only by pairing **exact CSS/SVG physical formulas** + **strict Anti-Slop Guardrails (`DON'Ts`)** + **installable React soul primitives** can AI agents produce museum-grade interfaces consistently.

---

## ✨ Core Capabilities

1. **🖼 Tiled Aesthetic Gallery & Rich Specimen Showcases (`/`, `/styles/[slug]`):**
   Browse all 12 curated aesthetics side-by-side on the home gallery, then click into any style to explore a comprehensive, multi-section interactive specimen page (hero apparatus, tactile controls, form inputs, checklists, and pricing matrices) with EN/ZH bilingual support.
2. **🎛 Interactive Steep Mixer:**
   Tune surface grain (`0%–100%`), tactile key travel depth (`1px / 3px / 5px`), spatial density, and accent overrides in real time — dynamically compiling into `DESIGN.md`, `Tailwind v4 CSS Tokens`, or `.cursorrules`.
3. **🧩 `shadcn` Soul-Primitive Registry (`/r/[slug].json`):**
   Let `DESIGN.md` guide AI on 90% of standard layouts, while installing the hardest 10% physical widgets (`RotaryKnob`, `EInkRefreshStage`, `RisoMisprintCard`, `SplitFlapRow`, etc.) in one command.
4. **🔌 Built-in Remote MCP Server (`/api/mcp`):**
   Connect Cursor, Claude Code, or Antigravity directly to `/api/mcp` so your coding agent can search aesthetics, pull calibrated `DESIGN.md` specs, and fetch TSX primitives autonomously.

---

## 📚 Curated Collection (12 Blends)

| # | Slug | Aesthetic System | Category | Signature Physical Anchors |
| :--- | :--- | :--- | :--- | :--- |
| `01` | [`tactile-synth`](./styles/tactile-synth/DESIGN.md) | **Tactile Synth Hardware** | Industrial Hardware | Anodized bevels, recessed dot-matrix LCD, 3px-travel keycaps, rotary encoder |
| `02` | [`cad-blueprint`](./styles/cad-blueprint/DESIGN.md) | **CAD Blueprint Schematic** | Technical & Schematic | Dual metric grids, `+` corner reticles, live ResizeObserver pixel rulers |
| `03` | [`thermal-receipt`](./styles/thermal-receipt/DESIGN.md) | **Thermal Receipt & Halftone** | Print & Paper | Pure CSS serrated tear edges, canvas halftone dot matrix, vermilion stamp |
| `04` | [`eink-gc16`](./styles/eink-gc16/DESIGN.md) | **E-Ink Paper & Bayer Dither** | Retro Displays | Stepped `invert()` GC16 flash refresh, 1-bit checkerboard dithering |
| `05` | [`magi-terminal`](./styles/magi-terminal/DESIGN.md) | **Cassette Futurism / MAGI CRT** | Retro Displays | CRT scanlines, octagonal chamfered plates, `-45deg` hazard stripes |
| `06` | [`xuan-wusilan`](./styles/xuan-wusilan/DESIGN.md) | **Song Wusilan & Cinnabar Seal** | Cultural & Archival | Handmade Xuan paper, double-hairline Wusilan frame, Yang/Yin stone seals |
| `07` | [`split-flap`](./styles/split-flap/DESIGN.md) | **Solari Split-Flap & Boarding Pass** | Industrial Hardware | Staggered `rotateX` split-flap tiles, wayfinding yellow, side punch notches |
| `08` | [`risograph-print`](./styles/risograph-print/DESIGN.md) | **Risograph Multiply & Misprint** | Print & Paper | `isolation: isolate` + `mix-blend-mode: multiply` soy-ink plate offset |
| `09` | [`swiss-apothecary`](./styles/swiss-apothecary/DESIGN.md) | **Swiss Apothecary & Meniscus** | Technical & Schematic | Stark 4px/1px Swiss rule hierarchy, amber glass, graduated meniscus meter |
| `10` | [`analog-tape-deck`](./styles/analog-tape-deck/DESIGN.md) | **Analog Tape Deck & VU Meter** | Industrial Hardware | Brushed aluminum faceplate, tungsten backlit swinging VU needle, dual reels |
| `11` | [`atomic-purple`](./styles/atomic-purple/DESIGN.md) | **Y2K Atomic Purple PCB Shell** | Industrial Hardware | Tight `2.5px` frosted polycarbonate shell over 45°-routed SVG PCB traces |
| `12` | [`corkboard-dossier`](./styles/corkboard-dossier/DESIGN.md) | **Corkboard Red-String & Dossier** | Cultural & Archival | Cork grain, gravity-sagging Bézier red yarn, click-to-reveal `████` redactions |

---

## 🚀 Quick Start

### 1. Run Locally or Deploy on Vercel
```bash
pnpm install
pnpm dev
```

### 2. Install Soul Primitives + `DESIGN.md` via `shadcn` CLI
```bash
npx shadcn@latest add https://tea-md.vercel.app/r/tactile-synth.json
```

### 3. Connect Remote MCP Server
Add to your Cursor / Claude Code / Antigravity `mcpServers` config:
```json
{
  "mcpServers": {
    "tea-md": {
      "url": "https://tea-md.vercel.app/api/mcp"
    }
  }
}
```
Available MCP tools: `list_aesthetics`, `get_design_recipe`, `get_soul_primitive`.

### 4. Local Agent Skill
Link or copy [`SKILL.md`](./SKILL.md) and `./styles` into your agent skills directory to invoke TEA.md offline.

---

## 🤝 Contributing a New Aesthetic Blend (Zero Core Files Touched!)

Every subfolder under `styles/<slug>/` is **auto-discovered** at build time — zero central files to edit, zero merge conflicts:

```bash
pnpm new-style bauhaus-poster
```
Fill out `styles/bauhaus-poster/meta.json` + `DESIGN.md` (and optionally `preview.html` or `primitive.tsx`) and open a PR! See [`CONTRIBUTING.md`](./CONTRIBUTING.md) for the 1-minute AI prompt guide.

## 📄 License
MIT License
