import { NextResponse } from "next/server";
import { compileMixerOutput, type MixerParams } from "@/app/components/steep-mixer";
import { loadAllStyles } from "@/app/lib/styles-loader";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Accept, Mcp-Session-Id",
};

const MCP_TOOLS = [
  {
    name: "list_aesthetics",
    description:
      "Search or list curated physical & cultural UI aesthetic systems in TEA.md to replace generic AI slop.",
    inputSchema: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description: "Optional keyword (e.g. 'audio', 'print', 'eink', 'blueprint', 'oriental')",
        },
      },
    },
  },
  {
    name: "get_design_recipe",
    description:
      "Get the full DESIGN.md specification, color tokens, physical CSS anchors, and anti-slop guardrails for a style.",
    inputSchema: {
      type: "object",
      properties: {
        slug: {
          type: "string",
          description: "Style slug (e.g. 'tactile-synth', 'risograph-print', 'eink-gc16', 'xuan-wusilan')",
        },
        depth: {
          type: "string",
          enum: ["subtle", "balanced", "heavy"],
          description: "Optional tactile depth calibration",
        },
        grain: {
          type: "number",
          description: "Optional surface grain intensity from 0 to 100",
        },
      },
      required: ["slug"],
    },
  },
  {
    name: "get_soul_primitive",
    description:
      "Fetch the self-contained React TypeScript soul component for a style.",
    inputSchema: {
      type: "object",
      properties: {
        slug: {
          type: "string",
          description: "Style slug (e.g. 'tactile-synth')",
        },
      },
      required: ["slug"],
    },
  },
];

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

export async function GET() {
  const all = await loadAllStyles();
  return NextResponse.json(
    {
      name: "tea-md",
      version: "0.2.0",
      protocol: "Model Context Protocol (Streamable HTTP JSON-RPC 2.0)",
      stylesCount: all.length,
      tools: MCP_TOOLS.map((t) => t.name),
    },
    { headers: CORS_HEADERS }
  );
}

export async function POST(req: Request) {
  let body: {
    jsonrpc?: string;
    id?: string | number | null;
    method?: string;
    params?: Record<string, unknown>;
  };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { jsonrpc: "2.0", id: null, error: { code: -32700, message: "Parse error" } },
      { status: 400, headers: CORS_HEADERS }
    );
  }

  const { id = null, method, params = {} } = body;

  if (method?.startsWith("notifications/")) {
    return new NextResponse(null, { status: 202, headers: CORS_HEADERS });
  }

  if (method === "initialize") {
    return NextResponse.json(
      {
        jsonrpc: "2.0",
        id,
        result: {
          protocolVersion: "2025-03-26",
          capabilities: { tools: {} },
          serverInfo: { name: "tea-md", version: "0.2.0" },
        },
      },
      { headers: CORS_HEADERS }
    );
  }

  if (method === "ping") {
    return NextResponse.json({ jsonrpc: "2.0", id, result: {} }, { headers: CORS_HEADERS });
  }

  if (method === "tools/list") {
    return NextResponse.json(
      { jsonrpc: "2.0", id, result: { tools: MCP_TOOLS } },
      { headers: CORS_HEADERS }
    );
  }

  if (method === "tools/call") {
    const all = await loadAllStyles();
    const toolName = params.name as string | undefined;
    const args = (params.arguments as Record<string, unknown> | undefined) ?? {};

    if (toolName === "list_aesthetics") {
      const q = String(args.query ?? "").trim().toLowerCase();
      const matches = all.filter(
        (x) =>
          !q ||
          `${x.slug} ${x.en} ${x.name} ${x.cat} ${x.catEn} ${x.bestFor} ${x.bestForEn}`
            .toLowerCase()
            .includes(q)
      );
      const text = matches
        .map(
          (x) =>
            `- \`${x.slug}\` (${x.en} / ${x.name}) [${x.catEn}]\n  Best for: ${x.bestForEn}\n  Palette: ${x.swatches.map((s) => `${s[0]} (${s[2]})`).join(", ")}`
        )
        .join("\n\n");

      return NextResponse.json(
        {
          jsonrpc: "2.0",
          id,
          result: { content: [{ type: "text", text: text || "No matching styles found." }] },
        },
        { headers: CORS_HEADERS }
      );
    }

    if (toolName === "get_design_recipe") {
      const slug = String(args.slug ?? "");
      const item = all.find((x) => x.slug === slug);
      if (!item) {
        return NextResponse.json(
          {
            jsonrpc: "2.0",
            id,
            result: {
              isError: true,
              content: [{ type: "text", text: `Unknown style slug: ${slug}` }],
            },
          },
          { headers: CORS_HEADERS }
        );
      }

      const depth = (["subtle", "balanced", "heavy"].includes(String(args.depth))
        ? String(args.depth)
        : "balanced") as MixerParams["depth"];
      const grain = typeof args.grain === "number" ? Math.min(100, Math.max(0, args.grain)) : 45;

      const compiled = compileMixerOutput(item, {
        grain,
        depth,
        density: "standard",
        accent: item.swatches[2]?.[0] ?? item.swatches[1]?.[0] ?? "#ff5500",
        format: "design-md",
      });

      return NextResponse.json(
        {
          jsonrpc: "2.0",
          id,
          result: { content: [{ type: "text", text: compiled }] },
        },
        { headers: CORS_HEADERS }
      );
    }

    if (toolName === "get_soul_primitive") {
      const slug = String(args.slug ?? "");
      const item = all.find((x) => x.slug === slug);
      if (!item || !item.primitive) {
        return NextResponse.json(
          {
            jsonrpc: "2.0",
            id,
            result: {
              isError: true,
              content: [{ type: "text", text: `Unknown style slug: ${slug}` }],
            },
          },
          { headers: CORS_HEADERS }
        );
      }

      return NextResponse.json(
        {
          jsonrpc: "2.0",
          id,
          result: {
            content: [
              {
                type: "text",
                text: `// File: components/tea/${item.primitive.fileName}\n// ${item.primitive.summaryEn}\n\n${item.primitive.code}`,
              },
            ],
          },
        },
        { headers: CORS_HEADERS }
      );
    }

    return NextResponse.json(
      { jsonrpc: "2.0", id, error: { code: -32601, message: `Unknown tool: ${toolName}` } },
      { status: 404, headers: CORS_HEADERS }
    );
  }

  return NextResponse.json(
    { jsonrpc: "2.0", id, error: { code: -32601, message: `Method not found: ${method}` } },
    { status: 404, headers: CORS_HEADERS }
  );
}
