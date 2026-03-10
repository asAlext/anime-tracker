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

      card.onclick = () => alert('Page détail à venir pour : ' + nom);
      grid.appendChild(card);

      const waifu = { nom, note, urlCover, animeAssocie };
      let waifus = JSON.parse(localStorage.getItem('waifus') || '[]');
      waifus.push(waifu);
      localStorage.setItem('waifus', JSON.stringify(waifus));

      formAjout.reset();
    });
  }

  // Chargement + recherche/tri en temps réel
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
      card.onclick = () => alert('Page détail à venir pour : ' + waifu.nom);
      grid.appendChild(card);
    });
  }

  // Écouteurs recherche/tri
  if (rechercheInput) rechercheInput.addEventListener('input', () => loadWaifus(rechercheInput.value.trim(), trieNomSelect?.value || '', trieNoteSelect?.value || ''));
  if (trieNomSelect) trieNomSelect.addEventListener('change', () => loadWaifus(rechercheInput?.value.trim() || '', trieNomSelect.value, trieNoteSelect?.value || ''));
  if (trieNoteSelect) trieNoteSelect.addEventListener('change', () => loadWaifus(rechercheInput?.value.trim() || '', trieNomSelect?.value || '', trieNoteSelect.value));
});
