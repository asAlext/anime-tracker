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

// Gestion du formulaire ajout anime
document.addEventListener('DOMContentLoaded', () => {
  const formAjout = document.getElementById('form-ajout-anime');
  const messageError = document.createElement('p');
  messageError.id = 'form-error';
  messageError.style.color = 'red';
  messageError.style.marginTop = '10px';
  formAjout.appendChild(messageError);

  if (formAjout) {
    formAjout.addEventListener('submit', async (e) => {
      e.preventDefault();

      const nom = document.getElementById('nom-anime').value.trim();
      const type = document.getElementById('type-anime').value;
      const statut = document.getElementById('statut-anime').value;
      const note = document.getElementById('note-anime').value.trim() || 'NA';
      let urlCover = document.getElementById('poster-anime').value.trim();

      messageError.textContent = '';

      if (!nom || !type || !statut) {
        messageError.textContent = 'Nom, Type et Statut sont obligatoires';
        return;
      }

      // Si pas d'URL Cover, placeholder
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

      // Sauvegarde dans localStorage
      const anime = { nom, type, statut, note, urlCover };
      let animes = JSON.parse(localStorage.getItem('animes') || '[]');
      animes.push(anime);
      localStorage.setItem('animes', JSON.stringify(animes));

      // Reset formulaire
      formAjout.reset();
    });
  }

  // Chargement des animes sauvegardés au démarrage
  const savedAnimes = JSON.parse(localStorage.getItem('animes') || '[]');
  savedAnimes.forEach(anime => {
    const card = document.createElement('div');
    card.className = 'anime-card';
    card.innerHTML = `
      <div class="img-wrapper">
        <img src="${anime.urlCover}" alt="${anime.nom}">
        <div class="note">★ ${anime.note}</div>
        <div class="type">${anime.type.toUpperCase()}</div>
      </div>
      <div class="anime-name">${anime.nom}</div>
    `;
    card.onclick = () => alert('Page détail à venir pour : ' + anime.nom);
    document.getElementById('anime-grid').appendChild(card);
  });
});
