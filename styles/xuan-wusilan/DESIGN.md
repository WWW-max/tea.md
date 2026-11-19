# UI Design System: "Xuan & Wusilan / 宋刻乌丝栏与宣纸朱砂印"

> **Slug:** `xuan-wusilan`
> **Category:** `Cultural & Archival`
> **One-Line Vibe:** Restrained Song-dynasty woodblock bookmaking modernized for the web — warm handmade Xuan paper grain, double-hairline Wusilan frames, carved cinnabar stone seals, and silk bookmark tabs.

---

## 1. Aesthetic Identity & Origin
- **Historical / Material Reference:** Song-dynasty woodblock editions (宋刻本乌丝栏 — outer thick border + inner hairline frame), handmade Anhui Xuan paper (宣纸), and carved Shou-shan stone cinnabar seals (朱砂闲章).
- **Best For:** Cultural & lifestyle brands, literary/poetry publications, tea/fragrance/design e-commerce, indie game portals, bilingual editorial essays.
- **Mood Keywords:** `song-woodblock`, `xuan-paper`, `wusilan-grid`, `cinnabar-seal`, `editorial-zen`

---

## 2. Color & Surface Tokens
- **Handmade Xuan Paper:** `#F7F4EB` (Warm unbleached fiber white)
- **Secondary Silk Tint:** `#EFECE1`
- **Pine-Soot Ink (松烟墨):** `#22201D` (Primary text & outer border)
- **Diluted Wash Ink (淡墨):** `#5C574F` (Secondary captions)
- **Cinnabar Seal Paste (朱砂印泥):** `#B82925` (Sole chromatic accent — used ≤ 8% of viewport area!)

---

## 3. Typography & Spatial Rhythm
- **Typography:** High-contrast editorial serif / Songti (`Noto Serif SC`, `Source Han Serif`, `Songti SC`, `Newsreader`) with generous letter-spacing (`0.06em–0.12em`) on headings and tabs.
- **Whitespace:** Leave at least 35% breathing room; avoid cramped SaaS card grids.
- **Borders:** Double-line **Wusilan (乌丝栏)** outer frame (`1.5px` outer + `3px` gap + `0.75px` inner hairline).

---

## 4. Signature Physical Anchors
```css
/* 1. Song-Dynasty Wusilan Double-Hairline Frame (乌丝栏) */
.wusilan-outer {
  background-color: #f7f4eb;
  border: 1.5px solid #2b2824;
  padding: 3px;
}
.wusilan-inner {
  border: 0.75px solid rgba(43, 40, 36, 0.55);
}

/* 2. Carved Cinnabar Seals: Yang-Carved (阳文红框白底) & Yin-Carved (阴文红底白字) */
.seal-yang {
  color: #b82925;
  border: 1.5px solid #b82925;
  background-color: rgba(184, 41, 37, 0.04);
  border-radius: 1px;
}
.seal-yin {
  background-color: #b82925;
  color: #f7f4eb;
  border: 1.5px solid #b82925;
  border-radius: 1px;
}
```

---

## 5. Signature Components
- **Badges / Tags:** Replace all `rounded-full` pills with square/rectangular Yang (`「审定」`) and Yin (`珍本`) cinnabar stone seals.
- **Navigation Tabs:** Vertical-hanging bookmark ribbons pinned to the top hairline rule that extend downward (`padding-bottom`) when active.
- **Inputs:** Minimalist bottom-only ink hairline (`border-bottom: 1px solid #22201D`) turning `#B82925` on focus.
- **Loaders:** Concentric ink-wash diffusion ripples expanding softly on paper rather than spinning circular arcs.

---

## 6. Anti-Slop Guardrails (DON'Ts)
- ❌ **NEVER** use kitschy golden dragon clipart, glossy red lanterns, or heavy faux-calligraphy brush strokes — keep it Song-dynasty architectural & minimalist!
- ❌ **NEVER** use `rounded-xl` or `rounded-full` pill tags; seals must have crisp `0px–2px` stone corners.
- ❌ **NEVER** overuse Cinnabar Red (`#B82925`) on large backgrounds; a seal only commands authority when surrounded by calm ink and paper whitespace.
