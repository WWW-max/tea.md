# UI Design System: "CAD Blueprint / 工程蓝图与精密制图"

> **Slug:** `cad-blueprint`
> **Category:** `Technical & Schematic`
> **One-Line Vibe:** Cyanotype architectural blueprints and aerospace CAD schematics — dual-scale metric grids, corner crosshair reticles, live pixel dimension rulers, and leader-line callouts.

---

## 1. Aesthetic Identity & Origin
- **Historical / Material Reference:** 19th-century Prussian blue cyanotype engineering drawings, AutoCAD technical layouts, and NASA spacecraft structural schematics.
- **Best For:** AI infrastructure dashboards, robotics/hardware telemetry, developer documentation, architecture portfolios.
- **Mood Keywords:** `schematic`, `metric-grid`, `crosshair`, `drafting-line`, `tolerance`

---

## 2. Color & Surface Tokens
- **Dark Mode (Prussian Blueprint):** Canvas `#09223B`, Primary Line `#E0F2FE`, Drafting Rule `rgba(56, 189, 248, 0.55)`, Sub-grid `rgba(56, 189, 248, 0.08)`
- **Light Mode (Architectural Vellum):** Canvas `#F6F9FC`, Primary Ink `#0F2942`, Drafting Rule `rgba(37, 99, 235, 0.50)`, Sub-grid `rgba(37, 99, 235, 0.06)`
- **Approval Stamp Accents:** `#34D399` (`APPROVED`), `#FBBF24` (`DRAFT REV`), `#FB7185` (`HOLD`)

---

## 3. Typography & Spatial Rhythm
- **All Text:** 100% Monospace (`JetBrains Mono`, `IBM Plex Mono`) for titles, specs, coordinates, and inputs.
- **Title Block:** Every page or major panel features a structured CAD Title Block (`DWG NO.`, `SCALE 1:1`, `REV`, `TOLERANCE`).
- **Corner Radius:** Strictly `0px` on all inner schematic boxes, inputs, buttons, and stamps.

---

## 4. Signature Physical Anchors
```css
/* 1. Dual-Scale 100px Major + 20px Minor Metric Grid */
.blueprint-canvas {
  background-color: #09223b;
  color: #e0f2fe;
  background-image:
    linear-gradient(rgba(56, 189, 248, 0.18) 1px, transparent 1px),
    linear-gradient(90deg, rgba(56, 189, 248, 0.18) 1px, transparent 1px),
    linear-gradient(rgba(56, 189, 248, 0.07) 1px, transparent 1px),
    linear-gradient(90deg, rgba(56, 189, 248, 0.07) 1px, transparent 1px);
  background-size: 100px 100px, 100px 100px, 20px 20px, 20px 20px;
}

/* 2. Corner Crosshair Reticles (+) on Schematic Containers */
.blueprint-box {
  position: relative;
  border: 1px solid rgba(56, 189, 248, 0.55);
  background: rgba(8, 47, 73, 0.35);
}
```

---

## 5. Signature Components
- **Cards:** Sharp `0px` wireframe boxes with `+` registration marks at all four corners and `├──── W: 480px ────┤` dimension rulers above/beside them.
- **Badges:** Rectangular double-bordered engineering stamps (`[STAMP: APPROVED]`).
- **Tooltips / Notes:** Orthogonal 90-degree polyline leader callouts (`[01] ──┐`).
- **Soul Widget:** Live cursor `X / Y` coordinate readout in the header title block.

---

## 6. Anti-Slop Guardrails (DON'Ts)
- ❌ **NEVER** use drop shadows (`box-shadow`) — blueprints are flat 2D technical projections.
- ❌ **NEVER** use rounded corners (`rounded-lg`, `rounded-full`) on inner schematic elements.
- ❌ **NEVER** mix proportional serif or humanist sans fonts with technical annotations.
- ❌ **NEVER** use solid opaque card fills that hide the underlying coordinate grid completely.
