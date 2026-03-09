// main.js – Navigation + gestion ajout anime

// Fonction switchPage
function switchPage(mode) {
  document.querySelectorAll('.page').forEach(page => {
    page.style.display = 'none';
    page.classList.remove('active');
  });

  const pageElement = document.getElementById(`page-${mode}`);
  if (pageElement) {
    pageElement.style.display = 'block';
    pageElement.classList.add('active');
  }

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

// Au chargement : Accueil par défaut
switchPage('accueil');
