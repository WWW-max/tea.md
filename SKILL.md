---
name: tea-md
description: Curated anti-slop UI aesthetic recipes (Tactile Hardware, CAD Blueprint, Thermal Receipt, E-Ink GC16, MAGI Terminal, Oriental Xuan & Seal, Split-Flap, Risograph, Swiss Apothecary, Tape Deck, Atomic Purple, Corkboard Dossier). Activate when the user wants a distinctive, non-generic visual aesthetic or asks to apply a style from TEA.md (Tactile & Editorial Aesthetics).
---

# TEA.md (Tactile & Editorial Aesthetics) Design Skill

When designing or refactoring frontend interfaces, avoid generic "AI slop" (white cards, arbitrary `rounded-xl` pills, blurred drop-shadows, and purple/blue gradients). Instead, select or apply a cohesive physical/cultural design system from `./styles/<slug>/DESIGN.md`.

## Available Aesthetic Systems

1. `tactile-synth` — **Braun & Teenage Engineering Hardware** (`./styles/tactile-synth/DESIGN.md`)
2. `cad-blueprint` — **Engineering Blueprint & CAD Schematic** (`./styles/cad-blueprint/DESIGN.md`)
3. `thermal-receipt` — **Thermal Receipt & Newsprint Halftone** (`./styles/thermal-receipt/DESIGN.md`)
4. `eink-gc16` — **E-Ink Paper & 1-Bit Bayer Dithering** (`./styles/eink-gc16/DESIGN.md`)
5. `magi-terminal` — **Cassette Futurism & MAGI Consensus CRT** (`./styles/magi-terminal/DESIGN.md`)
6. `xuan-wusilan` — **Song-Dynasty Wusilan & Cinnabar Seal** (`./styles/xuan-wusilan/DESIGN.md`)
7. `split-flap` — **Airport Solari Split-Flap & Boarding Pass** (`./styles/split-flap/DESIGN.md`)
8. `risograph-print` — **Risograph Soy-Ink Multiply & Misregistration** (`./styles/risograph-print/DESIGN.md`)
9. `swiss-apothecary` — **Swiss Apothecary Label & Lab Meniscus** (`./styles/swiss-apothecary/DESIGN.md`)
10. `analog-tape-deck` — **Hi-Fi Cassette Deck & Warm Analog VU Meter** (`./styles/analog-tape-deck/DESIGN.md`)
11. `atomic-purple` — **Y2K Atomic Purple Translucent PCB Shell** (`./styles/atomic-purple/DESIGN.md`)
12. `corkboard-dossier` — **Detective Corkboard, Red-String & Redacted Dossier** (`./styles/corkboard-dossier/DESIGN.md`)

## Workflow

1. Read the target `./styles/<slug>/DESIGN.md` file in full before writing any UI code.
2. Copy or adapt the **Signature Physical Anchors** CSS rules verbatim so tactile details (bevels, blend modes, serrated edges, dithering, flash keyframes) remain authentic.
3. Enforce every rule in **Anti-Slop Guardrails (DON'Ts)** across all components on the page.
