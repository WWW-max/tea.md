# UI Design System: "Thermal Receipt & Halftone / 热敏小票与报刊半调网点"

> **Slug:** `thermal-receipt`
> **Category:** `Print & Paper`
> **One-Line Vibe:** Convenience-store POS thermal paper slips paired with 1-bit newspaper halftone dot matrices, serrated tear-off edges, vermilion ink stamps, and UPC barcodes.

---

## 1. Aesthetic Identity & Origin
- **Historical / Material Reference:** Epson TM-T88 thermal receipt printers, vintage broadsheet newspaper halftone photoengraving, and perforated ticket stubs.
- **Best For:** Expense/billing apps, AI token usage statements, annual wrap-up summaries, indie blogs & changelogs.
- **Mood Keywords:** `thermal-slip`, `serrated-edge`, `halftone-dots`, `perforated`, `rubber-stamp`

---

## 2. Color & Surface Tokens
- **Desk Backdrop:** `#DCD8CF` (Neutral craft mat to frame the paper slip)
- **Thermal Paper:** `#FAF7EF` (Warm off-white heat-sensitive paper)
- **Carbon Thermal Ink:** `#191918` (92% deep charcoal-black, slightly softer than `#000`)
- **Faded Thermal Grey:** `#57554F`
- **Stamp Ink Accent:** `#C82824` (Vermilion rubber-stamp ink)

---

## 3. Typography & Spatial Rhythm
- **Font Stack:** Narrow monospace (`Space Mono`, `JetBrains Mono`, `Courier Prime`), `12px–14px`, `tabular-nums`.
- **Dividers:** Never use solid grey `<hr>` lines — use ASCII receipt dividers (`================================` or `--------------------------------`) or `2px dashed` tear perforations (`✂ - - - -`).
- **Layout Width:** Constrain primary slips to narrow column widths (`340px–460px`) or multi-slip columns rather than stretching `100%` across wide monitors.

---

## 4. Signature Physical Anchors
```css
/* 1. Pure CSS Serrated Tear-Off Top & Bottom Edges */
.receipt-saw-top {
  height: 10px;
  background:
    linear-gradient(-45deg, #faf7ef 5px, transparent 0),
    linear-gradient(45deg, #faf7ef 5px, transparent 0);
  background-size: 10px 10px;
  background-repeat: repeat-x;
}
.receipt-saw-bottom {
  height: 10px;
  background:
    linear-gradient(-135deg, #faf7ef 5px, transparent 0),
    linear-gradient(135deg, #faf7ef 5px, transparent 0);
  background-size: 10px 10px;
  background-repeat: repeat-x;
}

/* 2. Rubber Stamp Slam Animation */
@keyframes stampSlam {
  0% { transform: scale(2.2) rotate(-18deg); opacity: 0; }
  70% { transform: scale(0.95) rotate(-8deg); opacity: 1; }
  100% { transform: scale(1) rotate(-10deg); opacity: 0.88; }
}
```

---

## 5. Signature Components
- **Cards:** Narrow vertical paper slips capped with `.receipt-saw-top` and `.receipt-saw-bottom` zig-zag edges.
- **Images / Avatars:** Rendered through a black-and-white circular halftone dot matrix (`<canvas>` luminance-to-dot-radius mapping).
- **Badges:** Angled (`-10deg`), slightly distressed double-border vermilion stamps (`PAID · 2026`).
- **Footers:** Vector vertical-bar UPC/Code-128 barcodes and detachable perforated coupon stubs.

---

## 6. Anti-Slop Guardrails (DON'Ts)
- ❌ **NEVER** place full-color glossy photographs directly onto thermal paper without monochrome or halftone treatment.
- ❌ **NEVER** use rounded corners (`border-radius`) on paper slips — torn thermal paper has sharp 90° side edges and zig-zag top/bottom cuts.
- ❌ **NEVER** use multi-color pastel status pills; stick strictly to black thermal ink + single vermilion stamp ink.
- ❌ **NEVER** stretch a single receipt card across a `1200px` wide container.
