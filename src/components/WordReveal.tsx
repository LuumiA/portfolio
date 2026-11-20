import { motion } from "motion/react";

// Révèle un texte mot par mot
export default function WordReveal({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const words = text.split(" ");
  return (
    <motion.p
      className={className}
      initial="hidden"
      animate="show"
      transition={{ staggerChildren: 0.035, delayChildren: delay }}
    >
      {/* Texte complet pour les lecteurs d'écran ; les mots animés sont masqués pour eux */}
      <span className="sr-only">{text}</span>
      {words.map((w, i) => (
        <motion.span
          key={i}
          aria-hidden
          style={{ display: "inline-block", whiteSpace: "pre" }}
          variants={{
            hidden: { opacity: 0, y: 12, filter: "blur(6px)" },
            show: { opacity: 1, y: 0, filter: "blur(0px)" },
          }}
        >
          {w + (i < words.length - 1 ? " " : "")}
        </motion.span>
      ))}
    </motion.p>
  );
}
