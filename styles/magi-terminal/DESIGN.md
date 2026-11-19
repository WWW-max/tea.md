# UI Design System: "MAGI Terminal / 复古未来磁带科幻终端"

> **Slug:** `magi-terminal`
> **Category:** `Retro & Reflective Displays`
> **One-Line Vibe:** 1980s Cassette Futurism meets Evangelion NERV MAGI supercomputer — phosphor amber/green CRTs, diagonal black-and-amber hazard stripes, octagonal beveled plates, and multi-agent voting matrices.

---

## 1. Aesthetic Identity & Origin
- **Historical / Material Reference:** *Neon Genesis Evangelion* MAGI System UI (Fuyutsuki/Akagi terminals), *Alien* (1979) MU/TH/UR 6000 mainframe, and *Fallout* amber CRT monitors.
- **Best For:** Multi-agent orchestration dashboards, cybersecurity/CTF platforms, DevOps incident war-rooms, sci-fi game tools.
- **Mood Keywords:** `cassette-futurism`, `crt-phosphor`, `hazard-stripe`, `octagonal-bevel`, `consensus`

---

## 2. Color & Surface Tokens
- **CRT Deep Void:** `#080A09`
- **Primary Phosphor Amber:** `#FF9D00`
- **Synchronized Phosphor Green:** `#22FF66`
- **Critical Veto / Override Crimson:** `#FF2A2A`
- **Subtle Panel Tint:** `rgba(255, 157, 0, 0.08)`

---

## 3. Typography & Spatial Rhythm
- **Typography:** Condensed uppercase monospace (`Share Tech Mono`, `JetBrains Mono`) for status blocks; bold tight display sans for giant alert banners (`EMERGENCY`, `APPROVE`, `VETO`).
- **Geometry:** Chamfered 45-degree octagonal corners (`clip-path: polygon(...)`) rather than CSS `border-radius`.

---

## 4. Signature Physical Anchors
```css
/* 1. Diagonal 45-Degree Industrial Hazard Stripes */
.magi-hazard {
  background: repeating-linear-gradient(
    -45deg,
    #ff9d00,
    #ff9d00 8px,
    #080a09 8px,
    #080a09 16px
  );
}

/* 2. Chamfered Octagonal Agent Node Plate */
.magi-oct {
  clip-path: polygon(
    10px 0, calc(100% - 10px) 0,
    100% 10px, 100% calc(100% - 10px),
    calc(100% - 10px) 100%, 10px 100%,
    0 calc(100% - 10px), 0 10px
  );
}

/* 3. CRT Horizontal Scanline Overlay */
.magi-scanlines::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: repeating-linear-gradient(
    to bottom,
    rgba(255, 157, 0, 0.03) 0px,
    rgba(255, 157, 0, 0.03) 1px,
    rgba(0, 0, 0, 0.24) 2px,
    rgba(0, 0, 0, 0.24) 3px
  );
}
```

---

## 5. Signature Components
- **Multi-Agent Nodes:** Tripartite octagonal voting plates (`MELCHIOR-1`, `BALTHASAR-2`, `CASPER-3`) transitioning between amber `THINKING`, green `APPROVE`, and crimson `VETO`.
- **Destructive Actions:** Two-step armed switches — a safety checkbox (`ARM OVERRIDE`) must be toggled before the crimson execute button unlocks.
- **Telemetry:** Real-time green phosphor sine/harmonic oscilloscope `<canvas>` waves.

---

## 6. Anti-Slop Guardrails (DON'Ts)
- ❌ **NEVER** use cyberpunk neon pink-to-cyan vaporwave gradients — Cassette Futurism uses strict monochrome phosphor channels (Amber, Green, Crimson) on deep black.
- ❌ **NEVER** use soft `rounded-2xl` cards or pastel backgrounds.
- ❌ **NEVER** use friendly lowercase conversational button labels (`Let's go!` -> `EXECUTE // 01`).
