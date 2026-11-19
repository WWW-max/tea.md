# UI Design System: "Analog Tape Deck & VU Meter / 复古磁带卡座与暖光指针表"

> **Slug:** `analog-tape-deck`
> **Category:** `Industrial Hardware`
> **One-Line Vibe:** Late-1970s Nakamichi & Sony Hi-Fi stereo cassette decks — brushed champagne-silver faceplates, incandescent amber backlit analog VU needle meters, and dual spinning cassette reels.

---

## 1. Aesthetic Identity & Origin
- **Historical / Material Reference:** Nakamichi Dragon / Technics RS-series stereo cassette decks, incandescent wheat-bulb backlit dB VU meters, and CrO₂ Type II cassette shells.
- **Best For:** Voice AI / TTS streaming apps, podcast players, music generation tools, audio transcription studios.
- **Mood Keywords:** `brushed-aluminum`, `vu-needle`, `cassette-reel`, `warm-incandescent`, `analog-hifi`

---

## 2. Color & Surface Tokens
- **Brushed Aluminum Faceplate:** `#DCD9D0` → `#C2BEB2` metallic vertical gradient
- **Tape Well Cavity:** `#232220` dark anodized bay
- **Incandescent VU Backlight:** Radial glow `#FFE6A3` center → `#CFA04E` edge
- **VU Peak Red Ink & Needle:** `#B91C1C`

---

## 3. Typography & Spatial Rhythm
- **Faceplate Silkscreen:** Tightly tracked uppercase monospace/technical sans (`CrO₂ TYPE II`, `-20 -10 -5 0 +3 dB`), mechanical 4-digit odometer tape counters (`0142`).

---

## 4. Signature Physical Anchors
```css
/* 1. Brushed Champagne-Silver Metallic Faceplate */
.deck-faceplate {
  background: linear-gradient(180deg, #dcd9d0 0%, #cfcbc0 50%, #c2beb2 100%);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.85), 0 10px 24px -8px rgba(0, 0, 0, 0.3);
}

/* 2. Warm Incandescent Bulb-Lit VU Meter Window */
.vu-meter-window {
  background: radial-gradient(circle at 50% 85%, #ffe6a3 0%, #f3c46b 62%, #cfa04e 100%);
  box-shadow: inset 0 3px 8px rgba(0, 0, 0, 0.42);
}

/* 3. Bottom-Pivoted Analog Needle */
.vu-needle {
  width: 2px;
  background-color: #b91c1c;
  transform-origin: bottom center;
  transition: transform 150ms ease-out;
}
```

---

## 5. Signature Components
- **Loaders / Streaming State:** Dual synchronized spinning cassette tape hubs (`animation: spin 2.6s linear infinite`) inside a dark observation window instead of generic SVG spinners.
- **Telemetry / Activity:** Swinging red analog needle inside a warm amber `.vu-meter-window` calibrated from `-20` to `+6 dB`.
- **Counters:** Recessed black mechanical 4-digit odometer (`0142`).

---

## 6. Anti-Slop Guardrails (DON'Ts)
- ❌ **NEVER** replace the analog swinging needle or cassette hubs with generic flat Spotify-green waveform bars.
- ❌ **NEVER** use cold blue LED backlighting inside the VU meter — authentic vintage VU meters glow with warm tungsten amber (`#FFE6A3`).
