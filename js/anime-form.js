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
  const rechercheInput = document.getElementById('recherche');
  const trieNom = document.getElementById('trie-nom');
  const trieType = document.getElementById('trie-type');
  const trieStatut = document.getElementById('trie-statut');
  const trieNote = document.getElementById('trie-note');

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

      // Clic sur la carte → ouvre la page détail
      card.onclick = () => {
        showDetailPage({ nom, type, statut, note, urlCover, isAnime: true });
      };

      grid.appendChild(card);

      updateCounter(statut);
      saveAnime({ nom, type, statut, note, urlCover });

      formAjout.reset();
    });
  }

  // Chargement + recherche/tri (inchangé, fonctionne déjà)
  function loadAnimes(filter = '', trieNomVal = '', trieTypeVal = '', trieStatutVal = '', trieNoteVal = '') {
    let animes = JSON.parse(localStorage.getItem('animes') || '[]');

    if (filter) {
      animes = animes.filter(anime => anime.nom.toLowerCase().includes(filter.toLowerCase()));
    }

    if (trieNomVal === 'az') {
      animes.sort((a, b) => a.nom.localeCompare(b.nom));
    } else if (trieNomVal === 'za') {
      animes.sort((a, b) => b.nom.localeCompare(a.nom));
    }

    if (trieTypeVal) {
      animes = animes.filter(anime => anime.type.toLowerCase() === trieTypeVal.toLowerCase());
    }

    if (trieStatutVal) {
      animes = animes.filter(anime => anime.statut.toLowerCase().replace(/\s+/g, '-') === trieStatutVal);
    }

    if (trieNoteVal === 'asc') {
      animes.sort((a, b) => parseFloat(a.note) - parseFloat(b.note));
    } else if (trieNoteVal === 'desc') {
      animes.sort((a, b) => parseFloat(b.note) - parseFloat(a.note));
    }

    grid.innerHTML = '';
    animes.forEach(anime => {
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

      card.onclick = () => {
        showDetailPage({ nom: anime.nom, type: anime.type, statut: anime.statut, note: anime.note, urlCover: anime.urlCover, isAnime: true });
      };

      grid.appendChild(card);
    });

    updateAllCounters(animes);
  }

  // Fonctions compteurs (inchangées, fonctionnent déjà)
  function updateCounter(statut) {
    const key = statut.toLowerCase().replace(/\s+/g, '-');
    const countId = 'count-' + key;
    const countElement = document.getElementById(countId);
    if (countElement) {
      let current = parseInt(countElement.textContent || 0);
      countElement.textContent = current + 1;
    }
  }

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

  function saveAnime(anime) {
    let animes = JSON.parse(localStorage.getItem('animes') || '[]');
    animes.push(anime);
    localStorage.setItem('animes', JSON.stringify(animes));
  }

  // Écouteurs recherche/tri (inchangés)
  if (rechercheInput) rechercheInput.addEventListener('input', () => loadAnimes(rechercheInput.value, trieNom.value, trieType.value, trieStatut.value, trieNote.value));
  if (trieNom) trieNom.addEventListener('change', () => loadAnimes(rechercheInput.value, trieNom.value, trieType.value, trieStatut.value, trieNote.value));
  if (trieType) trieType.addEventListener('change', () => loadAnimes(rechercheInput.value, trieNom.value, trieType.value, trieStatut.value, trieNote.value));
  if (trieStatut) trieStatut.addEventListener('change', () => loadAnimes(rechercheInput.value, trieNom.value, trieType.value, trieStatut.value, trieNote.value));
  if (trieNote) trieNote.addEventListener('change', () => loadAnimes(rechercheInput.value, trieNom.value, trieType.value, trieStatut.value, trieNote.value));

  // Fonction export JSON (fonctionne maintenant)
  function exportJSON(key = 'animes') {
    const data = JSON.parse(localStorage.getItem(key) || '[]');
    if (data.length === 0) {
      alert('Aucun élément à exporter.');
      return;
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${key}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  // Fonction import JSON (fonctionne maintenant)
  function importJSON(key = 'animes') {
    const fileInput = document.getElementById(`import-${key}`);
    const file = fileInput.files[0];
    if (!file) {
      alert('Aucun fichier sélectionné.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (!Array.isArray(data)) {
          alert('Fichier JSON invalide (doit être un tableau).');
          return;
        }
        localStorage.setItem(key, JSON.stringify(data));
        location.reload(); // Recharge pour appliquer
      } catch (err) {
        alert('Erreur lors de la lecture du fichier JSON.');
      }
    };
    reader.readAsText(file);
  }
});
