// detail-page.js – Gestion de la page détail (anime ou waifu)
function showDetailPage(item) {
  const detailPage = document.getElementById('page-detail');
  if (!detailPage) {
    console.error('Page détail non trouvée dans le HTML');
    return;
  }
  // Switch page active
  document.querySelectorAll('.page').forEach(page => page.style.display = 'none');
  detailPage.style.display = 'block';

  // Reset les champs
  document.getElementById('detail-cover-anime').src = '';
  document.getElementById('detail-nom-anime').textContent = '';
  document.getElementById('detail-type-anime').textContent = '';
  document.getElementById('detail-statut-anime').textContent = '';
  document.getElementById('detail-note-anime').textContent = '';
  document.getElementById('detail-cover-waifu').src = '';
  document.getElementById('detail-nom-waifu').textContent = '';
  document.getElementById('detail-note-waifu').textContent = '';

  let animeData = null;
  let waifuData = null;
  if (item.isAnime) {
    animeData = item;
    const waifus = JSON.parse(localStorage.getItem('waifus') || '[]');
    waifuData = waifus.find(w => w.animeAssocie === animeData.nom);
  } else {
    waifuData = item;
    const animes = JSON.parse(localStorage.getItem('animes') || '[]');
    animeData = animes.find(a => a.nom === waifuData.animeAssocie);
  }

  // Affichage anime – taille fixe stricte
  if (animeData) {
    const coverUrl = animeData.urlCover || 'https://placehold.co/420x590?text=Cover+Anime';
    const imgAnime = document.getElementById('detail-cover-anime');
    imgAnime.src = coverUrl;
    imgAnime.style.width = '420px';
    imgAnime.style.height = '590px';
    imgAnime.style.objectFit = 'cover';

    // Infos verticales
    let infoWrapper = document.createElement('div');
    infoWrapper.style.display = 'flex';
    infoWrapper.style.flexDirection = 'column';
    infoWrapper.style.gap = '16px';
    infoWrapper.style.maxWidth = '400px';
    infoWrapper.style.textAlign = 'left';

    const nomEl = document.getElementById('detail-nom-anime');
    nomEl.textContent = animeData.nom || 'Nom inconnu';
    infoWrapper.appendChild(nomEl);

    const typeEl = document.getElementById('detail-type-anime');
    typeEl.innerHTML = `<strong>Type :</strong> ${animeData.type || 'Inconnu'}`;
    infoWrapper.appendChild(typeEl);

    const statutEl = document.getElementById('detail-statut-anime');
    statutEl.innerHTML = `<strong>Statut :</strong> ${animeData.statut || 'Inconnu'}`;
    infoWrapper.appendChild(statutEl);

    const noteEl = document.getElementById('detail-note-anime');
    noteEl.innerHTML = `<strong>Note :</strong> ${animeData.note || 'NA'}`;
    infoWrapper.appendChild(noteEl);

    const detailLeft = document.querySelector('.detail-left');
    if (detailLeft) {
      const existingInfo = detailLeft.querySelector('.detail-anime-info');
      if (existingInfo) existingInfo.remove();
      detailLeft.appendChild(infoWrapper);
    }

    // SOUS-MENU : uniquement si checkbox cochée (hasSousMenu true)
    if (animeData.hasSousMenu === true) {
      renderSousMenu(animeData.nom);
    }
  }

  // Affichage waifu
  if (waifuData) {
    const coverUrl = waifuData.urlCover || 'https://placehold.co/260x365?text=Cover+Waifu';
    const imgWaifu = document.getElementById('detail-cover-waifu');
    imgWaifu.src = coverUrl;
    imgWaifu.style.width = '260px';
    imgWaifu.style.height = '365px';
    imgWaifu.style.objectFit = 'cover';
    document.getElementById('detail-nom-waifu').innerHTML = `<strong>${waifuData.nom || 'Nom inconnu'}</strong>`;
    document.getElementById('detail-note-waifu').textContent = `Note : ${waifuData.note || 'NA'}`;
  } else {
    document.getElementById('detail-nom-waifu').textContent = 'Aucune waifu associée';
    document.getElementById('detail-note-waifu').textContent = '';
  }

  // Boutons
  document.getElementById('btn-modifier').onclick = () => openModifyModal(animeData, waifuData);
  document.getElementById('btn-supprimer-anime').onclick = () => deleteAnime(animeData?.nom);
  document.getElementById('btn-supprimer-waifu').onclick = () => deleteWaifu(waifuData?.nom);
}

// === FONCTION SOUS-MENU ===
function renderSousMenu(nomAnime) {
  let container = document.getElementById('sous-menu-container');
  if (container) container.remove();

  container = document.createElement('div');
  container.id = 'sous-menu-container';
  container.style.marginTop = '30px';
  container.style.padding = '20px';
  container.style.background = '#f9f9f9';
  container.style.border = '1px solid #ddd';
  container.style.borderRadius = '8px';
  container.style.width = '100%';

  // Barre d'outils fixe (juste sous la cover)
  const toolbar = document.createElement('div');
  toolbar.style.display = 'flex';
  toolbar.style.gap = '15px';
  toolbar.style.marginBottom = '25px';

  const btnTitre = document.createElement('button');
  btnTitre.textContent = '+ Titre';
  btnTitre.style.padding = '10px 18px';
  btnTitre.onclick = () => addSousMenuItem(nomAnime, 'titre');

  const btnAjout = document.createElement('button');
  btnAjout.textContent = 'Ajouter entrée';
  btnAjout.style.padding = '10px 18px';
  btnAjout.onclick = () => addSousMenuItem(nomAnime, 'entree');

  const btnSeparateur = document.createElement('button');
  btnSeparateur.textContent = 'Séparateur';
  btnSeparateur.style.padding = '10px 18px';
  btnSeparateur.onclick = () => addSousMenuItem(nomAnime, 'separateur');

  toolbar.append(btnTitre, btnAjout, btnSeparateur);
  container.appendChild(toolbar);

  const content = document.createElement('div');
  content.id = 'sous-menu-content';
  container.appendChild(content);

  // Ajout juste après les infos anime (dans .detail-left)
  const detailLeft = document.querySelector('.detail-left');
  if (detailLeft) detailLeft.appendChild(container);

  loadSousMenuItems(nomAnime, content);
}

// Ajout d'un item sans prompt
function addSousMenuItem(nomAnime, type) {
  let sousMenus = JSON.parse(localStorage.getItem('sousMenus') || '{}');
  if (!sousMenus[nomAnime]) sousMenus[nomAnime] = [];

  let item;
  if (type === 'titre') {
    item = { type: 'titre', texte: 'Nouveau titre' };
  } else if (type === 'entree') {
    item = { type: 'entree', nom: 'Nouveau nom', type: 'Anime', statut: 'En Cours' };
  } else if (type === 'separateur') {
    item = { type: 'separateur' };
  }

  sousMenus[nomAnime].push(item);
  localStorage.setItem('sousMenus', JSON.stringify(sousMenus));

  const content = document.getElementById('sous-menu-content');
  if (content) loadSousMenuItems(nomAnime, content);
}

// Charge et affiche (avec édition directe)
function loadSousMenuItems(nomAnime, container) {
  container.innerHTML = '';
  const sousMenus = JSON.parse(localStorage.getItem('sousMenus') || '{}');
  const items = sousMenus[nomAnime] || [];

  items.forEach((item, index) => {
    const ligne = document.createElement('div');
    ligne.style.position = 'relative';
    ligne.style.marginBottom = '16px';
    ligne.style.padding = '10px';
    ligne.style.background = '#fff';
    ligne.style.border = '1px solid #eee';
    ligne.style.borderRadius = '6px';

    const x = document.createElement('span');
    x.textContent = '×';
    x.style.position = 'absolute';
    x.style.right = '12px';
    x.style.top = '50%';
    x.style.transform = 'translateY(-50%)';
    x.style.color = 'red';
    x.style.fontSize = '24px';
    x.style.cursor = 'pointer';
    x.style.opacity = '0';
    x.style.transition = 'opacity 0.2s';
    x.onclick = () => {
      if (confirm('Supprimer ?')) {
        items.splice(index, 1);
        sousMenus[nomAnime] = items;
        localStorage.setItem('sousMenus', JSON.stringify(sousMenus));
        loadSousMenuItems(nomAnime, container);
      }
    };

    ligne.onmouseenter = () => x.style.opacity = '1';
    ligne.onmouseleave = () => x.style.opacity = '0';

    if (item.type === 'titre') {
      const input = document.createElement('input');
      input.type = 'text';
      input.value = item.texte;
      input.style.fontSize = '22px';
      input.style.fontWeight = 'bold';
      input.style.width = '100%';
      input.style.border = 'none';
      input.style.background = 'transparent';
      input.onchange = (e) => {
        item.texte = e.target.value;
        sousMenus[nomAnime] = items;
        localStorage.setItem('sousMenus', JSON.stringify(sousMenus));
      };
      ligne.appendChild(input);
    } else if (item.type === 'entree') {
      const nomInput = document.createElement('input');
      nomInput.type = 'text';
      nomInput.value = item.nom;
      nomInput.style.width = '40%';
      nomInput.style.marginRight = '10px';
      nomInput.onchange = (e) => {
        item.nom = e.target.value;
        sousMenus[nomAnime] = items;
        localStorage.setItem('sousMenus', JSON.stringify(sousMenus));
      };

      const typeSelect = document.createElement('select');
      ['Anime', 'Film', 'OAV'].forEach(t => {
        const opt = document.createElement('option');
        opt.value = t;
        opt.textContent = t;
        if (t === item.type) opt.selected = true;
        typeSelect.appendChild(opt);
      });
      typeSelect.onchange = (e) => {
        item.type = e.target.value;
        sousMenus[nomAnime] = items;
        localStorage.setItem('sousMenus', JSON.stringify(sousMenus));
      };

      const statutSelect = document.createElement('select');
      ['Terminé', 'En Cours', 'En Pause', 'A Regarder'].forEach(s => {
        const opt = document.createElement('option');
        opt.value = s;
        opt.textContent = s;
        if (s === item.statut) opt.selected = true;
        statutSelect.appendChild(opt);
      });
      statutSelect.onchange = (e) => {
        item.statut = e.target.value;
        sousMenus[nomAnime] = items;
        localStorage.setItem('sousMenus', JSON.stringify(sousMenus));
      };

      ligne.append(nomInput, typeSelect, statutSelect);
    } else if (item.type === 'separateur') {
      ligne.innerHTML = '<hr style="border:none; border-top:8px solid #aaa; margin:35px 0;">';
    }

    ligne.appendChild(x);
    container.appendChild(ligne);
  });
}

// Suppression automatique du sous-menu quand on supprime l'anime
function deleteAnime(nomAnime) {
  if (!nomAnime || !confirm('Supprimer cet anime ? La waifu associée et le sous-menu seront aussi supprimés.')) return;

  let animes = JSON.parse(localStorage.getItem('animes') || '[]');
  animes = animes.filter(a => a.nom !== nomAnime);
  localStorage.setItem('animes', JSON.stringify(animes));

  let waifus = JSON.parse(localStorage.getItem('waifus') || '[]');
  waifus = waifus.filter(w => w.animeAssocie !== nomAnime);
  localStorage.setItem('waifus', JSON.stringify(waifus));

  // Suppression du sous-menu
  let sousMenus = JSON.parse(localStorage.getItem('sousMenus') || '{}');
  delete sousMenus[nomAnime];
  localStorage.setItem('sousMenus', JSON.stringify(sousMenus));

  location.reload();
}

// (le reste du fichier reste inchangé : openModifyModal, deleteWaifu, etc.)
