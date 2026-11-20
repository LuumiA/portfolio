import { asset } from "../config";

type L10n = { fr: string; en: string };

// Récit détaillé d'un projet, affiché dans la fenêtre « Détails »
export type Story = { context: string; role: string; approach: string[]; learned: string[] };

export type Project = {
  title: string;
  description: L10n;
  story?: { fr: Story; en: Story };
  image: string;
  /** Version 640 px de large pour les petits écrans */
  imageSmall: string;
  /** Largeur en pixels de `image` (pour srcset) */
  imageWidth: number;
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
    imageSmall: asset("img/latortue-admin-640.webp"),
    imageWidth: 1200,
    tags: ["JavaScript", "SVG", "Node.js"],
    live: "https://luumia.github.io/demo-latortue/",
    code: "https://github.com/LuumiA/demo-latortue",
  },
  {
    title: "Pilote — Prévisionnel (démo)",
    description: {
      fr: "Outil de prévisionnel de trésorerie multi-entreprises : charges et recettes récurrentes, graphiques, comparaison réel contre prévu. Démo interactive avec des données entièrement fictives.",
      en: "Multi-company cash-flow forecasting tool: recurring expenses and income, charts, actual vs forecast comparison. Interactive demo with entirely fictitious data.",
    },
    story: {
      fr: {
        context:
          "Quand on gère une ou plusieurs petites entreprises, la même question revient tout le temps : à quel moment la trésorerie risque-t-elle de passer dans le rouge ? Je voulais un outil simple pour y répondre : on saisit ses charges régulières (loyer, assurance, salaires…) et ses recettes récurrentes, et l'outil calcule, mois par mois, ce qu'il restera sur le compte.",
        role: "J'ai conçu et développé l'outil de bout en bout : le modèle de données, le moteur de calcul, les pages (tableau de bord, entreprises, réel contre prévu), la connexion avec les comptes utilisateurs, et l'hébergement dans Docker.",
        approach: [
          "Le cœur du projet est un moteur de calcul isolé du reste. Il décide à quels mois tombe chaque poste selon sa fréquence (hebdomadaire, mensuelle, trimestrielle, annuelle, ponctuelle…), applique les changements de montant datés, puis cumule le solde. Comme il est séparé de l'interface, je l'ai couvert de 20 tests automatiques, sans avoir besoin d'une base de données.",
          "Les dates sont un vrai piège. Les calculs se font en UTC et chaque mois est repéré par un index (année × 12 + mois), ce qui évite les décalages d'un jour ou de fuseau horaire.",
          "Les montants sont saisis hors taxes, et le TTC est calculé à l'affichage avec le taux de TVA de chaque poste.",
          "Une augmentation de loyer ne doit pas réécrire le passé : un « changement de montant » daté s'applique à partir d'un mois donné et laisse l'historique intact.",
          "J'ai ensuite ajouté le « réel contre prévu » : on note ce qui a vraiment été payé ou encaissé, et l'outil mesure l'écart avec le prévisionnel, en vert quand il est favorable.",
          "Chaque personne ne voit que ses entreprises et celles qu'on a partagées avec elle. J'ai centralisé tout le contrôle d'accès à un seul endroit pour ne rien oublier.",
          "Côté sécurité : mots de passe hachés (bcrypt), session en cookie signé, blocage après plusieurs échecs de connexion, validation de toutes les saisies côté serveur, en-têtes de sécurité (CSP, HSTS…) et correction des vulnérabilités des dépendances.",
          "Pour sortir les chiffres : export CSV (protégé contre les formules Excel), impression en PDF et sauvegarde JSON.",
        ],
        learned: [
          "Isoler la logique métier de l'interface la rend testable et réutilisable. C'est ce qui m'a permis de reprendre le calcul tel quel pour la démo, en remplaçant seulement la base de données par un stockage dans le navigateur.",
          "Les dates (fuseaux, mois de longueurs différentes, semaines) demandent des tests dès le départ.",
          "Dès qu'il y a des comptes, il faut penser sécurité tout de suite : droits d'accès, limitation des tentatives, validation côté serveur.",
        ],
      },
      en: {
        context:
          "When you run one or several small businesses, the same question keeps coming back: when will the cash balance go negative? I wanted a simple tool to answer it: you enter your regular expenses (rent, insurance, salaries…) and your recurring income, and the tool computes, month by month, what will be left in the account.",
        role: "I designed and built the tool end to end: the data model, the calculation engine, the pages (dashboard, companies, actual vs forecast), the login with user accounts, and the Docker hosting.",
        approach: [
          "The heart of the project is a calculation engine kept separate from the rest. It decides which months each item falls in depending on its frequency (weekly, monthly, quarterly, yearly, one-off…), applies dated amount changes, then accumulates the balance. Because it is separate from the interface, I covered it with 20 automated tests that need no database.",
          "Dates are a real trap. Calculations are done in UTC and each month is identified by an index (year × 12 + month), which avoids off-by-one-day and time zone shifts.",
          "Amounts are entered excluding VAT, and the VAT-inclusive figure is computed at display time with each item's VAT rate.",
          "A rent increase must not rewrite the past: a dated \"amount change\" applies from a given month and leaves the history untouched.",
          "I then added \"actual vs forecast\": you record what was really paid or received, and the tool measures the gap with the forecast, in green when it is favorable.",
          "Each person only sees their own companies and those shared with them. I centralized all access control in one place so nothing gets forgotten.",
          "On security: hashed passwords (bcrypt), signed cookie sessions, lockout after several failed logins, server-side validation of every input, security headers (CSP, HSTS…) and fixes for dependency vulnerabilities.",
          "To get the numbers out: CSV export (protected against Excel formulas), PDF printing and a JSON backup.",
        ],
        learned: [
          "Keeping business logic separate from the interface makes it testable and reusable. That is what let me reuse the calculation as is for the demo, only replacing the database with browser storage.",
          "Dates (time zones, months of different lengths, weeks) need tests from the start.",
          "As soon as there are accounts, security has to be considered right away: access rights, attempt limiting, server-side validation.",
        ],
      },
    },
    image: asset("img/pilote-demo.webp"),
    imageSmall: asset("img/pilote-demo-640.webp"),
    imageWidth: 1200,
    tags: ["Next.js", "TypeScript", "PostgreSQL"],
    live: "https://luumia.github.io/demo-pilote/",
    code: "https://github.com/LuumiA/demo-pilote",
  },
  {
    title: "Kasa",
    description: {
      fr: "Plateforme de réservation d'appartements développée avec React et TypeScript, optimisée avec Vite et déployée sur Vercel.",
      en: "Apartment booking platform built with React and TypeScript, optimized with Vite and deployed on Vercel.",
    },
    image: asset("img/Kasa.webp"),
    imageSmall: asset("img/Kasa-640.webp"),
    imageWidth: 1400,
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
    image: asset("img/gameDeals.webp"),
    imageSmall: asset("img/gameDeals-640.webp"),
    imageWidth: 1400,
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
    imageSmall: asset("img/nina-carduccie-640.webp"),
    imageWidth: 1400,
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
    imageSmall: asset("img/OhMyFood-640.webp"),
    imageWidth: 1400,
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
    imageSmall: asset("img/SocialLink-640.webp"),
    imageWidth: 1400,
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
