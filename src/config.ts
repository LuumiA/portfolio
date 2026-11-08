// Réglages du site : à modifier ici, rien d'autre à toucher.

export const SITE_URL = "https://luumia.github.io/portfolio/";

export const GITHUB_URL = "https://github.com/LuumiA";

// Renseigne l'URL de ton profil LinkedIn pour afficher le lien (laisser vide = masqué).
export const LINKEDIN_URL =
  "https://www.linkedin.com/in/nicolas-cavagnara-b32191221/";

// Place ton CV dans public/cv/ puis renseigne le chemin, ex : "cv/Nicolas-CV.pdf"
// (laisser vide = bouton de téléchargement masqué).
export const CV_PATH = "cv/Nicolas-Cavagnara-CV.pdf";

/** Préfixe un chemin de fichier public avec le `base` de Vite. */
export const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;
