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

    const detailLeft = document.querySelector('.detail-left');
    if (detailLeft) {
      detailLeft.style.display = 'flex';
      detailLeft.style.flexDirection = 'column';
      detailLeft.style.alignItems = 'flex-start';
      detailLeft.style.width = '100%';

      // Infos anime remises à côté de la cover (dans un flex row)
      let row = document.createElement('div');
      row.style.display = 'flex';
      row.style.gap = '30px';
      row.style.alignItems = 'flex-start';

      // Cover anime
      const coverContainer = document.createElement('div');
      coverContainer.appendChild(imgAnime);
      row.appendChild(coverContainer);

      // Infos verticales (à côté de la cover)
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

      row.appendChild(infoWrapper);
      detailLeft.appendChild(row);

      // SOUS-MENU : placé juste sous la cover + infos (pleine largeur)
      if (animeData.hasSousMenu === true) {
        renderSousMenu(animeData.nom, detailLeft);
      }
    }
  }

  // Affichage waifu (inchangé – ne touche pas)
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

  // Boutons – rendus fixes (sticky)
  const buttonsDiv = document.querySelector('.detail-buttons');
  if (buttonsDiv) {
    buttonsDiv.style.position = 'sticky';
    buttonsDiv.style.top = '20px';
    buttonsDiv.style.zIndex = '100';
    buttonsDiv.style.background = '#fff';
    buttonsDiv.style.padding = '10px';
    buttonsDiv.style.borderRadius = '8px';
  }

  document.getElementById('btn-modifier').onclick = () => openModifyModal(animeData, waifuData);
  document.getElementById('btn-supprimer-anime').onclick = () => deleteAnime(animeData?.nom);
  document.getElementById('btn-supprimer-waifu').onclick = () => deleteWaifu(waifuData?.nom);
}

// === SOUS-MENU : rendu et gestion (plein largeur sous la cover) ===
function renderSousMenu(nomAnime, parentContainer) {
  let container = document.getElementById('sous-menu-container');
  if (container) container.remove();
  container = document.createElement('div');
  container.id = 'sous-menu-container';
  container.style.marginTop = '25px';
  container.style.padding = '15px';
  container.style.background = '#f9f9f9';
  container.style.border = '1px solid #ddd';
  container.style.borderRadius = '8px';
  container.style.width = '100%';
  container.style.boxSizing = 'border-box';

  // Barre d'outils fixe
  const toolbar = document.createElement('div');
  toolbar.style.display = 'flex';
  toolbar.style.gap = '15px';
  toolbar.style.marginBottom = '25px';
  toolbar.style.flexWrap = 'wrap';

  const btnTitre = document.createElement('button');
  btnTitre.textContent = '+ Titre';
  btnTitre.style.padding = '10px 18px';
  btnTitre.onclick = () => addSousMenuItem(nomAnime, 'titre', container);

  const btnAjout = document.createElement('button');
  btnAjout.textContent = 'Ajouter entrée';
  btnAjout.style.padding = '10px 18px';
  btnAjout.onclick = () => addSousMenuItem(nomAnime, 'entree', container);

  const btnSeparateur = document.createElement('button');
  btnSeparateur.textContent = 'Séparateur';
  btnSeparateur.style.padding = '10px 18px';
  btnSeparateur.onclick = () => addSousMenuItem(nomAnime, 'separateur', container);

  toolbar.append(btnTitre, btnAjout, btnSeparateur);
  container.appendChild(toolbar);

  const content = document.createElement('div');
  content.id = 'sous-menu-content';
  container.appendChild(content);

  parentContainer.appendChild(container);
  loadSousMenuItems(nomAnime, content);
}

// (le reste de tes fonctions addSousMenuItem, loadSousMenuItems, deleteAnime reste inchangé)
