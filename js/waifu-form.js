// waifu-form.js – Gestion du formulaire ajout waifu et grille

document.addEventListener('DOMContentLoaded', () => {
  const formAjout = document.getElementById('form-ajout-waifu');
  const messageError = document.createElement('p');
  messageError.id = 'form-error-waifu';
  messageError.style.color = 'red';
  messageError.style.marginTop = '10px';
  messageError.style.textAlign = 'center';
  formAjout.appendChild(messageError);

  if (formAjout) {
    formAjout.addEventListener('submit', async (e) => {
      e.preventDefault();

      const nom = document.getElementById('nom-waifu').value.trim();
      const type = document.getElementById('type-waifu').value;
      const statut = document.getElementById('statut-waifu').value;
      const note = document.getElementById('note-waifu').value.trim() || 'NA';
      let urlCover = document.getElementById('poster-waifu').value.trim();

      messageError.textContent = '';

      if (!nom || !type || !statut) {
        messageError.textContent = 'Nom, Type et Statut sont obligatoires';
        return;
      }

      // Fetch cover depuis AniList si pas fournie
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
            urlCover = `https://placehold.co/220x350?text=${encodeURIComponent(nom)}`;
          }
        } catch (error) {
          urlCover = `https://placehold.co/220x350?text=${encodeURIComponent(nom)}`;
          }
      }

      // Création de la carte – nom directement sous l’image, sans conteneur
      const card = document.createElement('div');
      card.className = 'anime-card'; // Reuse anime-card style for waifu
      card.innerHTML = `
        <div class="img-wrapper">
          <img src="${urlCover}" alt="${nom}">
          <div class="statut">${statut.toUpperCase()}</div>
          <div class="note">★ ${note}</div>
          <div class="type">${type.toUpperCase()}</div>
        </div>
        ${nom}
      `;

      card.onclick = () => alert('Page détail à venir pour : ' + nom);
      document.getElementById('waifu-grid').appendChild(card);

      // Mise à jour compteur
      const countId = 'count-waifu-' + statut.toLowerCase().replace(/\s+/g, '-');
      const countElement = document.getElementById(countId);
      if (countElement) {
        countElement.textContent = parseInt(countElement.textContent || 0) + 1;
      }

      // Sauvegarde dans localStorage (clé 'waifus' pour séparer des animes)
      const waifu = { nom, type, statut, note, urlCover };
      let waifus = JSON.parse(localStorage.getItem('waifus') || '[]');
      waifus.push(waifu);
      localStorage.setItem('waifus', JSON.stringify(waifus));

      // Reset formulaire
      formAjout.reset();
    });
  }

  // Chargement des waifus sauvegardés
  const savedWaifus = JSON.parse(localStorage.getItem('waifus') || '[]');
  const grid = document.getElementById('waifu-grid');
  grid.innerHTML = '';
  savedWaifus.forEach(waifu => {
    const card = document.createElement('div');
    card.className = 'anime-card';
    card.innerHTML = `
      <div class="img-wrapper">
        <img src="${waifu.urlCover}" alt="${waifu.nom}">
        <div class="statut">${waifu.statut.toUpperCase()}</div>
        <div class="note">★ ${waifu.note}</div>
        <div class="type">${waifu.type.toUpperCase()}</div>
      </div>
      ${waifu.nom}
    `;
    card.onclick = () => alert('Page détail à venir pour : ' + waifu.nom);
    grid.appendChild(card);
  });
});
