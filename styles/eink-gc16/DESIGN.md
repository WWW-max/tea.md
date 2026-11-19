# UI Design System: "E-Ink GC16 / 电子墨水屏与点阵抖动"

> **Slug:** `eink-gc16`
> **Category:** `Retro & Reflective Displays`
> **One-Line Vibe:** Zero-glare electrophoretic paper (Kindle / reMarkable / Playdate) — pure carbon-on-vellum contrast, Bayer stipple dithering instead of opacity, and authentic GC16 black-flash refresh transitions.

---

## 1. Aesthetic Identity & Origin
- **Historical / Material Reference:** E-Ink Carta 1200 electrophoretic microcapsule displays (GC16 full waveform refresh & A2 fast refresh) combined with 1-bit Macintosh / Playdate stipple patterns.
- **Best For:** Deep research reports, distraction-free readers, documentation hubs, knowledge bases, calm analytics.
- **Mood Keywords:** `reflective-paper`, `zero-glow`, `bayer-dither`, `gc16-flash`, `calm-tech`

---

## 2. Color & Surface Tokens
- **E-Paper Substrate:** `#F1EEE7` (Warm matte microcapsule background)
- **Secondary Paper Shade:** `#DFDCD3` (Used sparingly for dog-ear folds or text highlights)
- **Carbon Pigment Ink:** `#141413` (Ultra-crisp electrophoretic black)
- **Hardware Bezel (Optional Frame):** `#2C2C2A`
- **Accent Colors:** **NONE.** Greyscale tones must be achieved via pixel dithering patterns (`25%`, `50%`, `75%`).

---

## 3. Typography & Spatial Rhythm
- **Reading Body & Headings:** High-legibility editorial serif (`Newsreader`, `Literata`, `Georgia`, `Songti SC`) with generous `1.7` line-height.
- **System Status & Chrome:** Crisp `12px` monospace (`ui-monospace`) framed by `1px` or `2px` solid `#141413` borders.
- **Transitions:** Disable all smooth CSS fades/slides (`transition: none`)! Use stepped discrete refresh flashes only.

---

## 4. Signature Physical Anchors
```css
/* 1. Authentic GC16 E-Ink Full-Flash Waveform Transition */
@keyframes einkFlashGC16 {
  0%   { filter: invert(0); }
  22%  { filter: invert(1) contrast(1.5); background-color: #141413; }
  52%  { filter: invert(0) brightness(1.12); background-color: #ffffff; }
  78%  { filter: invert(0.85); }
  100% { filter: invert(0); background-color: #f1eee7; }
}
.eink-refresh {
  animation: einkFlashGC16 340ms steps(1, end);
}

/* 2. 1-Bit Checkerboard / Stipple Dithering (Replaces CSS Opacity/Colors) */
.dither-50 {
  background-image:
    linear-gradient(45deg, #141413 25%, transparent 25%),
    linear-gradient(-45deg, #141413 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #141413 75%),
    linear-gradient(-45deg, transparent 75%, #141413 75%);
  background-size: 4px 4px;
  background-position: 0 0, 0 2px, 2px -2px, -2px 0;
}
```

---

## 5. Signature Components
- **Tabs & Modals:** Trigger `.eink-refresh` (`340ms` stepped invert flash) on view changes to mimic physical microcapsule pigment realignment.
- **Charts:** Bar and area charts filled with `.dither-25`, `.dither-50`, `.dither-75`, and solid `#141413` instead of colored series.
- **Bookmarks:** Geometric top-right corner dog-ear fold (`border-left` + `border-bottom`).

---

## 6. Anti-Slop Guardrails (DON'Ts)
- ❌ **NEVER** use ANY chromatic color (no blue links, green badges, or red alerts — use inverted `#141413` blocks or underlines).
- ❌ **NEVER** use smooth `ease-in-out` animations, spring physics, or blurred `box-shadow`.
- ❌ **NEVER** use `opacity: 0.4` grey text when crisp borders or stipple dithering can convey hierarchy.
- ❌ **NEVER** use `backdrop-filter: blur()`.
