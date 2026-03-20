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

  // Chargement initial + mise à jour compteurs immédiate
  loadAnimes();
  updateAllCounters(JSON.parse(localStorage.getItem('animes') || '[]'));

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
      // NORMALISATION du statut à l'ajout
      const statutNormalise = statut
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, '-')
        .replace(/[^a-z-]/g, '');
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
      card.onclick = () => {
        showDetailPage({ nom, type, statut, note, urlCover, isAnime: true });
      };
      grid.appendChild(card);
      updateCounter(statut);
      const hasSousMenu = document.getElementById('sous-menu-anime').checked;
saveAnime({ nom, type, statut: statutNormalise, note, urlCover, hasSousMenu });
      saveAnime({ nom, type, statut: statutNormalise, note, urlCover });
      formAjout.reset();
    });
  }

  // Chargement + recherche/tri
  function loadAnimes(filter = '', trieNomVal = '', trieTypeVal = '', trieStatutVal = '', trieNoteVal = '') {
    let animes = JSON.parse(localStorage.getItem('animes') || '[]');

    // Normalisation pour filtre statut
    function normalizeStatut(str) {
      if (!str) return '';
      return str
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, '-')
        .replace(/[^a-z-]/g, '');
    }

    // Appliquer les filtres
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
      const normalizedFilter = normalizeStatut(trieStatutVal);
      animes = animes.filter(anime => normalizeStatut(anime.statut) === normalizedFilter);
    }

    // TRI PAR NOTE – "NA" = 0 + gestion des virgules françaises
    if (trieNoteVal === 'asc' || trieNoteVal === 'desc') {
      animes.sort((a, b) => {
        // Remplace virgule par point et traite "NA" comme 0
        let noteA = a.note === 'NA' ? 0 : parseFloat((a.note || '0').replace(',', '.'));
        let noteB = b.note === 'NA' ? 0 : parseFloat((b.note || '0').replace(',', '.'));
        // Si parseFloat échoue (texte invalide), on met 0
        if (isNaN(noteA)) noteA = 0;
        if (isNaN(noteB)) noteB = 0;

        return trieNoteVal === 'asc' ? noteA - noteB : noteB - noteA;
      });
    }

    // Affichage des cartes (filtrées)
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

    // COMPTEURS : toujours la liste complète
    const allAnimes = JSON.parse(localStorage.getItem('animes') || '[]');
    updateAllCounters(allAnimes);
  }

  // Fonctions compteurs
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
    // NORMALISATION du statut à l'ajout
    anime.statut = anime.statut
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, '-')
      .replace(/[^a-z-]/g, '');
    animes.push(anime);
    localStorage.setItem('animes', JSON.stringify(animes));
    updateAllCounters(animes);
  }

  // Écouteurs recherche/tri
  if (rechercheInput) rechercheInput.addEventListener('input', () => loadAnimes(rechercheInput.value, trieNom.value, trieType.value, trieStatut.value, trieNote.value));
  if (trieNom) trieNom.addEventListener('change', () => loadAnimes(rechercheInput.value, trieNom.value, trieType.value, trieStatut.value, trieNote.value));
  if (trieType) trieType.addEventListener('change', () => loadAnimes(rechercheInput.value, trieNom.value, trieType.value, trieStatut.value, trieNote.value));
  if (trieStatut) trieStatut.addEventListener('change', () => loadAnimes(rechercheInput.value, trieNom.value, trieType.value, trieStatut.value, trieNote.value));
  if (trieNote) trieNote.addEventListener('change', () => loadAnimes(rechercheInput.value, trieNom.value, trieType.value, trieStatut.value, trieNote.value));

  // Fonction export JSON
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

  // Fonction import JSON
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
        alert(`${key.charAt(0).toUpperCase() + key.slice(1)} importés avec succès !`);
        loadAnimes();
        updateAllCounters(data);
      } catch (err) {
        alert('Erreur lors de la lecture du fichier JSON.');
      }
    };
    reader.readAsText(file);
  }
});
