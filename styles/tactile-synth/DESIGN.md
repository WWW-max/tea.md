# UI Design System: "Tactile Synth / 博朗与 TE 工业合成器"

> **Slug:** `tactile-synth`
> **Category:** `Industrial Hardware`
> **One-Line Vibe:** Dieter Rams Braun functionalism meets Teenage Engineering OP-1 — anodized warm aluminum chassis, recessed dot-matrix LCDs, and physical 3D keycap mechanics.

---

## 1. Aesthetic Identity & Origin
- **Historical / Material Reference:** 1960s Braun T3 / TP1 industrial design by Dieter Rams paired with Teenage Engineering OP-1 / TX-6 tactile field synthesizers.
- **Best For:** AI audio/voice studios, developer CLI/agent consoles, focus timers, creative parameter playgrounds.
- **Mood Keywords:** `tactile`, `matte-anodized`, `recessed-lcd`, `mechanical-keycap`, `precision`

---

## 2. Color & Surface Tokens
- **Chassis Substrate:** `#E5E3DC` (Warm anodized aluminum / matte ABS)
- **Recessed Well / Tray:** `#D5D2C8` (Sunken control bay)
- **LCD Display Window:** `#9BA88D` background with `#1B2416` high-contrast liquid-crystal segments
- **Primary Ink:** `#1E1F22`
- **Muted Engraving:** `#575651`
- **Signature Accents:** `#FF5500` (International Braun Orange), `#F0A800` (Signal Ochre), `#26272B` (Charcoal Keycap)

---

## 3. Typography & Spatial Rhythm
- **Labels & Engravings:** Uppercase monospace (`JetBrains Mono`, `SF Mono`, `ui-monospace`), `11px–12px`, `letter-spacing: 0.08em`, bold weight, `tabular-nums`.
- **Readouts:** Bold monospace numerals (`20px–28px`) inside recessed LCD windows.
- **Corner Radius:** Outer chassis `16px`, recessed module wells `12px`, mechanical keycaps `8px`.

---

## 4. Signature Physical Anchors
```css
/* 1. Anodized Chassis Top Specular Highlight + Bottom Lip */
.tactile-chassis {
  background-color: #e5e3dc;
  border: 1px solid #c7c4ba;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.85),
    inset 0 -2px 0 rgba(0, 0, 0, 0.08),
    0 10px 24px -8px rgba(0, 0, 0, 0.22);
}

/* 2. Recessed Olive Dot-Matrix LCD Screen */
.tactile-lcd {
  background-color: #9ba88d;
  color: #1b2416;
  border: 1px solid #7c8970;
  box-shadow: inset 0 3px 6px rgba(0, 0, 0, 0.28), 0 1px 0 rgba(255, 255, 255, 0.65);
  background-image: radial-gradient(rgba(27, 36, 22, 0.08) 1px, transparent 0);
  background-size: 3px 3px;
}

/* 3. Physical Keycap with 3px Travel Distance */
.tactile-key {
  transition: transform 60ms ease, box-shadow 60ms ease;
  box-shadow: 0 4px 0 #aba79c, 0 6px 8px rgba(0, 0, 0, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.7);
}
.tactile-key:active {
  transform: translateY(3px);
  box-shadow: 0 1px 0 #aba79c, 0 2px 3px rgba(0, 0, 0, 0.15);
}
```

---

## 5. Signature Components
- **Buttons:** Physical square/rectangular keycaps with hard bottom extrusion (`0 4px 0`) that physically depress `3px` on click.
- **Inputs:** Sunken trays (`inset 0 2px 5px rgba(0,0,0,0.16)`) or olive LCD readouts.
- **Badges:** 3mm glowing LED indicator dots (`box-shadow: 0 0 8px #ff5500`) next to engraved uppercase labels.
- **Soul Widget:** Vertical-drag rotary encoder knobs with indicator ticks and segmented DSP level bars.

---

## 6. Anti-Slop Guardrails (DON'Ts)
- ❌ **NEVER** use translucent glassmorphism (`backdrop-blur`) or neon gradients.
- ❌ **NEVER** use floating flat buttons without physical bottom lip/travel shadows.
- ❌ **NEVER** use pill-shaped `rounded-full` action buttons (reserve circles strictly for rotary knobs and 3mm LEDs).
- ❌ **NEVER** center giant marketing hero paragraphs inside the console chassis; align controls in strict modular bays.
