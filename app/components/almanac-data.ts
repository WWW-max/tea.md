export interface StyleEntry {
  num: string;
  slug: string;
  name: string;
  en: string;
  cat: "工业硬件" | "印刷纸品" | "技术制图" | "复古屏幕" | "文化古籍";
  catEn:
    | "Industrial Hardware"
    | "Print & Paper"
    | "Technical & Schematic"
    | "Retro Displays"
    | "Cultural & Archival";
  origin: string;
  originEn: string;
  bestFor: string;
  bestForEn: string;
  swatches: [string, string, string][]; // [hex, zhLabel, enLabel]
  donts: string[];
  dontsEn: string[];
  prompt: string;
  promptEn: string;
  designMd?: string;
}

export const CATEGORIES = [
  { id: "all", zh: "全部词条 (12)", en: "All Blends (12)" },
  { id: "工业硬件", zh: "🎛️ 工业硬件 (4)", en: "🎛️ Hardware (4)" },
  { id: "印刷纸品", zh: "🖨️ 印刷纸品 (2)", en: "🖨️ Print & Paper (2)" },
  { id: "技术制图", zh: "📐 技术制图 (2)", en: "📐 Technical (2)" },
  { id: "复古屏幕", zh: "📺 复古屏幕 (2)", en: "📺 Retro Displays (2)" },
  { id: "文化古籍", zh: "📜 文化古籍 (2)", en: "📜 Cultural & Archival (2)" },
] as const;

export const ALMANAC_CATALOG: StyleEntry[] = [
  {
    num: "01",
    slug: "tactile-synth",
    name: "博朗 / TE 工业合成器",
    en: "Tactile Synth Hardware",
    cat: "工业硬件",
    catEn: "Industrial Hardware",
    origin:
      "源自 1960 年代 Dieter Rams 执掌的博朗（Braun T3/TP1）功能主义工业设计，融合 Teenage Engineering OP-1 便携合成器的机械键帽与凹陷液晶屏比例。",
    originEn:
      "Rooted in Dieter Rams' 1960s Braun T3/TP1 industrial functionalism fused with Teenage Engineering OP-1 tactile field synthesizers, recessed dot-matrix LCDs, and physical keycaps.",
    bestFor: "AI 语音/音频工作台、Agent 调试控制台、番茄钟效率工具、硬件参数面板。",
    bestForEn: "AI audio/voice studios, agent debugging consoles, focus timers, hardware parameter panels.",
    swatches: [
      ["#E5E3DC", "阳极灰铝壳", "Anodized Chassis"],
      ["#9BA88D", "橄榄段码屏", "Olive Dot LCD"],
      ["#FF5500", "博朗国际橙", "Braun Orange"],
      ["#26272B", "炭黑键帽", "Charcoal Keycap"],
    ],
    donts: [
      "严禁使用毛玻璃（backdrop-blur）或蓝紫霓虹渐变",
      "严禁使用无厚度的扁平按钮——所有按键必须具备 3px~4px 底部物理键程阴影",
      "严禁滥用胶囊圆角（rounded-full），圆形仅限阻尼旋钮与 3mm LED 指示灯",
    ],
    dontsEn: [
      "NEVER use frosted glassmorphism (backdrop-blur) or purple-to-blue gradients",
      "NEVER render flat zero-travel buttons — enforce 3px–4px physical bottom lip shadows",
      "NEVER use pill-shaped rounded-full buttons (reserve circles strictly for rotary knobs and 3mm LEDs)",
    ],
    prompt: `请采用「Braun × Teenage Engineering 工业合成器美学（Tactile Synth UI）」构建此界面：
1. 材质色板：机身采用温润哑光铝灰 #E5E3DC（带顶部内高光 inset 0 1px 0 rgba(255,255,255,0.85)），内凹控制槽 #D5D2C8，参数读数置于橄榄绿点阵液晶屏 #9BA88D（文字 #1B2416），唯二强调色为博朗橙 #FF5500 与炭黑 #26272B。
2. 机械交互：所有按钮做成实体键帽（box-shadow: 0 4px 0 #ABA79C，:active 时 translateY(3px) 压下），参数调节优先使用刻度旋钮或推子。
3. 排版与护栏：全大写等宽工业铭牌刻字（tracking-widest + tabular-nums）；严禁使用毛玻璃、彩色渐变阴影或廉价胶囊标签。`,
    promptEn: `Build this interface using the "Braun × Teenage Engineering Tactile Synth" aesthetic:
1. Surface Palette: Warm anodized aluminum chassis #E5E3DC (with top specular inset 0 1px 0 rgba(255,255,255,0.85)), recessed bay #D5D2C8, parameter readouts inside recessed olive dot-matrix LCD #9BA88D (ink #1B2416), accented solely by Braun Orange #FF5500 and Charcoal #26272B.
2. Tactile Mechanics: Style all buttons as physical 3D keycaps (box-shadow: 0 4px 0 #ABA79C, depressing translateY(3px) on :active). Prefer rotary knobs and faders for numeric inputs.
3. Guardrails: Uppercase monospace engraved labels (tracking-widest + tabular-nums). Strictly NO glassmorphism, gradients, or rounded-full pill buttons.`,
  },
  {
    num: "02",
    slug: "cad-blueprint",
    name: "工程蓝图与 CAD 制图",
    en: "CAD Blueprint Schematic",
    cat: "技术制图",
    catEn: "Technical & Schematic",
    origin:
      "源自 19 世纪铁氰酸盐晒图法（普鲁士蓝工程蓝图）与航空航天 AutoCAD 结构制图规范，以双层公制网格、十字准星与尺寸标注线为核心秩序。",
    originEn:
      "Inspired by 19th-century Prussian blue cyanotype engineering prints and aerospace AutoCAD schematics — governed by dual metric grids, corner crosshairs, and live dimension rulers.",
    bestFor: "AI 基础设施官网、机器人/物联网遥测后台、硬核开发者文档、系统架构可视化。",
    bestForEn: "AI infrastructure portals, robotics/IoT telemetry consoles, developer docs, architecture diagrams.",
    swatches: [
      ["#09223B", "普鲁士蓝底", "Prussian Blueprint"],
      ["#E0F2FE", "制图白青线", "Drafting Cyan-White"],
      ["#38BDF8", "尺寸辅助线", "Dimension Rule"],
      ["#34D399", "工程核准章", "Approved Stamp"],
    ],
    donts: [
      "严禁使用任何模糊投影（box-shadow），工程图纸是纯粹的二维正交投影",
      "严禁在内部模块框使用圆角（严格保持 0px 直角线框）",
      "严禁使用不透明纯色卡片完全遮挡底层的双层公制坐标网格",
    ],
    dontsEn: [
      "NEVER use Gaussian drop shadows (box-shadow) — blueprints are flat 2D projections",
      "NEVER apply border-radius to schematic boxes, inputs, or stamps (strictly 0px sharp corners)",
      "NEVER fill cards with opaque solids that completely hide the underlying metric coordinate grid",
    ],
    prompt: `请采用「工程蓝图与精密 CAD 制图美学（CAD Blueprint UI）」构建此界面：
1. 画布网格：普鲁士深蓝底 #09223B 叠加 80px 主网格与 16px 次网格细线（rgba(56,189,248,0.18)），前景线条与文字使用高对比青白 #E0F2FE。
2. 制图细节：所有容器保持 0px 直角半透明线框，四角放置「+」十字准星靶标，主卡片上方标注「├──── W: 480px ────┤」尺寸标尺，页眉放置包含 DWG NO. / SCALE 1:1 的工程图签栏。
3. 护栏：100% 使用等宽字体；严禁出现任何高斯阴影、圆角胶囊或装饰性插画。`,
    promptEn: `Build this interface using the "Engineering Blueprint & CAD Schematic" aesthetic:
1. Coordinate Grid: Deep Prussian blue canvas #09223B overlaid with 80px major and 16px minor cyan drafting grids (rgba(56,189,248,0.18)), crisp #E0F2FE linework.
2. Drafting Details: Keep all containers at 0px sharp wireframe corners with "+" crosshair reticles at all 4 corners, "├──── W: 480px ────┤" dimension rulers above primary modules, and a structured CAD Title Block header (DWG NO., SCALE 1:1).
3. Guardrails: 100% monospace typography. Strictly NO drop shadows, rounded corners, or opaque card fills.`,
  },
  {
    num: "03",
    slug: "thermal-receipt",
    name: "热敏小票与报刊网点",
    en: "Thermal Receipt & Halftone",
    cat: "印刷纸品",
    catEn: "Print & Paper",
    origin:
      "融合便利店热敏纸卷收据（Epson TM-T88）与近代黑白报纸照相铜版半调网点（Halftone）印刷术，充满烟火气与物理票据质感。",
    originEn:
      "Blends Epson TM-T88 POS thermal paper slips with vintage newspaper halftone photoengraving, serrated tear-off edges, perforated stubs, and vermilion rubber stamps.",
    bestFor: "记账与 API 账单页、年度总结报告、独立播客/文化专栏、Changelog 发布清单。",
    bestForEn: "Billing & API token statements, annual wrap-ups, indie blogs, release changelogs.",
    swatches: [
      ["#FAF7EF", "热敏暖白纸", "Thermal Paper"],
      ["#191918", "热敏碳黑墨", "Carbon Ink"],
      ["#DCD8CF", "桌面衬底灰", "Craft Desk Mat"],
      ["#C82824", "朱红橡胶戳", "Vermilion Stamp"],
    ],
    donts: [
      "严禁直接放置全彩高清照片——图片必须经黑白高反差或半调圆点网屏（Halftone）处理",
      "严禁把单张小票拉伸成 1200px 超宽通栏（应保持 360px~460px 票据窄栏比例）",
      "严禁在小票边缘使用圆角——两侧为直切边，上下两端为锯齿撕纸边",
    ],
    dontsEn: [
      "NEVER place glossy full-color photos directly on thermal paper — apply monochrome halftone dot filtering",
      "NEVER stretch a single receipt slip across 1200px wide containers (constrain slips to 360px–460px columns)",
      "NEVER round receipt corners — side edges are straight-cut and top/bottom edges use 10px zig-zag teeth",
    ],
    prompt: `请采用「热敏小票与报刊半调网点美学（Thermal Receipt UI）」构建此界面：
1. 票据结构：浅灰桌面底衬 #DCD8CF 上居中排布窄栏热敏纸 #FAF7EF，纸张上下边缘使用 linear-gradient 制作 10px 锯齿撕纸齿口，严禁使用圆角。
2. 排版与分割：全等宽打字机字体，使用 "====" 或 "----" 字符线及 2px 虚线撕裂副券分割模块，底部附带矢量条形码。
3. 视觉亮点：状态徽章采用微倾斜 -10deg 的朱红色双框橡胶印章（#C82824），插图采用黑白半调网点（Halftone Dots）渲染。`,
    promptEn: `Build this interface using the "Thermal Receipt & Newsprint Halftone" aesthetic:
1. Slip Geometry: Frame narrow #FAF7EF thermal paper columns against a #DCD8CF desk backdrop, capped top and bottom with 10px CSS linear-gradient serrated zig-zag tear edges (0px side radius).
2. Dividers & Typography: Narrow monospace font throughout, separated by ASCII "====" / "----" rules, 2px dashed tear-off stubs, and vector UPC barcodes.
3. Accents: Use angled (-10deg) vermilion rubber-stamp badges (#C82824) and render imagery via black-and-white halftone dot matrices.`,
  },
  {
    num: "04",
    slug: "eink-gc16",
    name: "电子墨水屏 GC16 显影",
    en: "E-Ink Paper & Bayer Dither",
    cat: "复古屏幕",
    catEn: "Retro Displays",
    origin:
      "还原 E-Ink Carta 电泳微胶囊墨水屏（Kindle / reMarkable）与 Playdate 1-bit 单色屏的反射式纸感体验，以及标志性的 GC16 全刷反色清残影波形。",
    originEn:
      "Recreates E-Ink Carta electrophoretic displays (Kindle / reMarkable) and 1-bit Playdate stipple screens — featuring zero-glare carbon contrast and authentic GC16 invert-flash refreshes.",
    bestFor: "AI 深度研究报告、沉浸式长文阅读器、个人知识库、极简无干扰仪表盘。",
    bestForEn: "Deep AI research reports, distraction-free readers, documentation hubs, calm analytics.",
    swatches: [
      ["#F1EEE7", "电泳微胶囊白", "E-Paper Substrate"],
      ["#141413", "高对比纯碳墨", "Carbon Pigment"],
      ["#DFDCD3", "折角纸阴面", "Dog-Ear Shade"],
      ["#2C2C2A", "阅读器外框", "Reader Bezel"],
    ],
    donts: [
      "严禁出现任何彩色像素（零蓝链、零红绿灯——全部用反色黑块或下划线表达）",
      "严禁使用平滑淡入淡出（ease-in-out）或模糊阴影——视图切换只能用 steps() 阶跃反色闪烁",
      "图表严禁使用半透明灰，必须用 1-bit 棋盘点阵抖动（Bayer Dithering）表现灰阶",
    ],
    dontsEn: [
      "NEVER render any chromatic color (zero blue links or green/red pills — use inverted black blocks or underlines)",
      "NEVER use smooth ease-in-out fades or blurred shadows — transitions must use stepped invert() GC16 flashes",
      "NEVER use CSS opacity for chart shading — use 4px×4px 1-bit checkerboard Bayer dithering patterns",
    ],
    prompt: `请采用「电子墨水屏 GC16 与 1-bit 点阵抖动美学（E-Ink Paper UI）」构建此界面：
1. 纯粹双色：全站严格限制为哑光墨水纸底 #F1EEE7 与纯碳墨黑 #141413（零彩色、零渐变、零模糊阴影）。
2. 像素抖动灰阶：图表或次要填充区严禁使用 opacity 半透明，改用 4px×4px 棋盘格/圆点 Bayer Dither 图案模拟 25%/50% 灰阶。
3. 灵魂微交互：禁用一切平滑过渡动画，切换 Tab 或弹窗时触发 340ms steps(1, end) 的 invert(1) 黑白反色全刷显影动画（模拟真实墨水屏清残影）。`,
    promptEn: `Build this interface using the "E-Ink GC16 & 1-Bit Bayer Dither" aesthetic:
1. Strict Monochrome: Restrict the entire palette to matte E-Paper #F1EEE7 and crisp carbon pigment #141413 (zero color, zero gradients, zero drop shadows).
2. Stipple Dithering: Replace all translucent greys/chart fills with 4px×4px checkerboard and radial stipple dither patterns (25% / 50% / 75% density).
3. Waveform Refresh: Disable smooth CSS transitions; trigger a 340ms steps(1, end) invert(1) black-flash animation whenever tabs or panels switch.`,
  },
  {
    num: "05",
    slug: "magi-terminal",
    name: "磁带未来主义 / MAGI 终端",
    en: "Cassette Futurism MAGI CRT",
    cat: "复古屏幕",
    catEn: "Retro Displays",
    origin:
      "致敬《EVA》NERV 总部 MAGI 三贤人超算系统与 1979《异形》飞船大型机界面——高对比单色荧光 CRT、45° 工业警示斜纹与八角切角装甲板。",
    originEn:
      "Pays homage to Evangelion's NERV MAGI supercomputer and Alien (1979) MU/TH/UR mainframes — phosphor amber/green CRTs, -45° hazard stripes, and octagonal chamfered plates.",
    bestFor: "Multi-Agent 多智能体协同监控大屏、安全攻防/CTF 平台、高危运维审批台。",
    bestForEn: "Multi-agent consensus dashboards, cybersecurity/CTF portals, DevOps war-rooms.",
    swatches: [
      ["#080A09", "CRT 荧光黑底", "CRT Void Black"],
      ["#FF9D00", "琥珀荧光橙", "Phosphor Amber"],
      ["#22FF66", "同步荧光绿", "Sync Green"],
      ["#FF2A2A", "否决警报红", "Veto Crimson"],
    ],
    donts: [
      "严禁做成粉青渐变的俗套赛博朋克（Vaporwave）——磁带未来主义只用黑底配纯琥珀橙/荧光绿/警报红三通道",
      "严禁使用圆润卡片（改用 clip-path 45° 切角八边形面板）",
      "危险按钮严禁直接裸露可点，宜配“先解锁安全保险开关（ARM）”的双步交互",
    ],
    dontsEn: [
      "NEVER use pink-to-cyan vaporwave gradients — stick strictly to Amber, Phosphor Green, and Crimson on deep black",
      "NEVER use soft rounded-2xl cards — chamfer corners at 45° using clip-path polygon()",
      "NEVER expose destructive actions without a two-step safety toggle (ARM OVERRIDE)",
    ],
    prompt: `请采用「磁带未来主义 / EVA MAGI 超算终端美学（MAGI CRT UI）」构建此界面：
1. 荧光配色：深黑 CRT 底色 #080A09 叠加细微水平扫描线遮罩，主信息色为琥珀橙 #FF9D00，通过态为荧光绿 #22FF66，否决/警报态为 #FF2A2A。
2. 几何切角与警示条：页眉或高危弹窗顶部放置 -45deg 黑橙相间斜纹警示带（repeating-linear-gradient），核心状态卡片采用 clip-path 八角切角边框。
3. 适合展示多智能体（如 3 节点表决矩阵）与实时绿色荧光示波器曲线。`,
    promptEn: `Build this interface using the "Cassette Futurism / EVA MAGI Terminal" aesthetic:
1. Phosphor Channels: Deep CRT void #080A09 with subtle horizontal scanlines, primary Amber #FF9D00, synchronized Green #22FF66, and alert Crimson #FF2A2A.
2. Chamfered Geometry & Hazard Bars: Frame headers and alert dialogs with -45deg black-and-amber repeating hazard stripes, and bevel status nodes into octagonal plates via clip-path.
3. Ideal for multi-agent voting matrices (APPROVE / VETO) and live green oscilloscope telemetry.`,
  },
  {
    num: "06",
    slug: "xuan-wusilan",
    name: "宋刻乌丝栏与宣纸朱砂印",
    en: "Song Wusilan & Cinnabar Seal",
    cat: "文化古籍",
    catEn: "Cultural & Archival",
    origin:
      "汲取中国宋代刻本书籍的「乌丝栏」双细线版框规制、安徽手工宣纸留白呼吸感与寿山石阴阳文朱砂印章，做极度克制、现代且不土气的东方编辑美学。",
    originEn:
      "Draws from Song-dynasty woodblock editions (Wusilan double-hairline frames), handmade Anhui Xuan paper whitespace, and carved Shou-shan stone cinnabar seals.",
    bestFor: "东方美学/茶香设计品牌出海、人文播客与诗歌长文、独立游戏官网、精选知识册。",
    bestForEn: "Cultural & lifestyle brands, literary essays, indie game portals, curated anthologies.",
    swatches: [
      ["#F7F4EB", "手工生宣白", "Unbleached Xuan"],
      ["#22201D", "松烟浓墨黑", "Pine-Soot Ink"],
      ["#5C574F", "淡墨批注灰", "Diluted Wash Ink"],
      ["#B82925", "朱砂印泥红", "Cinnabar Paste"],
    ],
    donts: [
      "严禁堆砌祥云、金龙、大红灯笼或浮夸毛笔飞白贴图——保持宋代建筑与刻本般的极简秩序",
      "严禁使用圆角胶囊标签（Tag 必须做成直角微瑕的阳文红框章或阴文红底章）",
      "朱砂红 #B82925 全屏占比严禁超过 8%，留足 35% 以上宣纸留白",
    ],
    dontsEn: [
      "NEVER add kitschy dragon clipart, red lanterns, or heavy faux-brushstrokes — keep it architectural & Song-minimalist",
      "NEVER use rounded-full pill tags — style all badges as crisp square Yang (red-border) or Yin (red-fill) stone seals",
      "NEVER let Cinnabar Red #B82925 exceed 8% of the viewport; preserve at least 35% calm paper whitespace",
    ],
    prompt: `请采用「现代克制版宋刻乌丝栏与宣纸朱砂印美学（Xuan & Wusilan UI）」构建此界面：
1. 宣纸与乌丝栏：基底采用温润生宣白 #F7F4EB，主版心四周采用宋刻本“乌丝栏”双线外框（外框 1.5px solid #2B2824，留 3px 间隙套内框 0.75px 细线）。
2. 排版与朱砂点睛：标题与正文采用高对比宋体/衬线体并留足字距与留白；全站唯一点缀色为朱砂印泥红 #B82925（占比不超过 8%）。
3. 组件转译：所有状态标签改为方正直角阳文印（红框白底「审定」）或阴文印（红底白字），顶部导航改为向下垂挂的丝质书签条，输入框仅保留底边 1px 墨线。`,
    promptEn: `Build this interface using the "Song-Dynasty Wusilan & Cinnabar Seal" editorial aesthetic:
1. Xuan Paper & Wusilan Frame: Unbleached warm paper #F7F4EB framed by a traditional double-line Wusilan border (1.5px solid #2B2824 outer frame + 3px gap + 0.75px inner hairline).
2. Typography & Cinnabar Restraint: High-contrast editorial serif/Songti with generous tracking and 35%+ whitespace; sole chromatic accent is Cinnabar Red #B82925 (≤8% area).
3. Component Translation: Replace pill badges with square Yang/Yin stone seals, style nav tabs as vertical hanging bookmark ribbons, and use bottom-only 1px ink hairlines for inputs.`,
  },
  {
    num: "07",
    slug: "split-flap",
    name: "机械翻页牌与登机牌",
    en: "Solari Split-Flap & Boarding Pass",
    cat: "工业硬件",
    catEn: "Industrial Hardware",
    origin:
      "源自意大利 Solari Udine 经典机场/火车站机械翻页时刻表、Vignelli 航站楼亮黄导视灯箱，以及带半圆撕裂缺口的纸质航空登机牌。",
    originEn:
      "Modeled after 1960s Solari Udine airport mechanical split-flap departure boards, Massimo Vignelli signal-yellow wayfinding lightboxes, and perforated IATA boarding passes.",
    bestFor: "CI/CD 部署流水线监控大屏、新品发售倒计时、活动票务与日程表、实时排行榜。",
    bestForEn: "CI/CD deployment boards, launch countdowns, event ticketing, live leaderboards.",
    swatches: [
      ["#16171A", "翻页牌炭黑箱", "Flap Housing"],
      ["#FFD100", "航站导视亮黄", "Signal Yellow"],
      ["#4ADE80", "准点通行绿", "On-Time Green"],
      ["#F6F4EE", "登机牌卡纸", "Boarding Stock"],
    ],
    donts: [
      "核心状态严禁直接渲染成一整行普通字符串，应拆成单字符一格的独立翻页叶片（带中间 50% 转轴黑缝）",
      "导视黄 #FFD100 严禁调淡成奶油黄，必须维持机场级高对比视觉穿透力",
    ],
    dontsEn: [
      "NEVER render primary board statuses as plain inline strings — split every character into individual hinged flap tiles",
      "NEVER mute Signal Yellow #FFD100 into pale cream; preserve high-contrast terminal legibility",
    ],
    prompt: `请采用「Solari 机场机械翻页牌与登机牌美学（Split-Flap UI）」构建此界面：
1. 导视配色：炭黑机械展板 #16171A 搭配高对比航站楼导视黄灯箱条 #FFD100（配纯黑粗体字）。
2. 机械翻页格：关键指标与实时状态按单字符拆分为独立翻页格（上下两半微渐变并在 50% 高度处留 1px 转轴黑缝），数值更新时按 20ms 错峰触发 rotateX 翻牌动画。
3. 登机牌卡片：信息卡采用米白卡纸 #F6F4EE，左右边缘做半圆打孔缺口，主副联之间用 2px 竖向虚线分割。`,
    promptEn: `Build this interface using the "Solari Split-Flap & Boarding Pass" aesthetic:
1. Wayfinding Contrast: Matte charcoal board #16171A paired with bold #FFD100 airport wayfinding header strips.
2. Split-Flap Tiles: Render key metrics and statuses as single-character mechanical flap cells with a 1px horizontal hinge seam at 50% height and staggered 20ms rotateX flip animations.
3. Boarding Pass Cards: Off-white #F6F4EE cards featuring semicircular side punch-out notches and 2px dashed vertical tear stubs.`,
  },
  {
    num: "08",
    slug: "risograph-print",
    name: "Risograph 孔版套色错位",
    en: "Risograph Multiply & Misprint",
    cat: "印刷纸品",
    catEn: "Print & Paper",
    origin:
      "源自日本理想科学（Riso）数字孔版油印机与独立艺术书（Zine）文化——半透明植物大豆油墨在粗糙纸面上正片叠底，并保留迷人的手工套色微错位。",
    originEn:
      "Inspired by Riso Kagaku stencil duplicators in indie zine publishing — translucent soy inks multiplying over uncoated paper with charming 3px–5px plate misregistration.",
    bestFor: "独立设计师作品集、音乐节/艺术展专题页、创意工作室官网、数字杂志 Zine。",
    bestForEn: "Designer portfolios, music/art festival sites, creative studios, digital zines.",
    swatches: [
      ["#F8F4EA", "未涂布艺术纸", "Uncoated Paper"],
      ["#FF48B0", "Riso 荧光粉鼓", "Fluorescent Pink"],
      ["#0078BF", "Riso 群青蓝鼓", "Risograph Blue"],
      ["#3D2673", "正片叠底紫", "Overprint Violet"],
    ],
    donts: [
      "外层纸张容器严禁漏写 isolation: isolate（否则 mix-blend-mode: multiply 会穿透污染外部背景）",
      "严禁同时使用超过 2 种彩色油墨（真实双滚筒油印只靠两色交叠自动产生第 3 种叠印色）",
      "严禁使用模糊投影——立体感完全由偏移 3px~5px 的双色版面错位塑造",
    ],
    dontsEn: [
      "NEVER omit isolation: isolate on the paper container (otherwise mix-blend-mode: multiply bleeds into dark parent backgrounds)",
      "NEVER introduce more than 2 chromatic ink colors at once — let multiply overprinting create the 3rd violet shade naturally",
      "NEVER use Gaussian box-shadow — create depth strictly via 3px–5px offset ink plates",
    ],
    prompt: `请采用「Risograph 孔版双色套色错位油印美学（Risograph Print UI）」构建此界面：
1. 双滚筒油墨限制：纸面基底为米白未涂布纸 #F8F4EA（必须声明 isolation: isolate），全页严格只用两种大豆油墨色：荧光粉 #FF48B0 与群青蓝 #0078BF。
2. 正片叠底与套色错位：重叠图层与双层按钮统一设置 mix-blend-mode: multiply，背景色版相对前景线框故意偏移 translate(4px, 4px)，在按钮 :hover 时归零对齐（模拟套准合拢）。
3. 禁用一切模糊阴影与渐变色。`,
    promptEn: `Build this interface using the "Risograph Soy-Ink Multiply & Misregistration" aesthetic:
1. Two-Drum Discipline: Uncoated warm paper #F8F4EA (with isolation: isolate!) printed strictly with two soy inks: Fluorescent Pink #FF48B0 and Risograph Blue #0078BF.
2. Multiply & Misregistration: Apply mix-blend-mode: multiply to overlapping frames and buttons, shifting the secondary ink plate by translate(4px, 4px) and snapping to (0, 0) on :hover.
3. Strictly NO soft shadows or gradients.`,
  },
  {
    num: "09",
    slug: "swiss-apothecary",
    name: "瑞士药剂标签与实验刻度",
    en: "Swiss Apothecary & Meniscus",
    cat: "技术制图",
    catEn: "Technical & Schematic",
    origin:
      "结合 Aesop 琥珀遮光药剂瓶配方签、1950 年代瑞士国际主义粗细黑线排版，以及硼硅酸盐实验室量筒的液体弯月面（Meniscus）计量美学。",
    originEn:
      "Combines Aesop compounding apothecary labels, 1950s Swiss International Typographic rule hierarchy, and borosilicate laboratory graduated cylinder meniscus gauges.",
    bestFor: "大模型评测基准对比页、Prompt/RAG 配方参数卡、健康/护肤/精品咖啡品牌站。",
    bestForEn: "LLM benchmark tables, RAG/prompt formulation cards, skincare/coffee/wellness brands.",
    swatches: [
      ["#F4F1EA", "无菌棉质签纸", "Cotton Label"],
      ["#121211", "瑞士印刷纯黑", "Printer's Black"],
      ["#5C2D0C", "遮光琥珀玻璃", "Amber Vial"],
      ["#B45309", "试剂弯月面液", "Reagent Meniscus"],
    ],
    donts: [
      "规格表格内严禁塞入花哨彩色小图标或 Emoji——完全依靠 4px / 2px / 1px 纯黑横线粗细对比建立秩序",
      "严禁居中对齐段落——严格遵守瑞士网格左对齐键名、右对齐等宽批号与百分比数值",
    ],
    dontsEn: [
      "NEVER clutter specification tables with decorative icons or emojis — rely on stark 4px / 2px / 1px black rule contrast",
      "NEVER center-align copy inside labels — enforce flush-left uppercase keys and flush-right monospace batch numbers",
    ],
    prompt: `请采用「瑞士药剂处方签与实验量筒美学（Swiss Apothecary UI）」构建此界面：
1. 琥珀衬底与棉纸签：外围衬以深琥珀遮光玻璃质感（#4B2509 -> #7C3F11），核心内容承载于棉白标签纸 #F4F1EA（2px 纯黑实线外框 #121211）。
2. 瑞士粗细线秩序：主标题下方压 4px 粗黑线，参数表行间用 1px 纯黑细线分割，左侧粗体大写参数名，右侧等宽对齐浓度/批号（如 BATCH 26-K // 75.0% v/v）。
3. 进度与配比改用带右侧毫升刻度线（mL）的垂直玻璃液位量筒组件展示。`,
    promptEn: `Build this interface using the "Swiss Apothecary Label & Lab Meniscus" aesthetic:
1. Label on Amber Glass: Frame crisp #F4F1EA cotton paper labels (2px solid #121211 border) over a deep UV-protective amber backdrop (#4B2509 -> #7C3F11).
2. Rule Hierarchy: Anchor headings with a 4px solid #121211 bottom rule, divide spec rows with 1px rules, pairing left-aligned bold keys with right-aligned monospace values (BATCH 26-K // 75.0% v/v).
3. Replace standard progress bars with vertical graduated cylinders featuring mL ticks and an amber meniscus rim.`,
  },
  {
    num: "10",
    slug: "analog-tape-deck",
    name: "磁带卡座与暖光指针表",
    en: "Analog Tape Deck & VU Meter",
    cat: "工业硬件",
    catEn: "Industrial Hardware",
    origin:
      "致敬 1970 年代末 Nakamichi Dragon 与 Sony Hi-Fi 立体声磁带卡座——拉丝香槟银金属面板、钨丝暖黄背光 VU 摆动红针表头与双轴磁带观察窗。",
    originEn:
      "Salutes late-1970s Nakamichi & Sony Hi-Fi stereo cassette decks — brushed champagne-silver faceplates, tungsten-backlit swinging red VU needles, and spinning dual tape hubs.",
    bestFor: "AI 实时语音通话前端、播客与有声书播放器、AI 作曲配音工具、白噪音专注软件。",
    bestForEn: "Realtime Voice AI frontends, podcast/audiobook players, music tools, ambient focus apps.",
    swatches: [
      ["#CFCBC0", "拉丝香槟银铝", "Brushed Champagne"],
      ["#232220", "深灰磁带暗仓", "Tape Well Dark"],
      ["#F3C46B", "钨丝灯暖背光", "Tungsten VU Glow"],
      ["#B91C1C", "VU 峰值红指针", "Peak Red Needle"],
    ],
    donts: [
      "VU 表头严禁使用冰冷刺眼的纯白或蓝光背景——必须是底部向上晕开的钨丝暖琥珀背光",
      "流式加载状态优先使用同步旋转的双磁带卷轴，而非千篇一律的圆环菊花 Loading",
    ],
    dontsEn: [
      "NEVER light the VU meter with cold white or blue LEDs — use a warm tungsten radial glow (#FFE6A3 -> #CFA04E)",
      "NEVER use generic circular spinners when dual synchronized cassette tape reels can indicate streaming/loading",
    ],
    prompt: `请采用「复古 Hi-Fi 磁带卡座与模拟指针 VU 表美学（Analog Tape Deck UI）」构建此界面：
1. 金属面板：外框采用拉丝香槟银铝纵向微渐变（#DCD9D0 -> #C2BEB2）配顶部高光边，内嵌深炭黑磁带仓 #232220 与四位黑底机械里程计数字窗（0142）。
2. 灵魂组件：右侧配置钨丝灯暖黄径向背光（#FFE6A3 -> #CFA04E）的模拟 VU 电平表，底部圆轴支起一根随信号实时摆动的细红指针（#B91C1C）；流式等待态采用双齿轮磁带轴同步旋转表现。`,
    promptEn: `Build this interface using the "Analog Hi-Fi Tape Deck & VU Meter" aesthetic:
1. Brushed Faceplate: Metallic champagne-silver vertical gradient (#DCD9D0 -> #C2BEB2) housing a recessed #232220 cassette bay and a 4-digit black mechanical odometer counter (0142).
2. Soul Widgets: Pair dual spinning cassette tape hubs with a warm tungsten radial-backlit (#FFE6A3 -> #CFA04E) analog VU meter featuring a bottom-pivoted swinging red needle (#B91C1C).`,
  },
  {
    num: "11",
    slug: "atomic-purple",
    name: "千禧透明紫掌机透视电路",
    en: "Y2K Atomic Purple PCB Shell",
    cat: "工业硬件",
    catEn: "Industrial Hardware",
    origin:
      "源自 1998 年任天堂 Game Boy Color「Atomic Purple（原子透明紫）」与 iMac G3 半透明注塑聚碳酸酯外壳，隐约透出内部铜箔走线与镀金焊点。",
    originEn:
      "Evokes the 1998 Nintendo Game Boy Color 'Atomic Purple' & iMac G3 translucent injection-molded polycarbonate shells revealing internal 45° copper PCB traces and gold solder pads.",
    bestFor: "独立游戏启动器与社区、潮玩/数字藏品主页、Z 世代创意小工具、极客个人名片页。",
    bestForEn: "Indie game launchers, collectible communities, Y2K creative toys, developer bio pages.",
    swatches: [
      ["#231636", "底层紫黑基板", "PCB Substrate"],
      ["#7E3AF2", "半透聚碳酸酯", "Atomic Polycarbonate"],
      ["#FBBF24", "沉金焊盘圆点", "Gold Solder Pad"],
      ["#34D399", "导电硅胶 A 键", "Silicone A-Btn"],
    ],
    donts: [
      "磨砂模糊度严禁超过 4px（一旦写成 blur(20px) 底下的电路板就彻底糊没了，退化成普通毛玻璃！）",
      "底层 SVG 电路走线严禁画成弯曲波浪线——真实 PCB 铜箔走线只能按 45° 与 90° 折角布线",
    ],
    dontsEn: [
      "NEVER exceed backdrop-filter: blur(3.5px) — heavy blur obliterates the underlying PCB traces into generic glassmorphism",
      "NEVER draw wavy curved circuit lines — authentic PCB traces bend strictly at 45° and 90° angles",
    ],
    prompt: `请采用「千禧 Game Boy 透明紫外壳透视电路美学（Atomic Purple Y2K UI）」构建此界面：
1. 双层透视结构（关键！）：底层容器 #231636 内铺设一张 45°/90° 折角布线的 SVG 电路板路径（淡紫铜箔线 #C084FC + 镀金圆焊盘 #FBBF24）；上层卡片覆盖 rgba(126,58,242,0.42) 半透明紫塑料壳并严格限制 backdrop-filter: blur(2.5px)（确保清晰透出底层焊点！）。
2. 控制器质感：交互按钮采用导电硅胶十字方向键与微倾 -12deg 的红绿立体圆键（带 4px 硅胶按压阴影）。`,
    promptEn: `Build this interface using the "Y2K Atomic Purple Translucent PCB Shell" aesthetic:
1. Two-Layer See-Through Architecture: Place an inline SVG of 45°/90°-routed PCB traces (#C084FC) and gold circular solder pads (#FBBF24) over #231636, then layer a rgba(126,58,242,0.42) shell with tight backdrop-filter: blur(2.5px) on top so traces remain visible.
2. Tactile Controls: Use conductive dark D-Pads and -12deg angled rubber-dome A/B circular buttons with 3px hard travel shadows.`,
  },
  {
    num: "12",
    slug: "corkboard-dossier",
    name: "侦探线索板红绳与机密档案",
    en: "Corkboard Red-String & Dossier",
    cat: "文化古籍",
    catEn: "Cultural & Archival",
    origin:
      "源自黑色侦探电影中的软木塞案件推理墙、FBI 解密牛皮纸档案袋（涂黑脱敏文字）以及拍立得白边证据快照，用自然下垂的红毛线串联节点。",
    originEn:
      "Inspired by neo-noir investigative corkboards, declassified FOIA manila folders with black-marker redactions, Polaroid evidence prints, and gravity-sagging red yarn links.",
    bestFor: "AI 深度调查/OSINT 情报图谱、悬疑解谜游戏官网、非线性头脑风暴白板、播客专题。",
    bestForEn: "OSINT / AI investigative graph explorers, mystery/ARG games, brainstorming boards, true-crime podcasts.",
    swatches: [
      ["#B88B58", "天然软木塞板", "Natural Corkboard"],
      ["#EFE4C8", "牛皮纸档案卡", "Manila Dossier"],
      ["#DC2626", "立体图钉红绳", "Push-Pin Red Yarn"],
      ["#FEF08A", "解密高亮便签", "Canary Sticky Note"],
    ],
    donts: [
      "严禁把所有证据卡片排成横平竖直 0° 的死板网格——赋予 -1deg 至 +1.5deg 的自然手工钉挂倾角",
      "图钉之间的红绳严禁画成笔直的尺规直线——必须用二次贝塞尔曲线向下偏移 25px+ 模拟重力自然垂坠",
    ],
    dontsEn: [
      "NEVER align every evidence card into a sterile 0° SaaS grid — apply subtle -1deg to +1.5deg organic pin rotations",
      "NEVER connect push-pins with straight ruler lines — use quadratic Bézier curves sagging downward (+25px Y) under gravity",
    ],
    prompt: `请采用「侦探软木塞线索板与机密档案美学（Corkboard & Redacted Dossier UI）」构建此界面：
1. 材质层次：外框与背景为颗粒感软木塞底板 #B88B58（四周带内暗角阴影），卡片分三种纸品：牛皮档案纸 #EFE4C8、拍立得白边相框、明黄推理便签 #FEF08A，各自带 ±1deg 微倾角并在顶部正中钉入红色立体圆图钉。
2. 红绳与机密涂黑：关联卡片之间通过顶层 SVG 绘制带重力下垂弧度的 #DC2626 红色二次贝塞尔曲线连接；敏感词使用黑条涂抹（.redacted），悬停或点击时揭晓明文。`,
    promptEn: `Build this interface using the "Detective Corkboard, Red-String & Redacted Dossier" aesthetic:
1. Board & Paper Stock: Textured cork substrate #B88B58 (inset vignette shadow) holding slightly tilted (±1deg) #EFE4C8 manila dossiers, white Polaroid frames, and #FEF08A sticky notes anchored by glossy red push-pins.
2. Red Yarn & Redactions: Link related pins via overlaid #DC2626 SVG quadratic Bézier curves with downward gravity sag, and mask sensitive keywords behind #161615 redaction bars that reveal on hover/click.`,
  },
];
