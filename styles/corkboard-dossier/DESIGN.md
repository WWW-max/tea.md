# UI Design System: "Corkboard & Redacted Dossier / 侦探线索板红绳与机密档案"

> **Slug:** `corkboard-dossier`
> **Category:** `Cultural & Archival`
> **One-Line Vibe:** Neo-noir investigative corkboard — push-pinned manila dossiers, white-bordered Polaroid evidence snapshots, gravity-sagging red yarn connections, and interactive black-marker redacted text (`████`).

---

## 1. Aesthetic Identity & Origin
- **Historical / Material Reference:** Investigative crime-wall corkboards connected with red yarn, declassified FOIA government manila folders, and Polaroid SX-70 instant film prints.
- **Best For:** OSINT / deep-research graph explorers, AI investigative synthesis, mystery/ARG storytelling sites, brainstorming canvases.
- **Mood Keywords:** `corkboard`, `red-yarn`, `declassified`, `redacted-spoiler`, `polaroid-evidence`

---

## 2. Color & Surface Tokens
- **Natural Cork Substrate:** `#B88B58` with dark bark flecks & warm vignette shadow
- **Manila Dossier Card:** `#EFE4C8`
- **Sticky Hypothesis Note:** `#FEF08A`
- **Polaroid Frame:** `#FFFFFF` (`12px` top/side border, `22px` bottom caption border)
- **Push-Pin & Yarn Crimson:** `#DC2626`
- **Redaction Marker Black:** `#161615`

---

## 3. Typography & Spatial Rhythm
- **Dossier Copy:** Typewriter monospace (`Courier Prime`, `Special Elite`, `ui-monospace`) with slight organic card tilt (`rotate(-1deg)` / `rotate(1deg)`).
- **Spatial Connections:** Cards are visually linked via overlaid `<svg>` quadratic Bézier curves with positive vertical sag (`midY + 28px`) simulating gravity on real yarn.

---

## 4. Signature Physical Anchors
```css
/* 1. Textured Corkboard Frame */
.cork-surface {
  background-color: #b88b58;
  background-image:
    radial-gradient(rgba(74, 46, 18, 0.22) 1.2px, transparent 0),
    radial-gradient(rgba(255, 232, 200, 0.16) 1px, transparent 0);
  background-size: 10px 10px, 14px 14px;
  background-position: 0 0, 5px 6px;
  box-shadow: inset 0 0 28px rgba(45, 25, 8, 0.45);
}

/* 2. Interactive Declassified Redaction Bar (Click/Hover to Reveal) */
.redacted-span {
  background-color: #161615;
  color: transparent;
  padding: 0 4px;
  border-radius: 2px;
  cursor: pointer;
  transition: background-color 180ms ease, color 180ms ease;
}
.redacted-span:hover, .redacted-span.revealed {
  background-color: #fef08a;
  color: #161615;
}
```

---

## 5. Signature Components
- **Nodes / Cards:** Manila dossier sheets, yellow sticky notes, and Polaroid frames anchored at top-center by a glossy 3D red push-pin.
- **Graph Edges:** Quadratic SVG red-string curves (`Q midX, midY+sag, x2, y2` with `drop-shadow`) instead of straight robotic flowchart arrows.
- **Inline Spoilers / Secrets:** `.redacted-span` black marker strips.

---

## 6. Anti-Slop Guardrails (DON'Ts)
- ❌ **NEVER** align every evidence card into a sterile, pixel-perfect 0-degree SaaS Bento grid — subtle `-1deg` to `+1.5deg` organic paper rotation sells the physical board.
- ❌ **NEVER** draw straight ruler lines between push-pins; real string sags downward under gravity!
