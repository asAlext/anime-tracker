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
      // Reset pour éviter doublons
      const existingInfo = detailLeft.querySelector('.detail-anime-info');
      if (existingInfo) existingInfo.remove();

      // Infos verticales (nom, type, statut, note) – limitées à 400px pour rester alignées à gauche
      let infoWrapper = document.createElement('div');
      infoWrapper.className = 'detail-anime-info';
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

      // SOUS-MENU : placé juste après la cover (avant les infos si besoin, mais ici après cover)
      if (animeData.hasSousMenu === true) {
        let sousMenuContainer = document.getElementById('sous-menu-container');
        if (sousMenuContainer) sousMenuContainer.remove();

        sousMenuContainer = document.createElement('div');
        sousMenuContainer.id = 'sous-menu-container';
        sousMenuContainer.style.marginTop = '20px'; // espace sous la cover
        sousMenuContainer.style.padding = '15px';
        sousMenuContainer.style.background = '#f9f9f9';
        sousMenuContainer.style.border = '1px solid #ddd';
        sousMenuContainer.style.borderRadius = '8px';
        sousMenuContainer.style.width = '100%'; // toute la largeur
        sousMenuContainer.style.boxSizing = 'border-box';

        // Barre d'outils fixe
        const toolbar = document.createElement('div');
        toolbar.style.display = 'flex';
        toolbar.style.gap = '12px';
        toolbar.style.marginBottom = '20px';

        const btnTitre = document.createElement('button');
        btnTitre.textContent = '+ Titre';
        btnTitre.onclick = () => addSousMenuItem(nomAnime, 'titre', sousMenuContainer);

        const btnAjout = document.createElement('button');
        btnAjout.textContent = 'Ajouter entrée';
        btnAjout.onclick = () => addSousMenuItem(nomAnime, 'entree', sousMenuContainer);

        const btnSeparateur = document.createElement('button');
        btnSeparateur.textContent = 'Séparateur';
        btnSeparateur.onclick = () => addSousMenuItem(nomAnime, 'separateur', sousMenuContainer);

        toolbar.append(btnTitre, btnAjout, btnSeparateur);
        sousMenuContainer.appendChild(toolbar);

        const content = document.createElement('div');
        content.id = 'sous-menu-content';
        sousMenuContainer.appendChild(content);

        detailLeft.appendChild(sousMenuContainer);

        loadSousMenuItems(animeData.nom, content);
      }

      // Infos après le sous-menu (pour qu'elles restent alignées à gauche)
      detailLeft.appendChild(infoWrapper);
    }
  }

  // Affichage waifu (inchangé)
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

// (le reste du fichier reste inchangé : renderSousMenu, addSousMenuItem, loadSousMenuItems, deleteAnime, openModifyModal, etc.)
