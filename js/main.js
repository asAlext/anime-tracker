// main.js – Navigation entre les pages

function switchPage(mode) {
  // Masque toutes les pages
  document.querySelectorAll('.page').forEach(page => {
    page.style.display = 'none';
    page.classList.remove('active');
  });

  // Affiche la page demandée
  const pageElement = document.getElementById(`page-${mode}`);
  if (pageElement) {
    pageElement.style.display = 'block';
    pageElement.classList.add('active');
  }

  // Met à jour les boutons nav (pas de classe active sur Détail)
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.mode === mode && mode !== 'detail') {  // Pas d'active pour détail
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
