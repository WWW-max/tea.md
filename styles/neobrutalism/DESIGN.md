# UI Design System: "Neo-Brutalism / 新粗野主义（粗黑描边硬阴影）"

> **Slug:** `neobrutalism`
> **Category:** `Modern Web`
> **Ecosystem Reference:** `neobrutalism-components`, Gumroad, Figma Config
> **One-Line Vibe:** Unapologetic `3px solid #000` strokes, `5px 5px 0px #000` zero-blur hard shadows, high-saturation pop color blocks, and tactile snap-to-zero button clicks.

---

## 1. Aesthetic Identity & Origin
- **Reference:** Architectural Brutalism reimagined for digital creator products by Gumroad and `neobrutalism-components` — trading sterile corporate SaaS greys for bold black comic-book outlines and joyful pop fills.
- **Best For:** Creator tools, indie SaaS pricing pages, bold marketplaces, newsletter & community portals.

---

## 2. Color & Surface Tokens
- **Cream Canvas:** `#FFFDF7`
- **Stark Stroke & Shadow:** `#000000`
- **Pop Fills:** Canary `#FFDE59`, Coral `#FF6B6B`, Lime `#A3E635`, Lavender `#C4B5FD`

---

## 3. Signature Physical Anchors
```css
/* 1. 3px Black Stroke + Zero-Blur Hard Offset Shadow */
.brutal-card {
  background-color: #ffffff;
  color: #000000;
  border: 3px solid #000000;
  box-shadow: 5px 5px 0px #000000;
}

/* 2. Snap-to-Zero Tactile Pop Button */
.brutal-btn {
  border: 2.5px solid #000000;
  box-shadow: 4px 4px 0px #000000;
  transition: transform 80ms ease, box-shadow 80ms ease;
}
.brutal-btn:active {
  transform: translate(4px, 4px);
  box-shadow: 0px 0px 0px #000000;
}
```

---

## 4. Anti-Slop Guardrails (DON'Ts)
- ❌ **NEVER** add ANY blur radius to `box-shadow` (`0 10px 15px` immediately ruins Neo-Brutalism — blur must be `0px`!).
- ❌ **NEVER** use thin `1px` light-grey borders (`#E4E4E7`).
- ❌ **NEVER** use subtle low-contrast grey text on colored cards; stick to `#000000` bold typography.
