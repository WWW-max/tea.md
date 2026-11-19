# UI Design System: "Risograph Print / 孔版双色套色错位油印"

> **Slug:** `risograph-print`
> **Category:** `Print & Paper`
> **One-Line Vibe:** Indie art-zine Risograph stencil printing — translucent soy-based Fluorescent Pink and Risograph Blue inks multiplying over warm uncoated paper with deliberate `3px–5px` plate misregistration.

---

## 1. Aesthetic Identity & Origin
- **Historical / Material Reference:** Riso Kagaku digital duplicators (RP/MZ series) beloved by independent zine publishers, music festival posters, and illustration studios.
- **Best For:** Creative portfolios, music/podcast landing pages, cultural events, editorial zines, design studio sites.
- **Mood Keywords:** `risograph`, `soy-ink`, `multiply-overprint`, `misregistration`, `indie-zine`

---

## 2. Color & Surface Tokens
- **Uncoated Munken Paper:** `#F8F4EA`
- **Classic Drum Pair A:** Fluorescent Pink `#FF48B0` × Risograph Blue `#0078BF` (Overprint automatically yields rich violet!)
- **Classic Drum Pair B:** Bright Orange `#FF6C2F` × Teal Green `#00838A`
- **Body Text Ink:** `#1A2433` (Deep overprint navy)

---

## 3. Typography & Spatial Rhythm
- **Headlines:** Heavy grotesque or display black (`900` weight, tight tracking) paired with typewriter monospace issue numbers (`ISSUE № 14`).
- **Ink Discipline:** Limit the entire page strictly to **2 ink drums + paper substrate**. Never introduce a 4th arbitrary UI color!

---

## 4. Signature Physical Anchors
```css
/* CRITICAL: Establish isolation on paper container so multiply doesn't bleed into host dark mode! */
.riso-paper {
  isolation: isolate;
  background-color: #f8f4ea;
  background-image:
    radial-gradient(rgba(0, 120, 191, 0.06) 1px, transparent 0),
    radial-gradient(rgba(255, 72, 176, 0.06) 1px, transparent 0);
  background-size: 7px 7px, 11px 11px;
  background-position: 0 0, 3px 4px;
}

/* Soy-Ink Overprint Layer with Plate Misregistration */
.riso-ink-plate {
  mix-blend-mode: multiply;
}
.riso-offset-layer {
  mix-blend-mode: multiply;
  transform: translate(4px, 4px);
  transition: transform 180ms ease;
}
/* Snap plates into perfect registration on hover! */
.riso-button:hover .riso-offset-layer {
  transform: translate(0, 0);
}
```

---

## 5. Signature Components
- **Buttons:** Dual-layer ink rectangles (Drum A offset `3px, 3px` behind Drum B, snapping into alignment `0, 0` on `:hover` with `mix-blend-mode: multiply`).
- **Cards:** Offset color-plate background frames shifted `4px` diagonally relative to the foreground wireframe border.

---

## 6. Anti-Slop Guardrails (DON'Ts)
- ❌ **NEVER** forget `isolation: isolate` on the paper wrapper — without it, `mix-blend-mode: multiply` turns muddy or invisible on dark parent containers.
- ❌ **NEVER** use more than 2 chromatic ink colors at once (authentic Risograph runs pass paper through 2 ink drums).
- ❌ **NEVER** use soft Gaussian `box-shadow` — depth in Riso comes strictly from flat offset ink plates.
