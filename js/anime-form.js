// anime-form.js – Gestion du formulaire ajout anime et grille

document.addEventListener('DOMContentLoaded', () => {
  const formAjout = document.getElementById('form-ajout-anime');
  const messageError = document.createElement('p');
  messageError.id = 'form-error';
  messageError.style.color = 'red';
  messageError.style.marginTop = '10px';
  messageError.style.textAlign = 'center';
  formAjout.appendChild(messageError);

  const grid = document.getElementById('anime-grid');

  // Chargement initial
  loadAnimes();

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
      card.className = 'anime-card';
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
      grid.appendChild(card);

      // Mise à jour compteur et sauvegarde
      updateCounter(statut);
      saveAnime({ nom, type, statut, note, urlCover });

      // Reset formulaire
      formAjout.reset();
    });
  }

  // Fonction de chargement des animes (persistants)
  function loadAnimes() {
    const savedAnimes = JSON.parse(localStorage.getItem('animes') || '[]');
    grid.innerHTML = ''; // Nettoyage pour éviter doublons
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
        ${anime.nom}
      `;
      card.onclick = () => alert('Page détail à venir pour : ' + anime.nom);
      grid.appendChild(card);
    });

    // Mise à jour des compteurs au chargement
    updateAllCounters(savedAnimes);
  }

  // Mise à jour d'un compteur spécifique
  function updateCounter(statut) {
    const key = statut.toLowerCase().replace(/\s+/g, '-');
    const countId = 'count-' + key;
    const countElement = document.getElementById(countId);
    if (countElement) {
      countElement.textContent = parseInt(countElement.textContent || 0) + 1;
    }
  }

  // Mise à jour tous les compteurs au chargement
  function updateAllCounters(animes) {
    const counts = {
      termine: 0,
      'en-cours': 0,
      'en-pause': 0,
      'a-regarder': 0,
      abandon: 0,
      'plus-jamais': 0
    };

    animes.forEach(anime => {
      const key = anime.statut.toLowerCase().replace(/\s+/g, '-');
      if (counts[key] !== undefined) {
        counts[key]++;
      }
    });

    for (const [key, value] of Object.entries(counts)) {
      const countElement = document.getElementById(`count-${key}`);
      if (countElement) {
        countElement.textContent = value;
      }
    }
  }

  // Sauvegarde un anime dans localStorage
  function saveAnime(anime) {
    let animes = JSON.parse(localStorage.getItem('animes') || '[]');
    animes.push(anime);
    localStorage.setItem('animes', JSON.stringify(animes));
  }

  // Fonction export JSON
  function exportJSON(key = 'animes') {
    const data = JSON.parse(localStorage.getItem(key) || '[]');
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${key}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  // Fonction import JSON
  function importJSON(key = 'animes') {
    const fileInput = document.getElementById(`import-${key}`);
    const file = fileInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          localStorage.setItem(key, JSON.stringify(data));
          location.reload(); // Recharge pour appliquer
        } catch (err) {
          alert('Fichier JSON invalide');
        }
      };
      reader.readAsText(file);
    }
  }
});
