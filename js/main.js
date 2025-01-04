// Gestion du thème sombre/clair
const themeToggle = document.getElementById("theme-toggle");
const currentTheme = localStorage.getItem("theme") || "dark";

if (themeToggle) {
  document.body.setAttribute("data-theme", currentTheme);
  themeToggle.textContent = currentTheme === "dark" ? "🌙" : "☀️";

  themeToggle.addEventListener("click", () => {
    const newTheme =
      document.body.getAttribute("data-theme") === "dark" ? "light" : "dark";
    document.body.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    themeToggle.textContent = newTheme === "dark" ? "🌙" : "☀️";
  });
}

// Gestion du menu hamburger
const menuToggle = document.getElementById("menu-toggle");
const nav = document.querySelector(".nav.mobile");

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    nav.classList.toggle("open");
  });
}

// Effet de machine à écrire
const typewriterText = "Je suis Nicolas, monteur freelance créatif.";
const typewriterElement = document.getElementById("typewriter");

if (typewriterElement) {
  let i = 0;

  function typeWriter() {
    if (i < typewriterText.length) {
      typewriterElement.innerHTML += typewriterText.charAt(i);
      i++;
      setTimeout(typeWriter, 50); // 50ms pour un effet rapide
    }
  }

  window.onload = typeWriter;
}

// Animation des vidéos au défilement
const videos = document.querySelectorAll(".video");

const revealVideosOnScroll = () => {
  videos.forEach((video) => {
    const rect = video.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      video.classList.add("visible");
    }
  });
};

// Animation des lignes de texte "À propos de moi"
const aboutLines = document.querySelectorAll(".line");

const revealAboutLinesOnScroll = () => {
  aboutLines.forEach((line, index) => {
    const rect = line.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      // Vérifie que "line" est un élément HTML valide
      if (line instanceof HTMLElement) {
        line.style.animationDelay = `${index * 0.2}s`; // Ajoute un délai progressif
        line.classList.add("visible");
      }
    }
  });
};

// Fonction principale pour gérer toutes les animations au scroll
const handleScrollAnimations = () => {
  revealVideosOnScroll();
  revealAboutLinesOnScroll();
};

// Ajout d'un écouteur d'événement pour détecter le scroll
window.addEventListener("scroll", handleScrollAnimations);

// Vérification initiale au chargement de la page
handleScrollAnimations();
