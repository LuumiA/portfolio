import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useI18n } from "../i18n";
import Magnetic from "./Magnetic";
import WordReveal from "./WordReveal";

export default function Hero() {
  const { t, lang } = useI18n();
  const words = t.hero.words;
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  // Repart de zéro quand la langue change
  useEffect(() => {
    setI(0);
    setText("");
    setDeleting(false);
  }, [lang]);

  // Machine à écrire en boucle
  useEffect(() => {
    const word = words[i] ?? "";
    const done = !deleting && text === word;
    const empty = deleting && text === "";
    const timer = setTimeout(
      () => {
        if (done) return setDeleting(true);
        if (empty) {
          setDeleting(false);
          return setI((i + 1) % words.length);
        }
        setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1));
      },
      done ? 1400 : deleting ? 45 : 90
    );
    return () => clearTimeout(timer);
  }, [text, deleting, i, words]);

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
  };

  return (
    <section id="top" className="hero">
      <motion.div
        className="hero-content"
        initial="hidden"
        animate="show"
        transition={{ staggerChildren: 0.12, delayChildren: 0.3 }}
      >
        <motion.span variants={item} className="badge">
          <i /> {t.hero.badge}
        </motion.span>
        <motion.h1 variants={item}>
          {t.hero.hi} <span className="gradient">Nicolas</span>,<br />
          {t.hero.role} <span className="typed">{text}</span>
          <span className="caret" />
        </motion.h1>
        <WordReveal key={lang} text={t.hero.lead} className="lead" delay={0.9} />
        <motion.div variants={item} className="cta">
          <Magnetic href="#projets" className="btn primary">
            {t.hero.cta1}
          </Magnetic>
          <Magnetic href="#contact" className="btn ghost">
            {t.hero.cta2}
          </Magnetic>
        </motion.div>
      </motion.div>

      <motion.a
        href="#a-propos"
        className="scroll-hint"
        aria-label={t.hero.scroll}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
      >
        <motion.span animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 1.6 }} />
      </motion.a>
    </section>
  );
}
