import type { StyleEntry } from "./almanac-data";

export interface MixerParams {
  grain: number; // 0 - 100
  depth: "subtle" | "balanced" | "heavy";
  density: "compact" | "standard" | "airy";
  accent: string;
  format: "design-md" | "tailwind-css" | "agent-rules";
}

export const DEPTH_SCALE: Record<MixerParams["depth"], number> = {
  subtle: 0.5,
  balanced: 1,
  heavy: 1.65,
};

export const DENSITY_LABEL: Record<MixerParams["density"], string> = {
  compact: "Compact (4px/8px/12px high-density console rhythm)",
  standard: "Standard (8px/16px/24px balanced rhythm)",
  airy: "Airy (16px/32px/48px generous 35%+ editorial whitespace)",
};

export function compileMixerOutput(item: StyleEntry, params: MixerParams): string {
  const scale = DEPTH_SCALE[params.depth];
  const travelPx = Math.max(1, Math.round(3 * scale));
  const offsetPx = Math.max(1, Math.round(4 * scale));
  const borderPx = params.depth === "heavy" ? "2px" : params.depth === "subtle" ? "1px" : "1.5px";
  const grainAlpha = (params.grain / 1000).toFixed(3);

  if (params.format === "tailwind-css") {
    return `/* TEA.md Compiled Tokens — ${item.en} (${item.slug}) */
@theme {
  --color-tea-surface: ${item.swatches[0]?.[0] ?? "#f5f5f0"};
  --color-tea-ink: ${item.swatches[1]?.[0] ?? "#18181b"};
  --color-tea-accent: ${params.accent};
  --spacing-tea-unit: ${params.density === "compact" ? "0.25rem" : params.density === "airy" ? "0.5rem" : "0.375rem"};
}

:root {
  --tea-grain-alpha: ${grainAlpha};
  --tea-travel-px: ${travelPx}px;
  --tea-offset-px: ${offsetPx}px;
  --tea-border-width: ${borderPx};
}

.tea-surface {
  background-color: var(--color-tea-surface);
  color: var(--color-tea-ink);
  border: var(--tea-border-width) solid currentColor;
  background-image: radial-gradient(rgba(0, 0, 0, var(--tea-grain-alpha)) 1px, transparent 0);
  background-size: 6px 6px;
}

.tea-tactile-btn {
  background-color: var(--color-tea-accent);
  box-shadow: 0 var(--tea-travel-px) 0 rgba(0, 0, 0, 0.45);
  transition: transform 60ms ease, box-shadow 60ms ease;
}
.tea-tactile-btn:active {
  transform: translateY(var(--tea-travel-px));
  box-shadow: 0 0 0 rgba(0, 0, 0, 0.45);
}`;
  }

  if (params.format === "agent-rules") {
    return `# .cursorrules / CLAUDE.md — TEA.md [${item.slug}]

You MUST enforce the "${item.en} (${item.name})" aesthetic system across all UI components:

## Calibrated Physical Parameters
- Primary Substrate: ${item.swatches[0]?.[0]} (${item.swatches[0]?.[1]})
- Primary Ink / Secondary: ${item.swatches[1]?.[0]} (${item.swatches[1]?.[1]})
- Active Accent Override: ${params.accent}
- Surface Grain Intensity: ${params.grain}% (radial noise alpha: ${grainAlpha})
- Tactile Depth Profile: ${params.depth.toUpperCase()} (button travel: ${travelPx}px, plate offset: ${offsetPx}px, border: ${borderPx})
- Spatial Density: ${DENSITY_LABEL[params.density]}

## Core Directive
${item.prompt}

## Strict Anti-Slop Guardrails
${item.donts.map((d) => `- NEVER: ${d}`).join("\n")}`;
  }

  // Default: Parameterized DESIGN.md
  const calibratedHeader = `<!-- TEA.md Steep Mixer Calibration: grain=${params.grain}% | depth=${params.depth} (${travelPx}px travel) | density=${params.density} | accent=${params.accent} -->

## Steep Mixer Calibrated Tokens
- **Active Accent Token:** \`${params.accent}\`
- **Surface Grain Intensity:** \`${params.grain}%\` (\`rgba(0,0,0,${grainAlpha}) 1px\` micro-grain)
- **Tactile Depth & Travel:** \`${params.depth}\` (\`${travelPx}px\` press travel / \`${offsetPx}px\` plate offset / \`${borderPx}\` rule weight)
- **Layout Density:** ${DENSITY_LABEL[params.density]}

---

`;

  return calibratedHeader + (item.designMd ?? "");
}
