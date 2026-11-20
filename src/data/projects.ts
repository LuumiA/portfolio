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
    story: {
      fr: {
        context:
          "Kasa est un projet de formation OpenClassrooms : une plateforme de location d'appartements entre particuliers. Il fallait en réaliser le front-end : une page d'accueil avec la galerie des logements, une page « À propos » et une page de détail pour chaque logement.",
        role: "J'ai développé toute l'application, de la structure du projet jusqu'au déploiement sur Vercel.",
        approach: [
          "J'ai choisi React avec TypeScript et Vite, SCSS pour les styles et React Router pour la navigation.",
          "J'ai découpé l'interface en composants réutilisables : en-tête, pied de page, mise en page commune, carte de logement, bloc dépliant (Collapse) et diaporama. Je les ai créés un par un, en commitant à chaque étape.",
          "La page d'un logement lit son identifiant dans l'adresse (/logement/:id), retrouve les données dans un fichier JSON et affiche le titre, la localisation, les étiquettes, l'hôte, la note en étoiles, la description et les équipements.",
          "Le diaporama boucle (après la dernière photo on revient à la première) et n'affiche ses flèches et sa pagination que s'il y a plusieurs photos.",
          "Une route générique affiche une page 404 pour toute adresse inconnue.",
        ],
        learned: [
          "Penser en composants : un composant, une responsabilité, avec des props typées en TypeScript qui évitent des erreurs.",
          "Le routage (paramètres d'adresse, page 404) et l'état local avec useState.",
          "Penser aux cas limites : un identifiant inconnu, un logement avec une seule photo.",
        ],
      },
      en: {
        context:
          "Kasa is an OpenClassrooms training project: a platform for renting apartments between individuals. The task was to build its front end: a home page with the gallery of listings, an \"About\" page and a detail page for each listing.",
        role: "I built the whole application, from the project structure to the deployment on Vercel.",
        approach: [
          "I chose React with TypeScript and Vite, SCSS for styling and React Router for navigation.",
          "I split the interface into reusable components: header, footer, shared layout, listing card, collapsible block (Collapse) and slideshow. I built them one by one, committing at each step.",
          "A listing page reads its identifier from the address (/logement/:id), finds the data in a JSON file and shows the title, location, tags, host, star rating, description and amenities.",
          "The slideshow loops (after the last photo it goes back to the first) and only shows its arrows and pagination when there is more than one photo.",
          "A catch-all route displays a 404 page for any unknown address.",
        ],
        learned: [
          "Thinking in components: one component, one responsibility, with typed props in TypeScript that prevent mistakes.",
          "Routing (address parameters, 404 page) and local state with useState.",
          "Thinking about edge cases: an unknown identifier, a listing with a single photo.",
        ],
      },
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
    story: {
      fr: {
        context:
          "GameDeals est un projet personnel : un site qui affiche en direct les promotions de jeux vidéo, pour trouver rapidement les meilleurs prix.",
        role: "J'ai tout réalisé seul, en JavaScript pur et sans framework, pour bien maîtriser les bases.",
        approach: [
          "Les données viennent de l'API publique CheapShark : le site récupère les promotions en direct et affiche, pour chaque jeu, son prix, sa réduction, sa note et le magasin.",
          "Les résultats sont paginés (12 jeux par page) pour rester lisibles.",
          "La recherche réagit pendant la frappe, avec un filtre par plateforme et un tri par prix, note ou réduction.",
          "Un mode comparaison permet de choisir jusqu'à 3 jeux et de les voir côte à côte, avec un lien d'achat vers le magasin.",
          "Côté design : un thème sombre « gaming », des particules animées en arrière-plan, des compteurs animés et un « command center » décoratif.",
        ],
        learned: [
          "Consommer une API : requête fetch, lecture de la réponse, affichage des données et gestion de l'état (page courante, jeux sélectionnés).",
          "Sans framework, il faut structurer son code soi-même : séparer l'affichage, les données et les événements.",
          "Les prix peuvent changer : j'ai ajouté sur chaque carte une mention invitant à vérifier sur le magasin.",
        ],
      },
      en: {
        context:
          "GameDeals is a personal project: a website that shows live video game deals, to quickly find the best prices.",
        role: "I built everything on my own, in plain JavaScript with no framework, to master the basics.",
        approach: [
          "The data comes from the public CheapShark API: the site fetches live deals and shows, for each game, its price, discount, rating and store.",
          "Results are paginated (12 games per page) to stay readable.",
          "Search reacts as you type, with a platform filter and sorting by price, rating or discount.",
          "A comparison mode lets you pick up to 3 games and view them side by side, with a purchase link to the store.",
          "On the design side: a dark \"gaming\" theme, animated background particles, animated counters and a decorative \"command center\".",
        ],
        learned: [
          "Consuming an API: a fetch request, reading the response, displaying the data and managing state (current page, selected games).",
          "Without a framework, you have to structure your own code: separating display, data and events.",
          "Prices can change: I added a note on each card inviting people to check on the store.",
        ],
      },
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
    story: {
      fr: {
        context:
          "Nina Carducci est un projet de formation OpenClassrooms : le site d'une photographe. Le site existait déjà ; ma mission était de l'optimiser en performance, en accessibilité et en référencement (SEO).",
        role: "J'ai repris le site existant et appliqué les corrections, étape par étape.",
        approach: [
          "Structure : ajout des balises sémantiques (header, nav, main, footer) et correction des textes alternatifs des images.",
          "Images : compression, renommage clair et passage au format WebP, avec chargement différé (lazy loading).",
          "Code : CSS minifié, scripts chargés avec defer et réordonnés pour ne pas bloquer l'affichage.",
          "Accessibilité : une classe dédiée pour corriger les alertes de contraste des couleurs.",
          "Référencement : balises meta, Open Graph (Facebook) et Twitter Cards pour de beaux aperçus lors d'un partage, et balises de référencement local.",
        ],
        learned: [
          "Optimiser un site existant demande de la méthode : corriger un point à la fois et vérifier le résultat.",
          "Le poids des images est souvent le premier levier de performance. Je l'ai de nouveau constaté en optimisant ce portfolio.",
          "Un bon référencement commence par un HTML propre.",
        ],
      },
      en: {
        context:
          "Nina Carducci is an OpenClassrooms training project: a photographer's website. The site already existed; my mission was to optimize it for performance, accessibility and search engine optimization (SEO).",
        role: "I took the existing site and applied the fixes, step by step.",
        approach: [
          "Structure: added semantic tags (header, nav, main, footer) and fixed the images' alternative texts.",
          "Images: compression, clear renaming and conversion to WebP, with lazy loading.",
          "Code: minified CSS, scripts loaded with defer and reordered so they do not block rendering.",
          "Accessibility: a dedicated class to fix color contrast alerts.",
          "SEO: meta tags, Open Graph (Facebook) and Twitter Cards for nice previews when shared, and local SEO tags.",
        ],
        learned: [
          "Optimizing an existing site takes method: fix one thing at a time and check the result.",
          "Image weight is often the first performance lever. I saw it again while optimizing this portfolio.",
          "Good SEO starts with clean HTML.",
        ],
      },
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
    story: {
      fr: {
        context:
          "OhMyFood est un projet de formation OpenClassrooms : le site d'une plateforme qui présente des restaurants gastronomiques et leurs menus, avec une page d'accueil et une page par restaurant.",
        role: "J'ai intégré le site à partir de la maquette, en HTML et Sass.",
        approach: [
          "J'ai réalisé la page d'accueil et quatre pages de restaurants (À la française, La note enchantée, La palette du goût, Le délice des sens).",
          "J'ai écrit mes styles en Sass, répartis en plusieurs fichiers : variables, styles de la page d'accueil et styles des pages de restaurant, assemblés dans un seul fichier compilé.",
          "Les couleurs principales sont des variables réutilisées partout : on change une teinte à un seul endroit.",
          "Typographies Roboto et Shrikhand, icônes Font Awesome.",
        ],
        learned: [
          "Organiser son CSS en fichiers avec Sass rend les styles plus faciles à retrouver et à faire évoluer.",
          "Intégrer fidèlement une maquette : espacements, typographies et couleurs.",
        ],
      },
      en: {
        context:
          "OhMyFood is an OpenClassrooms training project: the website of a platform presenting gourmet restaurants and their menus, with a home page and one page per restaurant.",
        role: "I built the site from the mockup, in HTML and Sass.",
        approach: [
          "I built the home page and four restaurant pages (À la française, La note enchantée, La palette du goût, Le délice des sens).",
          "I wrote my styles in Sass, split across several files: variables, home page styles and restaurant page styles, assembled into a single compiled file.",
          "The main colors are variables used everywhere: a shade can be changed in a single place.",
          "Roboto and Shrikhand fonts, Font Awesome icons.",
        ],
        learned: [
          "Organizing CSS into files with Sass makes styles easier to find and to evolve.",
          "Faithfully building a mockup: spacing, typography and colors.",
        ],
      },
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
    story: {
      fr: {
        context:
          "Un petit défi du site Frontend Mentor : reproduire fidèlement une carte de profil avec des liens vers des réseaux sociaux, à partir d'une maquette fournie.",
        role: "J'ai codé la page en HTML et CSS.",
        approach: [
          "Une structure sémantique : un titre h1 pour le nom, un h2 pour la localisation et un paragraphe de présentation.",
          "Chaque bouton de lien a un libellé accessible (aria-label) qui dit où il mène.",
          "La police Inter et les couleurs viennent de la maquette, et la balise viewport garantit un bon affichage sur téléphone.",
        ],
        learned: [
          "Comparer son résultat à la maquette de près affine l'œil pour les détails.",
          "Même une page simple peut être accessible dès le départ.",
        ],
      },
      en: {
        context:
          "A small Frontend Mentor challenge: faithfully reproduce a profile card with links to social networks, from a provided mockup.",
        role: "I coded the page in HTML and CSS.",
        approach: [
          "A semantic structure: an h1 title for the name, an h2 for the location and a paragraph for the bio.",
          "Each link button has an accessible label (aria-label) saying where it leads.",
          "The Inter font and the colors come from the mockup, and the viewport tag ensures a correct display on phones.",
        ],
        learned: [
          "Closely comparing your result with the mockup sharpens your eye for details.",
          "Even a simple page can be accessible from the start.",
        ],
      },
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
