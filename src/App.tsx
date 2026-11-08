import { motion, useScroll, useSpring } from "motion/react";
import { I18nProvider, useI18n } from "./i18n";
import Background from "./components/Background";
import Cursor from "./components/Cursor";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Journey from "./components/Journey";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Socials from "./components/Socials";

function Page() {
  const { t } = useI18n();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <>
      <motion.div className="progress" style={{ scaleX }} />
      <Background />
      <Cursor />
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Journey />
        <Projects />
        <Contact />
      </main>
      <footer className="footer">
        <Socials />
        <p>
          © {new Date().getFullYear()} LuumiA — {t.footer.built}
        </p>
      </footer>
    </>
  );
}

export default function App() {
  return (
    <I18nProvider>
      <Page />
    </I18nProvider>
  );
}
