// === Attendre que le DOM soit complètement chargé ===
document.addEventListener("DOMContentLoaded", () => {
  // === Gestion du thème sombre/clair ===
  const themeToggle = document.getElementById("theme-toggle");
  const currentTheme = localStorage.getItem("theme") || "dark";

  if (themeToggle) {
    // Applique le thème actuel à la page
    document.body.setAttribute("data-theme", currentTheme);
    themeToggle.textContent = currentTheme === "dark" ? "🌙" : "☀️";

    // Ajoute un écouteur pour basculer entre les thèmes
    themeToggle.addEventListener("click", () => {
      const newTheme =
        document.body.getAttribute("data-theme") === "dark" ? "light" : "dark";
      document.body.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
      themeToggle.textContent = newTheme === "dark" ? "🌙" : "☀️";
    });
  }

  // === Gestion du menu hamburger ===
  const menuToggle = document.getElementById("menu-toggle");
  const nav = document.querySelector(".nav.mobile");

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      nav.classList.toggle("open"); // Affiche ou masque le menu mobile
    });
  }

  // === Effet de machine à écrire ===
  const typewriterElement = document.getElementById("typewriter");
  const typewriterText = "Je suis Nicolas, monteur freelance créatif.";

  if (typewriterElement) {
    let i = 0;

    function typeWriter() {
      if (i < typewriterText.length) {
        typewriterElement.innerHTML += typewriterText.charAt(i);
        i++;
        setTimeout(typeWriter, 50); // 50ms pour un effet rapide
      }
    }

    typeWriter(); // Démarre l'effet immédiatement
  } else {
    console.error("L'élément 'typewriter' est introuvable dans le DOM.");
  }

  // === Animation des vidéos au défilement ===
  const videos = document.querySelectorAll(".video");

  const revealVideosOnScroll = () => {
    videos.forEach((video) => {
      const rect = video.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        video.classList.add("visible"); // Ajoute la classe "visible" aux vidéos
      }
    });
  };

  // === Animation des lignes de texte "À propos de moi" ===
  const aboutLines = document.querySelectorAll(".line");

  const revealAboutLinesOnScroll = () => {
    aboutLines.forEach((line, index) => {
      const rect = line.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        if (line instanceof HTMLElement) {
          line.style.animationDelay = `${index * 0.2}s`; // Décale l'animation
          line.classList.add("visible"); // Ajoute la classe "visible"
        }
      }
    });
  };

  // === Gestion des animations au scroll ===
  const handleScrollAnimations = () => {
    revealVideosOnScroll();
    revealAboutLinesOnScroll();
  };

  window.addEventListener("scroll", handleScrollAnimations);
  handleScrollAnimations(); // Vérifie les animations dès le chargement

  // === Gestion du formulaire de contact avec EmailJS ===
  const form = document.querySelector("#contact-form");
  const formStatus = document.getElementById("form-status");

  if (form && formStatus) {
    try {
      // Initialise EmailJS avec la clé publique
      emailjs.init("Yhjm9lzQNZr4XtfIN");

      // Ajoute un écouteur pour gérer la soumission du formulaire
      form.addEventListener("submit", (e) => {
        e.preventDefault(); // Empêche le rechargement de la page

        // Vérifie si "form" est bien un formulaire HTML valide
        if (!(form instanceof HTMLFormElement)) {
          console.error("L'élément trouvé n'est pas un formulaire valide.");
          formStatus.textContent =
            "Une erreur interne est survenue. Veuillez réessayer.";
          formStatus.style.color = "red";
          return;
        }

        // Récupère les données du formulaire
        const formData = new FormData(form);
        const userName = formData.get("nom");
        const userEmail = formData.get("email");
        const userMessage = formData.get("message");

        // Vérifie que les champs sont remplis
        if (!userName || !userEmail || !userMessage) {
          formStatus.textContent =
            "Veuillez remplir tous les champs avant d'envoyer le message.";
          formStatus.style.color = "red";
          return;
        }

        // Structure personnalisée du message
        const emailData = {
          nom: userName,
          email: userEmail,
          message: `Bonjour Nicolas,\n\nVous avez reçu un nouveau message de :\n\nNom : ${userName}\nEmail : ${userEmail}\nMessage : ${userMessage}\n\nCordialement,\n${userName}`,
        };

        // Envoie les données via EmailJS
        emailjs
          .send("service_znffz6t", "template_vq1e6oh", emailData)
          .then(() => {
            formStatus.textContent = "Votre message a été envoyé avec succès !";
            formStatus.style.color = "green";
            form.reset(); // Réinitialise le formulaire
          })
          .catch((error) => {
            formStatus.textContent =
              "Une erreur est survenue. Veuillez réessayer.";
            formStatus.style.color = "red";
            console.error("Erreur EmailJS :", error);
          });
      });
    } catch (error) {
      console.error("Erreur lors de l'initialisation du formulaire :", error);
      formStatus.textContent =
        "Une erreur interne est survenue. Veuillez réessayer.";
      formStatus.style.color = "red";
    }
  } else {
    console.error(
      "Le formulaire de contact ou le formStatus est introuvable dans la page."
    );
  }
});
