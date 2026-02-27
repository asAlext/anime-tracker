// main.js – Gestion globale de l’interface et de la navigation

console.log("main.js chargé");

// Fonction pour changer de page (Accueil / Anime / Waifu)
function switchPage(mode) {
  // Désactive toutes les pages
  document.querySelectorAll('.page').forEach(page => {
    page.style.display = 'none';
    page.classList.remove('active');
  });

  // Active la page choisie
  const pageElement = document.getElementById(`page-${mode}`);
  if (pageElement) {
    pageElement.style.display = 'block';
    pageElement.classList.add('active');
  }

  // Met à jour les boutons nav
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.mode === mode) {
      btn.classList.add('active');
    }
  });
}

// Écoute les clics sur les boutons de navigation
document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const mode = btn.dataset.mode;
    switchPage(mode);
  });
});

// Au chargement : on reste sur Accueil
switchPage('accueil');

// Bonus : on peut appeler connexion() et inscription() depuis auth.js
// (elles sont déjà définies, donc ça marche)
