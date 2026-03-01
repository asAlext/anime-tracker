// anime-form.js – Gestion du formulaire ajout anime et grille

document.addEventListener('DOMContentLoaded', () => {
  const formAjout = document.getElementById('form-ajout-anime');
  const messageError = document.createElement('p');
  messageError.id = 'form-error';
  messageError.style.color = 'red';
  messageError.style.marginTop = '10px';
  messageError.style.textAlign = 'center';
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

      // Si pas d'URL Cover, fetch depuis AniList
      if (!urlCover) {
        try {
          const query = `
            query ($search: String) {
              Media(search: $search, type: ANIME) {
                coverImage {
                  large
                }
              }
            }
          `;
          const variables = { search: nom };
          const response = await fetch('https://graphql.anilist.co', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query, variables })
          });
          const data = await response.json();
          if (data.data && data.data.Media && data.data.Media.coverImage.large) {
            urlCover = data.data.Media.coverImage.large;
          } else {
            urlCover = `https://via.placeholder.com/220x350?text=${encodeURIComponent(nom)}`;
          }
        } catch (error) {
          urlCover = `https://via.placeholder.com/220x350?text=${encodeURIComponent(nom)}`;
        }
      }

      // Création de la carte
      const card = document.createElement('div');
      card.className = 'anime-card';
      card.innerHTML = `
        <div class="img-wrapper">
          <img src="${urlCover}" alt="${nom}">
          <div class="statut">${statut.toUpperCase()}</div>
          <div class="note">★ ${note}</div>
          <div class="type">${type.toUpperCase()}</div>
        </div>
        <div class="anime-name">${nom}</div>
      `;

      card.onclick = () => alert('Page détail à venir pour : ' + nom);

      document.getElementById('anime-grid').appendChild(card);

      // Mise à jour compteur
      const countId = 'count-' + statut.toLowerCase().replace(/\s+/g, '-');
      const countElement = document.getElementById(countId);
      if (countElement) {
        countElement.textContent = parseInt(countElement.textContent || 0) + 1;
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

  // Chargement des animes sauvegardés
  const savedAnimes = JSON.parse(localStorage.getItem('animes') || '[]');
  savedAnimes.forEach(anime => {
    const card = document.createElement('div');
    card.className = 'anime-card';
    card.innerHTML = `
      <div class="img-wrapper">
        <img src="${anime.urlCover}" alt="${anime.nom}">
        <div class="statut">${anime.statut.toUpperCase()}</div>
        <div class="note">★ ${anime.note}</div>
        <div class="type">${anime.type.toUpperCase()}</div>
      </div>
      <div class="anime-name">${anime.nom}</div>
    `;
    card.onclick = () => alert('Page détail à venir pour : ' + anime.nom);
    document.getElementById('anime-grid').appendChild(card);
  });
});
