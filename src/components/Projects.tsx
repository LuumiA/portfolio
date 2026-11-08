import { useEffect, useRef, useState, type PointerEvent } from "react";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "motion/react";
import { projects, type Project } from "../data/projects";
import { useI18n } from "../i18n";
import Reveal from "./Reveal";

// Carte avec inclinaison 3D + reflet lumineux qui suit la souris
function Card({ p, index, onOpen }: { p: Project; index: number; onOpen: () => void }) {
  const { t, lang } = useI18n();
  const rx = useSpring(useMotionValue(0), { stiffness: 150, damping: 15 });
  const ry = useSpring(useMotionValue(0), { stiffness: 150, damping: 15 });
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const shine = useMotionTemplate`radial-gradient(400px circle at ${mx}% ${my}%, rgba(255,255,255,0.12), transparent 60%)`;

  const onMove = (e: PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * 10);
    rx.set((0.5 - py) * 10);
    mx.set(px * 100);
    my.set(py * 100);
  };
  const reset = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <Reveal delay={(index % 2) * 0.12}>
      <motion.article
        className="card"
        style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
        onPointerMove={onMove}
        onPointerLeave={reset}
      >
        <motion.div className="shine" style={{ background: shine }} />
        <div className="card-img">
          <img src={p.image} alt={`${t.projects.preview} ${p.title}`} loading="lazy" />
        </div>
        <div className="card-body">
          <div className="tags">
            {p.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <h3>{p.title}</h3>
          <p>{p.description[lang]}</p>
          <div className="card-links">
            <a href={p.live} target="_blank" rel="noreferrer" className="btn primary sm">
              {t.projects.visit}
            </a>
            <a href={p.code} target="_blank" rel="noreferrer" className="btn ghost sm">
              {t.projects.code}
            </a>
            <button className="btn ghost sm" onClick={onOpen}>
              {t.projects.details}
            </button>
          </div>
        </div>
      </motion.article>
    </Reveal>
  );
}

function Modal({ p, onClose }: { p: Project; onClose: () => void }) {
  const { t, lang } = useI18n();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <motion.div
      className="modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label={p.title}
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.96 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <button ref={closeRef} className="icon-btn modal-close" aria-label={t.projects.close} onClick={onClose}>
          ✕
        </button>
        <img src={p.image} alt={`${t.projects.preview} ${p.title}`} />
        <div className="modal-body">
          <h3>{p.title}</h3>
          <p className="muted">{p.description[lang]}</p>
          <p className="modal-label">{t.projects.stack}</p>
          <div className="tags">
            {p.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <div className="card-links">
            <a href={p.live} target="_blank" rel="noreferrer" className="btn primary sm">
              {t.projects.visit}
            </a>
            <a href={p.code} target="_blank" rel="noreferrer" className="btn ghost sm">
              {t.projects.code}
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const { t } = useI18n();
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="projets" className="section">
      <Reveal>
        <p className="eyebrow">{t.projects.eyebrow}</p>
        <h2>{t.projects.title}</h2>
      </Reveal>
      <div className="cards">
        {projects.map((p, i) => (
          <Card key={p.title} p={p} index={i} onOpen={() => setSelected(p)} />
        ))}
      </div>
      <AnimatePresence>
        {selected && <Modal p={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}
