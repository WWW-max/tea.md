# UI Design System: "Swiss Apothecary & Lab Vial / 瑞士药剂标签与实验刻度"

> **Slug:** `swiss-apothecary`
> **Category:** `Technical & Schematic`
> **One-Line Vibe:** Aesop apothecary amber-glass formulation labels fused with Josef Müller-Brockmann Swiss International Typographic Style and borosilicate graduated cylinder meniscus gauges.

---

## 1. Aesthetic Identity & Origin
- **Historical / Material Reference:** 1950s Swiss International Style hairline/heavy-rule specification tables, Aesop / Le Labo compounding apothecary labels, and clinical borosilicate glassware.
- **Best For:** LLM prompt/RAG formulation benchmarks, skincare/health/coffee e-commerce, scientific tools, minimalist SaaS pricing & spec sheets.
- **Mood Keywords:** `apothecary`, `swiss-grid`, `amber-glass`, `meniscus-gauge`, `clinical-spec`

---

## 2. Color & Surface Tokens
- **Compounding Label Stock:** `#F4F1EA` (Uncoated cotton label paper)
- **Amber Glass Backdrop:** `#4B2509` → `#7C3F11` deep UV-protective amber brown
- **Printer's Black Ink:** `#121211`
- **Amber Reagent Fill:** `rgba(180, 83, 9, 0.82)` with `#78350F` meniscus rim

---

## 3. Typography & Spatial Rhythm
- **Hierarchy via Rule Thickness:** Separate sections with stark rule weight contrast — `4px solid #121211` under the main title, `2px solid` under tables, and `1px solid` between rows.
- **Data Columns:** Left-aligned bold uppercase parameter keys paired with right-aligned monospace batch/concentration values (`75.0% v/v`, `BATCH 26-K`).

---

## 4. Signature Physical Anchors
```css
/* 1. Apothecary Label Framed Against Dark Amber Glass */
.apothecary-amber-backdrop {
  background: linear-gradient(135deg, #4b2509 0%, #7c3f11 55%, #381a05 100%);
}
.apothecary-label {
  background-color: #f4f1ea;
  color: #121211;
  border: 2px solid #121211;
}

/* 2. Graduated Cylinder Meniscus Liquid Rim */
.meniscus-liquid {
  background-color: rgba(180, 83, 9, 0.82);
  border-top: 2px solid #78350f;
  transition: height 500ms cubic-bezier(0.22, 1, 0.36, 1);
}
```

---

## 5. Signature Components
- **Spec Tables:** Dense, zero-padding-waste Swiss compounding tables (`ACTIVE COMPOUND`, `CONCENTRATION`, `BATCH NO.`).
- **Progress / Quota Meters:** Vertical graduated glass cylinders with right-aligned `mL` tick marks (`125 / 250 / 375 / 500`) instead of horizontal rounded progress bars.

---

## 6. Anti-Slop Guardrails (DON'Ts)
- ❌ **NEVER** use decorative icons or emojis inside specification tables — let stark black rule lines and typography carry 100% of the structure.
- ❌ **NEVER** use soft grey `#E5E7EB` borders; apothecary labels use crisp `#121211` black rules.
- ❌ **NEVER** center-align text inside the formulation label; maintain strict flush-left / flush-right Swiss grid alignment.
