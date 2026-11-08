import { asset } from "../config";

type L10n = { fr: string; en: string };

export type Project = {
  title: string;
  description: L10n;
  image: string;
  tags: string[];
  live: string;
  code: string;
};

export const projects: Project[] = [
  {
    title: "Kasa",
    description: {
      fr: "Plateforme de réservation d'appartements développée avec React et TypeScript, optimisée avec Vite et déployée sur Vercel.",
      en: "Apartment booking platform built with React and TypeScript, optimized with Vite and deployed on Vercel.",
    },
    image: asset("img/Kasa.webp"),
    tags: ["React", "TypeScript", "Vite"],
    live: "https://kasa-lyart-eight.vercel.app/",
    code: "https://github.com/LuumiA/Kasa",
  },
  {
    title: "Game Deals",
    description: {
      fr: "Comparateur de prix pour les jeux vidéo, avec une expérience utilisateur fluide et intuitive.",
      en: "Video game price comparison site with a smooth and intuitive user experience.",
    },
    image: asset("img/gameDeals.png"),
    tags: ["JavaScript", "API", "CSS3"],
    live: "https://game-deals-delta.vercel.app/",
    code: "https://github.com/LuumiA/gameDeals",
  },
  {
    title: "Nina Carducci",
    description: {
      fr: "Site vitrine pour une photographe, avec une navigation intuitive et un design épuré.",
      en: "Showcase website for a photographer, with intuitive navigation and a clean design.",
    },
    image: asset("img/nina-carduccie.webp"),
    tags: ["HTML5", "CSS3", "JavaScript"],
    live: "https://nina-carducci-azure.vercel.app/",
    code: "https://github.com/LuumiA/Nina-Carducci",
  },
  {
    title: "OhMyFood",
    description: {
      fr: "Projet culinaire interactif pensé pour offrir une expérience utilisateur fluide et attractive.",
      en: "Interactive food project designed to deliver a smooth and attractive user experience.",
    },
    image: asset("img/OhMyFood.webp"),
    tags: ["HTML5", "Sass", "JavaScript"],
    live: "https://luumia.github.io/OhMyFood/",
    code: "https://github.com/LuumiA/OhMyFood",
  },
  {
    title: "Social Links Profile",
    description: {
      fr: "Profil social conçu pour créer des interfaces dynamiques et intuitives.",
      en: "Social profile page built to create dynamic and intuitive interfaces.",
    },
    image: asset("img/SocialLink.webp"),
    tags: ["HTML5", "CSS3", "JavaScript"],
    live: "https://luumia.github.io/social-links-profile-main/",
    code: "https://github.com/LuumiA/social-links-profile-main",
  },
];

// `dark` : icône noire à inverser en thème sombre
export const skills = [
  { name: "HTML5", icon: "html5" },
  { name: "CSS3", icon: "css3" },
  { name: "JavaScript", icon: "javascript" },
  { name: "TypeScript", icon: "typescript" },
  { name: "React", icon: "react" },
  { name: "Sass", icon: "sass" },
  { name: "Node.js", icon: "nodejs" },
  { name: "Git", icon: "git" },
  { name: "GitHub", icon: "github", mono: true },
  { name: "Vercel", icon: "vercel", mono: true },
];
