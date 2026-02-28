// main.js – Gestion de la navigation entre pages

// Fonction pour changer de page
function switchPage(mode) {
  // Cache toutes les pages
  document.querySelectorAll('.page').forEach(page => {
    page.style.display = 'none';
    page.classList.remove('active');
  });

  // Affiche la page choisie
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

// Écoute les clics sur les boutons nav
document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const mode = btn.dataset.mode;
    switchPage(mode);
  });
});

// Au chargement : on reste sur Accueil par défaut
switchPage('accueil');
