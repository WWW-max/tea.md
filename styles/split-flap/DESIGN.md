# UI Design System: "Split-Flap & Boarding Pass / 机械翻页牌与登机牌"

> **Slug:** `split-flap`
> **Category:** `Industrial Hardware`
> **One-Line Vibe:** Classic European Solari Udine airport departure boards paired with perforated paper boarding passes and high-visibility Massimo Vignelli wayfinding signage.

---

## 1. Aesthetic Identity & Origin
- **Historical / Material Reference:** 1960s Solari Udine mechanical split-flap timetable boards, international airport terminal signage (`#FFD100` on matte black), and IATA paper boarding passes.
- **Best For:** Deployment/CI-CD status boards, live event schedules, product launch countdowns, ticketing & reservation flows.
- **Mood Keywords:** `split-flap`, `wayfinding-yellow`, `perforated-stub`, `mechanical-flip`, `departures`

---

## 2. Color & Surface Tokens
- **Terminal Board Housing:** `#16171A`
- **Split-Flap Character Tile:** `#222429` split across center hinge `#0D0E10`
- **Wayfinding Signal Yellow:** `#FFD100`
- **On-Time Signal Green:** `#4ADE80`
- **Boarding Pass Card Stock:** `#F6F4EE` with `#16171A` ink

---

## 3. Typography & Spatial Rhythm
- **Flap Tiles:** Strict single-character uppercase monospace grid (`1 character = 1 mechanical cell`), `tabular-nums`.
- **Wayfinding Headers:** Bold neo-grotesque (`Helvetica Neue`, `Inter`, `Arial`), high contrast black-on-yellow lightboxes.

---

## 4. Signature Physical Anchors
```css
/* 1. Split-Flap Tile with Horizontal Center Hinge Cutline */
.flap-cell {
  background: linear-gradient(
    180deg,
    #26282d 0%, #202226 49%,
    #0d0e10 50%,
    #1c1e22 51%, #17181c 100%
  );
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.12), 0 2px 4px rgba(0, 0, 0, 0.6);
}

/* 2. Staggered Mechanical Leaf Flip Keyframes */
@keyframes flapFlip {
  0%   { transform: rotateX(0deg); }
  50%  { transform: rotateX(-88deg); filter: brightness(0.6); }
  100% { transform: rotateX(0deg); }
}

/* 3. Boarding Pass Side Punch-Out Notches */
.pass-notch {
  width: 20px; height: 20px; border-radius: 9999px;
  background-color: #16171a; /* Matches outer board background */
}
```

---

## 5. Signature Components
- **Live Counters / Statuses:** Character-by-character `.flap-cell` arrays with staggered `20ms` per-tile flip delay.
- **Cards:** Boarding-pass stubs divided into an `8-col` main info zone and `4-col` tear-off gate stub via `border-right: 2px dashed`, flanked by circular punch notches.

---

## 6. Anti-Slop Guardrails (DON'Ts)
- ❌ **NEVER** display status strings as plain inline text inside the departure board when individual split-flap character cells should be rendered.
- ❌ **NEVER** dilute Signal Yellow (`#FFD100`) into washed-out pastel cream.
- ❌ **NEVER** omit the horizontal `50%` hinge seam across split-flap cells.
