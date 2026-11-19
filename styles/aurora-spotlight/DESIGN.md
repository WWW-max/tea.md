# UI Design System: "Aurora Beam & Spotlight / 流光溢彩 SaaS 动效风"

> **Slug:** `aurora-spotlight`
> **Category:** `Modern Web`
> **Ecosystem Reference:** `Magic UI`, `Aceternity UI`, Linear / Raycast Launch Pages
> **One-Line Vibe:** Deep obsidian dot-matrix void illuminated by razor-thin `1.5px` spinning conic Border Beams and cursor-tracking radial Bento spotlights.

---

## 1. Aesthetic Identity & Origin
- **Reference:** High-craft modern dark-mode launch pages popularized by Magic UI and Aceternity UI — proving that luminescence looks premium **only** when 92% of the screen stays disciplined dark obsidian `#06060B` and light is concentrated into razor-sharp `1.5px` edges and interactive cursor spotlights.
- **Best For:** AI developer tool Hero sections, Bento feature grids, Pro-tier pricing highlights.

---

## 2. Color & Surface Tokens
- **Obsidian Void:** `#06060B`
- **Card Core Surface:** `#0B0B13`
- **Hairline Border:** `rgba(255, 255, 255, 0.09)`
- **Conic Beam Spectrum:** `#38BDF8` → `#A855F7` → `#F472B6`

---

## 3. Signature Physical Anchors
```css
/* 1. Razor-Thin 1.5px Rotating Conic Border Beam */
@keyframes spinBeam {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.beam-wrapper {
  position: relative;
  overflow: hidden;
  border-radius: 14px;
  padding: 1.5px;
  background: rgba(255, 255, 255, 0.08);
}
.beam-wrapper::before {
  content: "";
  position: absolute;
  inset: -120%;
  background: conic-gradient(from 0deg, transparent 0 72%, #38bdf8 82%, #a855f7 92%, #f472b6 100%);
  animation: spinBeam 4.5s linear infinite;
}
.beam-inner {
  position: relative;
  border-radius: 12.5px;
  background: #0b0b13;
}
```

---

## 4. Anti-Slop Guardrails (DON'Ts)
- ❌ **NEVER** fill entire cards or buttons with loud purple-to-pink backgrounds — keep fills `#0B0B13` dark and restrict color strictly to `1.5px` border beams and subtle `0.14` alpha radial cursor glows!
- ❌ **NEVER** animate border beams on every card on the page; reserve them for 1–2 focal elements.
