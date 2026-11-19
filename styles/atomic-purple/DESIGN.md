# UI Design System: "Atomic Purple Y2K / 千禧透明紫掌机透视电路"

> **Slug:** `atomic-purple`
> **Category:** `Industrial Hardware`
> **One-Line Vibe:** 1998 Nintendo Game Boy Color "Atomic Purple" & iMac G3 translucent injection-molded polycarbonate — frosted see-through shells revealing gold solder pads and copper PCB traces underneath.

---

## 1. Aesthetic Identity & Origin
- **Historical / Material Reference:** Late-1990s translucent consumer electronics (Game Boy Color Atomic Purple, N64 Funtastic series, Bondi Blue iMac G3) with visible internal green/purple circuit boards.
- **Best For:** Indie game launchers, Web3 / collectible communities, nostalgic Y2K creative tools, interactive developer toys.
- **Mood Keywords:** `atomic-purple`, `see-through-pcb`, `polycarbonate-frost`, `y2k-handheld`, `solder-pad`

---

## 2. Color & Surface Tokens
- **Underlying PCB Substrate:** `#231636`
- **Frosted Polycarbonate Shell:** `rgba(126, 58, 242, 0.42)` with `2.5px` blur
- **Copper Trace Lines:** `#C084FC` (`45%` opacity)
- **Gold ENIG Solder Pads:** `#FBBF24`
- **Rubber Action Buttons:** `#F43F5E` (B Button), `#34D399` (A Button), `#27272A` (Conductive D-Pad)

---

## 3. Typography & Spatial Rhythm
- **Screen & Shell Print:** Crisp pixel/monospace readouts inside dark recessed LCD bezels (`#151121`), paired with bold italicized plastic mold embossing on the shell.

---

## 4. Signature Physical Anchors
```css
/* 1. Translucent Injection-Molded Polycarbonate Shell Over SVG PCB Traces */
.atomic-polycarbonate {
  background-color: rgba(126, 58, 242, 0.42);
  backdrop-filter: blur(2.5px);
  -webkit-backdrop-filter: blur(2.5px);
  border: 1px solid rgba(216, 180, 254, 0.4);
  box-shadow:
    inset 0 2px 3px rgba(255, 255, 255, 0.35),
    inset 0 -3px 6px rgba(20, 5, 42, 0.55),
    0 8px 20px rgba(35, 14, 68, 0.35);
}
```
> **Crucial Layering Rule:** Always place an inline `<svg>` containing 45°-routed PCB circuit paths (`H` / `V` / `L` diagonal traces + circular `#FBBF24` solder pads) *behind* `.atomic-polycarbonate`! Glass blur over an empty solid background looks like generic SaaS glassmorphism; glass blur over PCB traces creates instant see-through hardware magic.

---

## 5. Signature Components
- **Cards:** `.atomic-polycarbonate` shells layered directly over 45-degree routed SVG circuit traces and IC chips.
- **Buttons:** `-12deg` angled circular rubber-dome `A / B` buttons with `0 4px 0` hard silicone travel shadow and cross-shaped D-Pad controls.

---

## 6. Anti-Slop Guardrails (DON'Ts)
- ❌ **NEVER** set `backdrop-filter: blur(20px)` — excessive blur completely obliterates the underlying PCB traces! Keep blur tight (`2px–3.5px`) like real frosted plastic.
- ❌ **NEVER** route SVG circuit traces with curvy Bézier splines; real PCB traces bend strictly at **45° and 90° angles**.
