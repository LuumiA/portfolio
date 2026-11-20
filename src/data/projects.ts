import { asset } from "../config";

type L10n = { fr: string; en: string };

// Récit détaillé d'un projet, affiché dans la fenêtre « Détails »
export type Story = { context: string; role: string; approach: string[]; learned: string[] };

export type Project = {
  title: string;
  description: L10n;
  story?: { fr: Story; en: Story };
  image: string;
  tags: string[];
  live: string;
  code: string;
};

export const projects: Project[] = [
  {
    title: "La Tortue — Admin (démo)",
    description: {
      fr: "Interface d'administration d'une location de camping-car : tableau de bord, locations et calendrier à la demi-journée. Démo interactive avec des données entièrement fictives.",
      en: "Admin interface for a camper van rental: dashboard, rentals and half-day calendar. Interactive demo with entirely fictitious data.",
    },
    story: {
      fr: {
        context:
          "Le site vitrine de La Tortue IV, un camping-car en location dans les Hautes-Alpes, existait déjà (React + Vite). Mon client suivait ses réservations dans un tableur Excel : plateforme, dates, acompte, restant dû, mode de règlement… Il lui fallait un outil plus simple et plus fiable, utilisable aussi depuis son téléphone.",
        role: "J'ai conçu et développé tout l'espace d'administration : la base de données, l'API, la connexion sécurisée et l'interface (tableau de bord, liste des locations, calendrier). Le site vitrine, le déploiement et la protection reCAPTCHA de la page de connexion ont été réalisés par le développeur du site.",
        approach: [
          "Je suis parti de son tableur : j'ai repris ses colonnes et même les couleurs de ses plateformes, pour qu'il retrouve ses repères dès la première ouverture.",
          "J'ai commencé simple (locations, calendrier, tableau de bord), puis j'ai ajouté ce qui comptait vraiment pour lui : la gestion des départs et retours à la demi-journée, matin ou après-midi.",
          "Le point le plus délicat, ce sont les disponibilités. Chaque jour compte deux créneaux ; une location va d'un créneau de départ à un créneau de retour, et deux périodes ne peuvent pas se chevaucher. Un retour le matin et un départ l'après-midi le même jour restent donc compatibles. En cas de conflit, l'outil explique ce qui est déjà pris et ce qui reste libre juste avant et juste après.",
          "J'ai choisi des outils simples et durables : Node/Express avec SQLite (un seul fichier à sauvegarder), une interface en JavaScript sans framework, et des graphiques en SVG faits maison, avec leur version tableau pour l'accessibilité.",
          "Les montants sont stockés en centimes pour éviter les erreurs d'arrondi, et le restant dû est toujours calculé, jamais saisi à la main.",
          "L'outil manipule des données de clients, j'ai donc soigné la sécurité : mot de passe haché (scrypt), session par cookie dont seule l'empreinte est conservée, jeton CSRF, limitation des tentatives de connexion, validation de toutes les saisies côté serveur et affichage du texte sans jamais injecter de HTML.",
          "Je l'ai pensé d'abord pour le téléphone : barre d'onglets en bas, lignes du tableau transformées en cartes, formulaires adaptés aux champs date d'iOS.",
        ],
        learned: [
          "Un détail du métier, comme la demi-journée, change tout le modèle de données et les règles de validation : il faut bien comprendre le métier avant de coder.",
          "Un message d'erreur doit aider à corriger, pas seulement dire « erreur ».",
          "Il faut tester sur de vrais appareils : des champs date qui débordaient sur iPhone, ou une connexion refusée en local à cause de la vérification Origin/Host. Ces bugs m'ont fait mieux comprendre la protection contre les attaques CSRF.",
          "Pour cette démo, avoir séparé l'interface et l'API m'a permis de la rendre testable par tous, sans serveur ni vraie donnée : le faux back-end reprend les mêmes règles que le vrai.",
        ],
      },
      en: {
        context:
          "The showcase website for La Tortue IV, a camper van for rent in the Hautes-Alpes, already existed (React + Vite). My client tracked his bookings in an Excel spreadsheet: platform, dates, deposit, balance due, payment method… He needed a simpler and more reliable tool that also works on his phone.",
        role: "I designed and built the whole admin area: the database, the API, the secure login and the interface (dashboard, rentals list, calendar). The showcase site, the deployment and the reCAPTCHA protection of the login page were done by the site's developer.",
        approach: [
          "I started from his spreadsheet: I kept his columns and even the colors of his platforms, so he feels at home the first time he opens it.",
          "I started simple (rentals, calendar, dashboard), then added what really mattered to him: handling pick-ups and returns by half-day, morning or afternoon.",
          "The trickiest part is availability. Each day has two slots; a rental runs from a pick-up slot to a return slot, and two periods cannot overlap. A morning return and an afternoon pick-up on the same day are therefore compatible. On a conflict, the tool explains what is already taken and what is still free just before and just after.",
          "I picked simple, durable tools: Node/Express with SQLite (a single file to back up), a framework-free JavaScript interface, and home-made SVG charts with a table version for accessibility.",
          "Amounts are stored in cents to avoid rounding errors, and the balance due is always computed, never typed in.",
          "The tool handles customer data, so I took security seriously: hashed passwords (scrypt), cookie sessions where only a fingerprint is kept, a CSRF token, login attempt throttling, server-side validation of every input, and text rendering that never injects HTML.",
          "I designed it phone-first: a bottom tab bar, table rows turned into cards, and forms adapted to iOS date fields.",
        ],
        learned: [
          "A detail of the business, like the half-day, changes the whole data model and the validation rules: you need to understand the business before coding.",
          "An error message should help fix the problem, not just say \"error\".",
          "You have to test on real devices: date fields overflowing on iPhone, or a login refused locally because of the Origin/Host check. Those bugs made me understand CSRF protection better.",
          "For this demo, having separated the interface from the API let me make it testable by anyone, with no server and no real data: the fake back-end follows the same rules as the real one.",
        ],
      },
    },
    image: asset("img/latortue-admin.webp"),
    tags: ["JavaScript", "SVG", "Node.js"],
    live: "https://luumia.github.io/demo-latortue/",
    code: "https://github.com/LuumiA/demo-latortue",
  },
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
