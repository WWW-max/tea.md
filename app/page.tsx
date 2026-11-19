import { ALMANAC_CATALOG } from "./components/almanac-data";
import { GalleryHome } from "./components/gallery-home";

export default function HomePage() {
  return <GalleryHome entries={ALMANAC_CATALOG} />;
}
