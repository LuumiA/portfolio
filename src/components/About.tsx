import { animate, useInView } from "motion/react";
import { useEffect, useRef } from "react";
import { useI18n } from "../i18n";
import Reveal from "./Reveal";

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const el = ref.current;
    const c = animate(0, to, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (v) => {
        el.textContent = Math.round(v) + suffix;
      },
    });
    return () => c.stop();
  }, [inView, to, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

const values = [
  { n: 5, s: "" },
  { n: 10, s: "+" },
  { n: 100, s: "%" },
];

export default function About() {
  const { t } = useI18n();
  return (
    <section id="a-propos" className="section">
      <Reveal>
        <p className="eyebrow">{t.about.eyebrow}</p>
        <h2>{t.about.title}</h2>
      </Reveal>
      <div className="about-grid">
        <Reveal delay={0.1}>
          <p className="about-text">{t.about.p1}</p>
          <p className="about-text">{t.about.p2}</p>
        </Reveal>
        <Reveal delay={0.2} className="stats">
          {values.map((v, i) => (
            <div key={i} className="stat">
              <strong>
                <Counter to={v.n} suffix={v.s} />
              </strong>
              <span>{t.about.stats[i]}</span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
