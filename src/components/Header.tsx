import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useI18n } from "../i18n";

type Theme = "dark" | "light";

function initialTheme(): Theme {
  try {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") return saved;
  } catch {
    /* stockage indisponible */
  }
  return "dark";
}

export default function Header() {
  const { t, lang, setLang } = useI18n();
  const [theme, setTheme] = useState<Theme>(initialTheme);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const links = [
    { href: "#a-propos", label: t.nav.about },
    { href: "#parcours", label: t.nav.journey },
    { href: "#projets", label: t.nav.projects },
    { href: "#contact", label: t.nav.contact },
  ];

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("theme", theme);
    } catch {
      /* stockage indisponible */
    }
  }, [theme]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      className={`header ${scrolled ? "scrolled" : ""}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="header-inner">
        <a href="#top" className="logo">
          Luumi<span>A</span>
        </a>

        <nav className="nav-desktop">
          {links.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <button
            className="icon-btn lang-btn"
            aria-label={t.nav.language}
            onClick={() => setLang(lang === "fr" ? "en" : "fr")}
          >
            {lang === "fr" ? "EN" : "FR"}
          </button>
          <button
            className="icon-btn"
            aria-label={t.nav.theme}
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={theme}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {theme === "dark" ? "🌙" : "☀️"}
              </motion.span>
            </AnimatePresence>
          </button>
          <button
            className="icon-btn burger"
            aria-label={t.nav.menu}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            className="nav-mobile"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
                {l.label}
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
