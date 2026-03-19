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

  // Reset uniquement les valeurs
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

  // ====================== ANIME ======================
  if (animeData) {
    const coverUrl = animeData.urlCover || 'https://placehold.co/420x590?text=Cover+Anime';
    const imgAnime = document.getElementById('detail-cover-anime');
    imgAnime.src = coverUrl;
    imgAnime.style.width = '420px';
    imgAnime.style.height = '590px';
    imgAnime.style.objectFit = 'cover';

    const detailLeft = document.querySelector('.detail-left');

    // 1. SOUS-MENU : juste sous la cover (pleine largeur)
    if (animeData.hasSousMenu === true) {
      SousMenuManager.renderSousMenu(animeData.nom);
    }

    // 2. INFOS VERTICALES (Nom → Type → Statut → Note) – à droite de la cover
    const infoWrapper = document.createElement('div');
    infoWrapper.style.display = 'flex';
    infoWrapper.style.flexDirection = 'column';
    infoWrapper.style.gap = '22px';           // ← ESPACEMENT AUGMENTÉ
    infoWrapper.style.maxWidth = '420px';
    infoWrapper.style.marginTop = '15px';
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

    detailLeft.appendChild(infoWrapper);
  }

  // ====================== WAIFU ======================
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

// =============================================
// Modal Modifier (inchangé – fonctionne déjà)
// =============================================
function openModifyModal(animeData, waifuData) {
  // ... (ton code modal actuel reste IDENTIQUE)
  // Je ne l’ai pas touché car tu as dit "ne touche à rien d’autre"
}

// Suppression anime + waifu (inchangé)
function deleteAnime(nomAnime) { /* ton code actuel */ }
function deleteWaifu(nomWaifu) { /* ton code actuel */ }
