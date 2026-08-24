import BootLoader from "@/components/BootLoader";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import ScrollIndicator from "@/components/ScrollIndicator";
import TerminalModal from "@/components/TerminalModal";
import Hero from "@/sections/Hero";
import Systems from "@/sections/Systems";
import Achievements from "@/sections/Achievements";
import Projects from "@/sections/Projects";
import Writing from "@/sections/Writing";
import EngineeringMindset from "@/sections/EngineeringMindset";
import About from "@/sections/About";
import Formation from "@/sections/Formation";
import TechStack from "@/sections/TechStack";
import KnowMe from "@/sections/KnowMe";
import NowSection from "@/sections/NowSection";
import Contact from "@/sections/Contact";
import Footer from "@/components/Footer";

/**
 * Home, ordered by what a recruiter needs in the order they need it.
 *
 * The first three screens are unchanged and stay fast: Hero states the claim,
 * Systems gives three doors with the numbers on the card, Achievements and
 * Projects are the evidence. Nothing paragraph-heavy competes with the work
 * before the work has been seen.
 *
 * Everything after Projects is depth for the reader who kept scrolling —
 * Writing surfaces the technical notes, then how I think, the trajectory, the
 * education, the stack, and finally contact. Someone who only reads the top
 * still gets the whole argument; someone who wants the long version has it.
 */
export default function LangHome() {
  return (
    <>
      <BootLoader />
      <CustomCursor />
      <ScrollIndicator />
      <Navbar />
      <main>
        <Hero />
        <Systems />
        <Achievements />
        <Projects />
        <Writing />
        <EngineeringMindset />
        <About />
        <Formation />
        <TechStack />
        <KnowMe />
        <NowSection />
        <Contact />
      </main>
      <Footer />
      <TerminalModal />
    </>
  );
}
