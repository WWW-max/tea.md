# UI Design System: "Looseleaf Paper & Ink Sketch / 手绘活页纸笔草图风"

> **Slug:** `looseleaf-sketch`
> **Category:** `Print & Paper`
> **Ecosystem Reference:** `kevintngo/looseleaf`, Excalidraw, Rough.js
> **One-Line Vibe:** College-ruled loose-leaf notebook paper with wobbly fountain-pen ink borders, yellow highlighter strokes, masking tape strips, and tactile doodle controls.

---

## 1. Aesthetic Identity & Origin
- **Material Reference:** 3-hole punched college-ruled loose-leaf paper (`28px` cyan-blue horizontal lines + vertical red margin line), fountain pen ink `#24292F`, and yellow chisel-tip highlighter markers.
- **Best For:** Digital gardens, collaborative whiteboards, note-taking apps, friendly indie creator tools.

---

## 2. Color & Surface Tokens
- **Notebook Paper:** `#FDFCF7`
- **Fountain Pen Ink:** `#24292F`
- **Ruled Horizontal Line:** `rgba(110, 168, 229, 0.28)`
- **Margin Rule Red:** `rgba(225, 92, 92, 0.42)`
- **Highlighter Marker:** `#FEF08A`

---

## 3. Signature Physical Anchors
```css
/* 1. College-Ruled Loose-Leaf Paper with Red Left Margin */
.sketch-notebook {
  background-color: #fdfcf7;
  color: #24292f;
  background-image:
    linear-gradient(90deg, transparent 39px, rgba(225, 92, 92, 0.42) 39px, rgba(225, 92, 92, 0.42) 41px, transparent 41px),
    repeating-linear-gradient(180deg, transparent 0px, transparent 27px, rgba(110, 168, 229, 0.28) 27px, rgba(110, 168, 229, 0.28) 28px);
}

/* 2. Organic Hand-Drawn Ink Box (Zero JS Asymmetric Elliptical Radii) */
.sketch-box {
  border: 2px solid #24292f;
  border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px;
  box-shadow: 2px 3px 0 rgba(36, 41, 47, 0.88);
}

/* 3. Chisel-Tip Yellow Highlighter Marker */
.sketch-marker {
  background: linear-gradient(104deg, transparent 0.9%, #fef08a 2.4%, rgba(254, 240, 138, 0.75) 96%, transparent 98%);
  padding: 0 4px;
}
```

---

## 4. Anti-Slop Guardrails (DON'Ts)
- ❌ **NEVER** use uniform geometric `border-radius: 12px` — hand-drawn boxes rely on asymmetric elliptical corner radii so edges feel sketched by hand.
- ❌ **NEVER** use soft blurred `box-shadow` (`0 10px 25px rgba(0,0,0,0.1)`).
- ❌ **NEVER** overlay dark glossy gradients over the ruled notebook lines.
