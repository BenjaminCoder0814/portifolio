import BootLoader from "@/components/BootLoader";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import ScrollIndicator from "@/components/ScrollIndicator";
import TerminalModal from "@/components/TerminalModal";
import Hero from "@/sections/Hero";
import About from "@/sections/About";
import EngineeringMindset from "@/sections/EngineeringMindset";
import Formation from "@/sections/Formation";
import TechStack from "@/sections/TechStack";
import Projects from "@/sections/Projects";
import CaseStudy from "@/sections/CaseStudy";
import KnowMe from "@/sections/KnowMe";
import NowSection from "@/sections/NowSection";
import Contact from "@/sections/Contact";
import Footer from "@/components/Footer";

export default function LangHome() {
  return (
    <>
      <BootLoader />
      <CustomCursor />
      <ScrollIndicator />
      <Navbar />
      <main>
        <Hero />
        <About />
        <EngineeringMindset />
        <Formation />
        <TechStack />
        <Projects />
        <CaseStudy />
        <KnowMe />
        <NowSection />
        <Contact />
      </main>
      <Footer />
      <TerminalModal />
    </>
  );
}
