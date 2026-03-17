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

  // Reset uniquement les valeurs (pas les éléments eux-mêmes)
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
      // Infos verticales – à droite de la cover (place originale)
      document.getElementById('detail-nom-anime').textContent = animeData.nom || 'Nom inconnu';
      document.getElementById('detail-type-anime').innerHTML = `<strong>Type :</strong> ${animeData.type || 'Inconnu'}`;
      document.getElementById('detail-statut-anime').innerHTML = `<strong>Statut :</strong> ${animeData.statut || 'Inconnu'}`;
      document.getElementById('detail-note-anime').innerHTML = `<strong>Note :</strong> ${animeData.note || 'NA'}`;

      // SOUS-MENU : placé juste sous la cover (pleine largeur)
      if (animeData.hasSousMenu === true) {
        renderSousMenu(animeData.nom, detailLeft);
      }
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

  // Boutons – fixés en bas et fonctionnels
  document.getElementById('btn-modifier').onclick = () => openModifyModal(animeData, waifuData);
  document.getElementById('btn-supprimer-anime').onclick = () => deleteAnime(animeData?.nom);
  document.getElementById('btn-supprimer-waifu').onclick = () => deleteWaifu(waifuData?.nom);
}

// === SOUS-MENU : rendu et gestion ===
function renderSousMenu(nomAnime, parentContainer) {
  let container = document.getElementById('sous-menu-container');
  if (container) container.remove();

  container = document.createElement('div');
  container.id = 'sous-menu-container';
  container.style.marginTop = '25px';
  container.style.padding = '20px';
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

  // Placement : juste sous la cover (dans detail-left)
  parentContainer.appendChild(container);
  loadSousMenuItems(nomAnime, content);
}

// (le reste de tes fonctions : addSousMenuItem, loadSousMenuItems, deleteAnime reste inchangé)
