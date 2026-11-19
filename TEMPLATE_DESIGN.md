# UI Design System: "<Style Name / 美学中文名>"

> **Slug:** `<kebab-case-slug>`
> **Category:** `<Industrial Hardware | Print & Paper | Retro Displays | Cultural & Archival>`
> **One-Line Vibe:** <用一句话精准概括它的物理质感与视觉灵魂>

---

## 1. Aesthetic Identity & Origin（美学溯源与核心气质）
- **Historical / Material Reference:** <说明该设计语言源自什么真实工业产品、印刷工艺或历史文献，如 Dieter Rams 1960s Braun T3 收音机 / 日本理想科学工业 Risograph RP3700 油印机>
- **Best For:** <最适合的应用场景，如独立音频工具、长文阅读器、AI Agent 监控台>
- **Mood Keywords:** `<keyword-1>`, `<keyword-2>`, `<keyword-3>`, `<keyword-4>`

---

## 2. Color & Surface Tokens（色彩与材质色板）
- **Canvas / Substrate（基底材质色）:** `#______` — <描述表面质感，如温润哑光灰铝壳 / 未漂白宣纸>
- **Elevated Surface（浮起面板/卡片）:** `#______`
- **Recessed Surface（凹陷槽/内屏）:** `#______`
- **Primary Ink / Text（主墨色）:** `#______`
- **Muted / Annotation（次要批注色）:** `#______`
- **Signature Accent（灵魂点缀色，最多 1~2 个）:** `#______`

---

## 3. Typography & Spatial Rhythm（排版与网格秩序）
- **Headings:** <字体族、字重、字间距要求>
- **Data / Labels:** <等宽或衬线规范、大小写规则、数字等宽 `tabular-nums`>
- **Border & Corner Philosophy:** <圆角铁律，例如“严格直角 `0px`”或“机械外框 `16px` 配内屏 `6px`”>

---

## 4. Signature Physical Anchors（防 AI 幻觉的核心物理代码小抄）
> AI 在实现该风格时，**必须复用或参考以下核心 CSS / SVG 物理公式**，切勿仅修改背景色敷衍了事：

```css
/* 在此提供 15~35 行最决定质感成败的核心 CSS（如锯齿边缘、叠印混合模式、内凹高光阴影、反色闪烁帧动画等） */
```

---

## 5. Signature Components（世界观专属组件映射）
- **Buttons:** <按钮在该世界观下长什么样、按下去有什么反馈>
- **Cards / Containers:** <容器边框、角标或材质特征>
- **Badges / Status:** <如何用印章、LED 灯、翻页牌替代俗套的圆角胶囊 Badge>
- **Hero / Soul Widget:** <最具辨识度的 1 个独占交互挂件>

---

## 6. Anti-Slop Guardrails（严禁踩坑清单 / DON'Ts）
- ❌ **NEVER** use generic purple/indigo-to-blue SaaS gradients.
- ❌ **NEVER** use `<针对该风格的特定禁忌，例如墨水屏严禁使用 box-shadow 模糊阴影或半透明毛玻璃 backdrop-blur>`.
- ❌ **NEVER** use `<排版或圆角禁忌>`.
- ❌ **NEVER** mix conflicting metaphors outside this material system.
