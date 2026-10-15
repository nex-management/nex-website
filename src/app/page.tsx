import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { CeoQuote } from "@/components/home/CeoQuote";
import { Contact } from "@/components/home/Contact";
import { Hero } from "@/components/home/Hero";
import { Partner } from "@/components/home/Partner";
import { Portfolio } from "@/components/home/Portfolio";
import { Services } from "@/components/home/Services";
import { StatsBand } from "@/components/home/StatsBand";
import { Testimonials } from "@/components/home/Testimonials";
import { TrackRecord } from "@/components/home/TrackRecord";
import { Video } from "@/components/home/Video";
import { WhoWeAre } from "@/components/home/WhoWeAre";

export default function HomePage() {
  return (
    <>
      <Header currentPath="/" />
      <main className="flex flex-1 flex-col">
        <Hero />
        <StatsBand />
        <WhoWeAre />
        <Services />
        <Portfolio />
        <TrackRecord />
        <CeoQuote />
        <Partner />
        <Testimonials />
        <Video />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
