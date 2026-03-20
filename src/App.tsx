import "./App.css";
import { motion, type Variants } from "framer-motion";
import { useSetAtom } from "jotai";
import {
  Audience,
  CallToAction,
  Footer,
  Gallery,
  Header,
  Hero,
  Premium,
  Services,
} from "./components";
import {
  type Section as AtomSection,
  currentSectionAtom,
} from "./states/cursection";

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 100 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.2, duration: 0.9, ease: "easeInOut" },
  },
};

function WithSectionName({
  children,
  name,
}: {
  children: React.ReactNode;
  name: AtomSection;
}) {
  const setCurrentSection = useSetAtom(currentSectionAtom);

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: <explanation>
    <div
      onFocusCapture={() => setCurrentSection(name)}
      onMouseEnter={() => setCurrentSection(name)}
      onTouchStart={() => setCurrentSection(name)}
    >
      {children}
    </div>
  );
}

function AnimatedSection({ children }: { children: React.ReactNode }) {
  return (
    <motion.section
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      {children}
    </motion.section>
  );
}

function App() {
  return (
    <main className="min-h-screen bg-slushup-cream">
      <Header />
      <WithSectionName name="hero">
        <Hero />
      </WithSectionName>
      <WithSectionName name="cta">
        <AnimatedSection>
          <CallToAction />
        </AnimatedSection>
      </WithSectionName>
      <WithSectionName name="services">
        <Services />
      </WithSectionName>
      <WithSectionName name="audience">
        <AnimatedSection>
          <Audience />
        </AnimatedSection>
      </WithSectionName>
      <WithSectionName name="premium">
        <AnimatedSection>
          <Premium />
        </AnimatedSection>
      </WithSectionName>
      <WithSectionName name="gallery">
        <AnimatedSection>
          <Gallery />
        </AnimatedSection>
      </WithSectionName>
      <WithSectionName name="footer">
        <Footer />
      </WithSectionName>
    </main>
  );
}

export default App;
