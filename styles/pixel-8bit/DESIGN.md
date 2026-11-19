# UI Design System: "8-Bit Retro Pixel Arcade / 8-Bit 像素游戏风"

> **Slug:** `pixel-8bit`
> **Category:** `Retro Displays`
> **Ecosystem Reference:** `8bitcn`, NES / SNES JRPG Dialogue Windows, Pico-8
> **One-Line Vibe:** Crisp zero-blur pixel bevels, segmented HP/MP stat bars, blinking `▼` RPG dialogue cursors, and instant 1-frame arcade button presses.

---

## 1. Aesthetic Identity & Origin
- **Historical Reference:** 8-bit & 16-bit console RPG UIs (*Dragon Quest*, *EarthBound*, *Chrono Trigger*) and modern pixel-art `shadcn` registries (`8bitcn`).
- **Best For:** Gamified productivity apps, indie game sites, hackathons, developer quests & leaderboards.

---

## 2. Color & Surface Tokens
- **Arcade Midnight:** `#0F172A`
- **Pixel Frame White:** `#F8FAFC`
- **HP Heart Red:** `#EF4444`
- **MP Mana Cyan:** `#38BDF8`
- **Coin Gold:** `#FACC15`

---

## 3. Signature Physical Anchors
```css
/* 1. Stepped Inner-Bevel RPG Dialogue Frame (Zero Blur, 0px Radius) */
.pixel-box {
  background-color: #0f172a;
  color: #f8fafc;
  border: 4px solid #f8fafc;
  box-shadow:
    inset -4px -4px 0 #475569,
    inset 4px 4px 0 #cbd5e1,
    0 4px 0 #020617;
  image-rendering: pixelated;
}

/* 2. 1-Frame Stepped Arcade Button */
.pixel-btn {
  border: 3px solid #0f172a;
  box-shadow: inset -3px -3px 0 rgba(0,0,0,0.3), inset 3px 3px 0 rgba(255,255,255,0.45), 0 4px 0 #0f172a;
  transition: transform 40ms steps(1);
}
.pixel-btn:active {
  transform: translateY(4px);
  box-shadow: 0 0 0 #0f172a;
}
```

---

## 4. Anti-Slop Guardrails (DON'Ts)
- ❌ **NEVER** use `rounded-md` or `rounded-full` — every element must stay strictly `0px` square-pixelated.
- ❌ **NEVER** use smooth cubic-bezier animations; use `steps(1)` or `steps(4)` discrete frame transitions.
- ❌ **NEVER** use anti-aliased soft drop shadows.
