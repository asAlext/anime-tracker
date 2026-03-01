// main.js – Navigation + gestion ajout anime

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

// Gestion du formulaire ajout anime
document.addEventListener('DOMContentLoaded', () => {
  const formAjout = document.getElementById('form-ajout-anime');
  if (formAjout) {
    formAjout.addEventListener('submit', async (e) => {
      e.preventDefault();

      const nom = document.getElementById('nom-anime').value.trim();
      const type = document.getElementById('type-anime').value;
      const statut = document.getElementById('statut-anime').value;
      const note = document.getElementById('note-anime').value.trim() || 'NA';
      let urlCover = document.getElementById('poster-anime').value.trim();

      if (!nom || !type || !statut) {
        alert('Nom, Type et Statut sont obligatoires');
        return;
      }

      // Si pas d'URL Cover, placeholder avec nom
      if (!urlCover) {
        urlCover = `https://via.placeholder.com/220x310?text=${encodeURIComponent(nom)}`;
      }

      // Création de la carte
      const card = document.createElement('div');
      card.className = 'anime-card';
      card.innerHTML = `
        <div class="img-wrapper">
          <img src="${urlCover}" alt="${nom}">
          <div class="note">★ ${note}</div>
          <div class="type">${type.toUpperCase()}</div>
        </div>
        <div class="anime-name">${nom}</div>
      `;

      card.onclick = () => alert('Page détail à venir pour : ' + nom);

      document.getElementById('anime-grid').appendChild(card);

      // Mise à jour compteur
      const countId = 'count-' + statut.replace(/ /g, '-').toLowerCase();
      const countElement = document.getElementById(countId);
      if (countElement) {
        countElement.textContent = parseInt(countElement.textContent) + 1;
      }

      // Reset formulaire
      formAjout.reset();
    });
  }
});
