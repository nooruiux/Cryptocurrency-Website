import { BackgroundEffects } from "@/components/sections/BackgroundEffects";
import { BuildPortfolio } from "@/components/sections/BuildPortfolio";
import { ControlCrypto } from "@/components/sections/ControlCrypto";
import { CryptoSlider } from "@/components/sections/CryptoSlider";
import { ExploreProducts } from "@/components/sections/ExploreProducts";
import { Hero } from "@/components/sections/Hero";
import { MiningPlan } from "@/components/sections/MiningPlan";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { SiteHeader } from "@/components/sections/SiteHeader";

export default function Home() {
  return (
    <div className="relative isolate overflow-x-clip">
      <BackgroundEffects />
      <SiteHeader />
      <main id="main">
        <Hero />
        <ExploreProducts />
        <ControlCrypto />
        <CryptoSlider />
        <MiningPlan />
        <BuildPortfolio />
      </main>
      <SiteFooter />
    </div>
  );
}
