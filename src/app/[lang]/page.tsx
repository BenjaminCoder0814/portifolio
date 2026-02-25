import BootLoader from "@/components/BootLoader";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import ScrollIndicator from "@/components/ScrollIndicator";
import TerminalModal from "@/components/TerminalModal";
import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Formation from "@/sections/Formation";
import Projects from "@/sections/Projects";
import KnowMe from "@/sections/KnowMe";
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
        <Formation />
        <Projects />
        <KnowMe />
        <Contact />
      </main>
      <Footer />
      <TerminalModal />
    </>
  );
}
