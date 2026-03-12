// waifu-form.js – Gestion du formulaire ajout waifu et grille

document.addEventListener('DOMContentLoaded', () => {
  const formAjout = document.getElementById('form-ajout-waifu');
  const messageError = document.createElement('p');
  messageError.id = 'form-error-waifu';
  messageError.style.color = 'red';
  messageError.style.marginTop = '10px';
  messageError.style.textAlign = 'center';
  formAjout.appendChild(messageError);

  const grid = document.getElementById('waifu-grid');
  const rechercheInput = document.getElementById('recherche-waifu');
  const trieNomSelect = document.getElementById('trie-nom-waifu');
  const trieNoteSelect = document.getElementById('trie-note-waifu');

  // Chargement initial
  loadWaifus();

  if (formAjout) {
    formAjout.addEventListener('submit', async (e) => {
      e.preventDefault();

      const nom = document.getElementById('nom-waifu').value.trim();
      const note = document.getElementById('note-waifu').value.trim() || 'NA';
      let urlCover = document.getElementById('poster-waifu').value.trim();
      const animeAssocie = document.getElementById('anime-associe-waifu').value.trim();

      messageError.textContent = '';

      if (!nom) {
        messageError.textContent = 'Nom est obligatoire';
        return;
      }

      if (!urlCover) {
        urlCover = `https://placehold.co/220x350?text=${encodeURIComponent(nom)}`;
      }

      const card = document.createElement('div');
      card.className = 'anime-card';
      card.innerHTML = `
        <div class="img-wrapper">
          <img src="${urlCover}" alt="${nom}">
          <div class="note">★ ${note}</div>
        </div>
        ${nom}
      `;

      // Clic sur la carte → ouvre la page détail
      card.onclick = () => {
        showDetailPage({ nom, note, urlCover, animeAssocie, isAnime: false });
      };

      grid.appendChild(card);

      const waifu = { nom, note, urlCover, animeAssocie };
      let waifus = JSON.parse(localStorage.getItem('waifus') || '[]');
      waifus.push(waifu);
      localStorage.setItem('waifus', JSON.stringify(waifus));

      formAjout.reset();
    });
  }

  // Chargement + recherche/tri (inchangé, fonctionne déjà)
  function loadWaifus(filter = '', trieNom = '', trieNote = '') {
    let waifus = JSON.parse(localStorage.getItem('waifus') || '[]');

    if (filter) {
      waifus = waifus.filter(waifu => waifu.nom.toLowerCase().includes(filter.toLowerCase()));
    }

    if (trieNom === 'az') {
      waifus.sort((a, b) => a.nom.localeCompare(b.nom));
    } else if (trieNom === 'za') {
      waifus.sort((a, b) => b.nom.localeCompare(a.nom));
    }

    if (trieNote === 'asc') {
      waifus.sort((a, b) => parseFloat(a.note || 0) - parseFloat(b.note || 0));
    } else if (trieNote === 'desc') {
      waifus.sort((a, b) => parseFloat(b.note || 0) - parseFloat(a.note || 0));
    }

    grid.innerHTML = '';
    waifus.forEach(waifu => {
      const card = document.createElement('div');
      card.className = 'anime-card';
      card.innerHTML = `
        <div class="img-wrapper">
          <img src="${waifu.urlCover}" alt="${waifu.nom}">
          <div class="note">★ ${waifu.note}</div>
        </div>
        ${waifu.nom}
      `;

      card.onclick = () => {
        showDetailPage({ nom: waifu.nom, note: waifu.note, urlCover: waifu.urlCover, animeAssocie: waifu.animeAssocie, isAnime: false });
      };

      grid.appendChild(card);
    });
  }

  // Écouteurs recherche/tri (inchangés)
  if (rechercheInput) rechercheInput.addEventListener('input', () => loadWaifus(rechercheInput.value.trim(), trieNomSelect?.value || '', trieNoteSelect?.value || ''));
  if (trieNomSelect) trieNomSelect.addEventListener('change', () => loadWaifus(rechercheInput?.value.trim() || '', trieNomSelect.value, trieNoteSelect?.value || ''));
  if (trieNoteSelect) trieNoteSelect.addEventListener('change', () => loadWaifus(rechercheInput?.value.trim() || '', trieNomSelect?.value || '', trieNoteSelect.value));

  // Fonction export JSON (fonctionne maintenant)
  function exportJSON(key = 'waifus') {
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
  function importJSON(key = 'waifus') {
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
