import BootLoader from "@/components/BootLoader";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import ScrollIndicator from "@/components/ScrollIndicator";
import TerminalModal from "@/components/TerminalModal";
import Hero from "@/sections/Hero";
import Systems from "@/sections/Systems";
import Achievements from "@/sections/Achievements";
import Projects from "@/sections/Projects";
import TechStack from "@/sections/TechStack";
import Contact from "@/sections/Contact";
import Footer from "@/components/Footer";

/**
 * Home, rebuilt around one question: how fast can a recruiter get from landing
 * to the case study, and how much do they know before they click?
 *
 * Hero states the claim. Systems gives three doors, with the numbers on the
 * card so the click is earned rather than asked for. Achievements and Projects
 * are the evidence. Contact closes.
 *
 * Unmounted in this pass — the paragraph-heavy sections that sat between the
 * hero and the work: About, EngineeringMindset, Formation, CaseStudy (the
 * marketing one), KnowMe, NowSection. The components still exist; they are no
 * longer competing with the work for the first two screens.
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
        <TechStack />
        <Contact />
      </main>
      <Footer />
      <TerminalModal />
    </>
  );
}
