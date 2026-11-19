import { GalleryHome } from "./components/gallery-home";
import { loadAllStyles } from "./lib/styles-loader";

export default async function HomePage() {
  const all = await loadAllStyles();
  // 首页仅传递卡片所需轻量元数据，保持静态包体极小
  const slimEntries = all.map(({ designMd: _md, primitive: _prim, customPreviewHtml: _html, ...rest }) => rest);
  return <GalleryHome entries={slimEntries} />;
}
