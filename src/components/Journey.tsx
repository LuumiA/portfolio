import { asset, CV_PATH } from "../config";
import { useI18n } from "../i18n";
import Reveal from "./Reveal";

export default function Journey() {
  const { t } = useI18n();
  return (
    <section id="parcours" className="section">
      <Reveal>
        <p className="eyebrow">{t.journey.eyebrow}</p>
        <h2>{t.journey.title}</h2>
      </Reveal>
      <ol className="timeline">
        {t.journey.items.map((it, i) => (
          <li key={i}>
            <Reveal delay={i * 0.1}>
              <div className="tl-card">
                <span className="tl-tag">{it.tag}</span>
                <h3>{it.title}</h3>
                <p className="tl-place">{it.place}</p>
                <p className="muted">{it.text}</p>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
      {CV_PATH && (
        <Reveal>
          <a href={asset(CV_PATH)} download className="btn ghost cv-btn">
            ⬇ {t.journey.cv}
          </a>
        </Reveal>
      )}
    </section>
  );
}
