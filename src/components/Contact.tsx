import { useRef, useState, type FormEvent } from "react";
import emailjs from "@emailjs/browser";
import { AnimatePresence, motion } from "motion/react";
import { useI18n } from "../i18n";
import Reveal from "./Reveal";

type Status = { type: "idle" | "sending" | "ok" | "error"; msg?: string };

const COOLDOWN_MS = 60_000;

export default function Contact() {
  const { t } = useI18n();
  const [status, setStatus] = useState<Status>({ type: "idle" });
  const lastSent = useRef(0);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const d = new FormData(form);

    // Honeypot : un robot remplit ce champ caché, pas un humain. On simule un succès.
    if (String(d.get("website") ?? "") !== "") {
      form.reset();
      setStatus({ type: "ok", msg: t.contact.ok });
      return;
    }

    // Anti-spam côté client : un message par minute
    if (Date.now() - lastSent.current < COOLDOWN_MS) {
      setStatus({ type: "error", msg: t.contact.wait });
      return;
    }

    const nom = String(d.get("nom") ?? "");
    const email = String(d.get("email") ?? "");
    const message = String(d.get("message") ?? "");

    setStatus({ type: "sending" });
    try {
      await emailjs.send(
        "service_znffz6t",
        "template_vq1e6oh",
        {
          nom,
          email,
          message: `Bonjour Nicolas,\n\nVous avez reçu un nouveau message de :\n\nNom : ${nom}\nEmail : ${email}\nMessage : ${message}\n\nCordialement,\n${nom}`,
        },
        { publicKey: "Yhjm9lzQNZr4XtfIN" }
      );
      lastSent.current = Date.now();
      form.reset();
      setStatus({ type: "ok", msg: t.contact.ok });
    } catch (err) {
      console.error("Erreur EmailJS :", err);
      setStatus({ type: "error", msg: t.contact.error });
    }
  };

  return (
    <section id="contact" className="section contact">
      <Reveal>
        <p className="eyebrow">{t.contact.eyebrow}</p>
        <h2>{t.contact.title}</h2>
        <p className="muted center">{t.contact.sub}</p>
      </Reveal>
      <Reveal delay={0.1}>
        <form onSubmit={onSubmit} className="form">
          {/* Honeypot, invisible pour les humains */}
          <input
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden
            className="hp"
          />
          <label>
            <span>{t.contact.name}</span>
            <input name="nom" type="text" required maxLength={100} placeholder={t.contact.namePh} />
          </label>
          <label>
            <span>{t.contact.email}</span>
            <input name="email" type="email" required maxLength={200} placeholder={t.contact.emailPh} />
          </label>
          <label>
            <span>{t.contact.message}</span>
            <textarea
              name="message"
              required
              rows={6}
              maxLength={3000}
              placeholder={t.contact.messagePh}
            />
          </label>
          <motion.button
            type="submit"
            className="btn primary"
            disabled={status.type === "sending"}
            whileTap={{ scale: 0.97 }}
          >
            {status.type === "sending" ? t.contact.sending : t.contact.send}
          </motion.button>
          <AnimatePresence>
            {status.msg && (
              <motion.p
                key={status.msg}
                role="status"
                className={`status ${status.type}`}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                {status.msg}
              </motion.p>
            )}
          </AnimatePresence>
        </form>
      </Reveal>
    </section>
  );
}
