// @ts-nocheck

// === Attendre que le DOM soit complètement chargé ===
document.addEventListener("DOMContentLoaded", () => {
  // === Gestion du thème sombre/clair ===
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

  // === Gestion du menu hamburger ===
  const menuToggle = document.getElementById("menu-toggle");
  const nav = document.querySelector(".nav.mobile");

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      nav.classList.toggle("open");
    });
  }

  // === Effet de machine à écrire ===
  const typewriterElement = document.getElementById("typewriter");
  const typewriterText = "Je suis Nicolas, développeur web créatif.";

  if (typewriterElement) {
    let i = 0;

    function typeWriter() {
      if (i < typewriterText.length) {
        typewriterElement.innerHTML += typewriterText.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
      }
    }

    typeWriter();
  } else {
    console.warn("L'élément 'typewriter' est introuvable dans le DOM.");
  }

  // === Animation des cartes portfolio au défilement ===
  const projects = document.querySelectorAll(".project");

  const revealProjectsOnScroll = () => {
    projects.forEach((project) => {
      const rect = project.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        project.classList.add("visible");
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
          line.style.animationDelay = `${index * 0.2}s`;
          line.classList.add("visible");
        }
      }
    });
  };

  // === Animation au scroll pour les icônes des technologies ===
  const skills = document.querySelectorAll(".skill");

  const revealSkillsOnScroll = () => {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    skills.forEach((skill) => observer.observe(skill));
  };

  // === Gestion des animations au scroll ===
  const handleScrollAnimations = () => {
    revealProjectsOnScroll();
    revealAboutLinesOnScroll();
  };

  window.addEventListener("scroll", handleScrollAnimations);
  handleScrollAnimations(); // Vérifie les animations dès le chargement

  // Initialiser l'observateur pour les icônes des technologies
  revealSkillsOnScroll();

  // === Gestion des boutons des cartes portfolio ===
  projects.forEach((project) => {
    const button = project.querySelector(".btn");
    if (button) {
      button.addEventListener("click", () => {
        const url = button.getAttribute("href");
        if (url) {
          window.open(url, "_blank");
        }
      });
    }
  });

  // === Gestion du formulaire de contact avec EmailJS ===
  const form = document.querySelector("#contact-form");
  const formStatus = document.getElementById("form-status");

  if (form && formStatus) {
    try {
      // Vérifie si "emailjs" est disponible
      if (typeof emailjs === "undefined") {
        console.error(
          "EmailJS n'est pas chargé. Assurez-vous que la bibliothèque est incluse dans votre HTML."
        );
        return;
      }

      emailjs.init("Yhjm9lzQNZr4XtfIN");

      form.addEventListener("submit", (e) => {
        e.preventDefault();

        if (!(form instanceof HTMLFormElement)) {
          console.error("L'élément trouvé n'est pas un formulaire valide.");
          formStatus.textContent =
            "Une erreur interne est survenue. Veuillez réessayer.";
          formStatus.style.color = "red";
          return;
        }

        const formData = new FormData(form);
        const userName = formData.get("nom");
        const userEmail = formData.get("email");
        const userMessage = formData.get("message");

        if (!userName || !userEmail || !userMessage) {
          formStatus.textContent =
            "Veuillez remplir tous les champs avant d'envoyer le message.";
          formStatus.style.color = "red";
          return;
        }

        const emailData = {
          nom: userName,
          email: userEmail,
          message: `Bonjour Nicolas,\n\nVous avez reçu un nouveau message de :\n\nNom : ${userName}\nEmail : ${userEmail}\nMessage : ${userMessage}\n\nCordialement,\n${userName}`,
        };

        emailjs
          .send("service_znffz6t", "template_vq1e6oh", emailData)
          .then(() => {
            formStatus.textContent = "Votre message a été envoyé avec succès !";
            formStatus.style.color = "green";
            form.reset();
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
    console.warn(
      "Le formulaire de contact ou l'élément de statut est introuvable dans le DOM."
    );
  }
});
