import { asset } from "../config";
import { skills } from "../data/projects";
import { useI18n } from "../i18n";

// Bandeau défilant infini (liste dupliquée pour la boucle)
export default function Skills() {
  const { t } = useI18n();
  const row = [...skills, ...skills];
  return (
    <section className="skills" aria-label={t.skills.label}>
      <div className="marquee">
        <div className="track">
          {row.map((s, i) => (
            <div className="chip" key={i} aria-hidden={i >= skills.length}>
              <img
                src={asset(`icons/${s.icon}.svg`)}
                alt={i >= skills.length ? "" : s.name}
                className={s.mono ? "mono" : undefined}
                width={28}
                height={28}
                loading="lazy"
              />
              <span>{s.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
