import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/chompo/Hero";
import { IconBand } from "@/components/chompo/IconBand";
import { CollageGrid } from "@/components/chompo/CollageGrid";
import { CraveMarquee } from "@/components/chompo/CraveMarquee";
import { NewMeal } from "@/components/chompo/NewMeal";
import { TypeSpiral } from "@/components/chompo/TypeSpiral";
import { Reviews } from "@/components/chompo/Reviews";
import { FlavorCta } from "@/components/chompo/FlavorCta";
import { SiteFooter } from "@/components/chompo/SiteFooter";

const TITLE = "CHOMPO | Fast Food & Delivery That Hits Different";
const DESCRIPTION =
  "Bold burgers, crispy fries and fried chicken delivered fast. Order from CHOMPO and turn up the flavor.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="bg-cream">
      <Hero />
      <CraveMarquee />
      <CollageGrid />
      <IconBand />
      <NewMeal />
      <TypeSpiral />
      <Reviews />
      <FlavorCta />
      <SiteFooter />
    </main>
  );
}
