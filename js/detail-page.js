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
  // Affichage anime – taille fixe stricte (inchangée)
  if (animeData) {
    const coverUrl = animeData.urlCover || 'https://placehold.co/420x590?text=Cover+Anime';
    const imgAnime = document.getElementById('detail-cover-anime');
    imgAnime.src = coverUrl;
    imgAnime.style.width = '420px';
    imgAnime.style.height = '590px';
    imgAnime.style.objectFit = 'cover';
    // === INFOS VERTICALES (Nom → Type → Statut → Note) ===
    // On crée un wrapper qui force la colonne + plus d'espace
    let infoWrapper = document.createElement('div');
    infoWrapper.className = 'detail-anime-info'; // ← AJOUTÉ (seule correction)
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
    // On vide l’ancien conteneur et on ajoute le wrapper vertical
    const detailLeft = document.querySelector('.detail-left');
    if (detailLeft) {
      const existingInfo = detailLeft.querySelector('.detail-anime-info');
      if (existingInfo) existingInfo.remove();
      detailLeft.appendChild(infoWrapper);
    }
  }
  // Affichage waifu – taille fixe stricte (inchangée) + nom en gras
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

    // ====================== AJOUT DU BOUTON INFOS (à gauche de Modifier) ======================
  const buttonsContainer = document.querySelector('.detail-buttons');
  if (buttonsContainer) {
    // Supprime les anciens boutons "Infos" pour éviter la duplication
    buttonsContainer.querySelectorAll('#btn-infos').forEach(btn => btn.remove());

    // Crée et ajoute le nouveau bouton Infos (un seul)
    const btnInfos = document.createElement('button');
    btnInfos.textContent = 'Infos';
    btnInfos.id = 'btn-infos';
    btnInfos.style.padding = '8px 16px';
    btnInfos.style.marginRight = '10px';
    btnInfos.style.background = '#7e57c2';
    btnInfos.style.color = 'white';
    btnInfos.style.border = 'none';
    btnInfos.style.borderRadius = '6px';
    btnInfos.style.cursor = 'pointer';
    btnInfos.onclick = () => {
      // Appel direct à la fonction de info.js (sans redéfinir localement)
      if (typeof window.showInfosPage === 'function') {
        window.showInfosPage(animeData);
      } else {
        console.error('showInfosPage n’est pas définie – vérifie que info.js est chargé dans index.html');
      }
    };

    buttonsContainer.insertBefore(btnInfos, document.getElementById('btn-modifier'));
  }
// Modal Modifier – sauvegarde sans reload + NORMALISATION complète des statuts
function openModifyModal(animeData, waifuData) {
  let modal = document.getElementById('modify-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'modify-modal';
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.background = 'rgba(0,0,0,0.6)';
    modal.style.display = 'flex';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    modal.style.zIndex = '2000';
    modal.innerHTML = `
      <div style="background:#fff; padding:20px; border-radius:12px; width:400px; max-width:92%; box-shadow:0 6px 30px rgba(0,0,0,0.25);">
        <h2 style="margin:0 0 16px; font-size:22px; text-align:center; color:#333;">Modifier</h2>
     
        <form id="modify-form">
          <div style="margin-bottom:20px;">
            <h3 style="margin:0 0 10px; font-size:17px; color:#555;">Anime</h3>
         
            <label style="display:block; margin-bottom:4px; font-weight:bold; color:#444; font-size:14px;">Nom</label>
            <input type="text" id="mod-nom-anime" style="width:100%; padding:8px; margin-bottom:10px; border:1px solid #ccc; border-radius:6px; font-size:14px;">
         
            <label style="display:block; margin-bottom:4px; font-weight:bold; color:#444; font-size:14px;">Type</label>
            <select id="mod-type-anime" style="width:100%; padding:8px; margin-bottom:10px; border:1px solid #ccc; border-radius:6px; font-size:14px;">
              <option value="anime">anime</option>
              <option value="film">film</option>
            </select>
         
            <label style="display:block; margin-bottom:4px; font-weight:bold; color:#444; font-size:14px;">Statut</label>
            <select id="mod-statut-anime" style="width:100%; padding:8px; margin-bottom:10px; border:1px solid #ccc; border-radius:6px; font-size:14px;">
              <option value="Terminé">Terminé</option>
              <option value="En Cours">En Cours</option>
              <option value="En Pause">En Pause</option>
              <option value="A Regarder">A Regarder</option>
              <option value="Abandon">Abandon</option>
              <option value="Plus Jamais">Plus Jamais</option>
            </select>
         
            <label style="display:block; margin-bottom:4px; font-weight:bold; color:#444; font-size:14px;">Note</label>
            <input type="text" id="mod-note-anime" style="width:100%; padding:8px; margin-bottom:10px; border:1px solid #ccc; border-radius:6px; font-size:14px;">
         
            <label style="display:block; margin-bottom:4px; font-weight:bold; color:#444; font-size:14px;">Url Cover (optionnel)</label>
            <input type="text" id="mod-url-cover" placeholder="https://..." style="width:100%; padding:8px; margin-bottom:10px; border:1px solid #ccc; border-radius:6px; font-size:14px;">
          </div>
          <div style="margin-bottom:20px;">
            <h3 style="margin:0 0 10px; font-size:17px; color:#555;">Waifu associée</h3>
         
            <label style="display:block; margin-bottom:4px; font-weight:bold; color:#444; font-size:14px;">Nom</label>
            <input type="text" id="mod-nom-waifu" style="width:100%; padding:8px; margin-bottom:10px; border:1px solid #ccc; border-radius:6px; font-size:14px;">
         
            <label style="display:block; margin-bottom:4px; font-weight:bold; color:#444; font-size:14px;">Note</label>
            <input type="text" id="mod-note-waifu" style="width:100%; padding:8px; margin-bottom:10px; border:1px solid #ccc; border-radius:6px; font-size:14px;">
          </div>
          <div style="display:flex; justify-content:flex-end; gap:12px;">
            <button type="button" onclick="document.getElementById('modify-modal').remove()" style="padding:8px 16px; font-size:14px; background:#ddd; color:#333; border:none; border-radius:6px; cursor:pointer;">Annuler</button>
            <button type="submit" style="padding:8px 16px; font-size:14px; background:#7e57c2; color:white; border:none; border-radius:6px; cursor:pointer;">Sauvegarder</button>
          </div>
        </form>
      </div>
    `;
    document.body.appendChild(modal);
  }
  // Pré-remplir les champs
  if (animeData) {
    document.getElementById('mod-nom-anime').value = animeData.nom || '';
    document.getElementById('mod-type-anime').value = animeData.type || 'anime';
    document.getElementById('mod-statut-anime').value = animeData.statut || 'En Cours';
    document.getElementById('mod-note-anime').value = animeData.note || '';
    document.getElementById('mod-url-cover').value = animeData.urlCover || '';
  }
  if (waifuData) {
    document.getElementById('mod-nom-waifu').value = waifuData.nom || '';
    document.getElementById('mod-note-waifu').value = waifuData.note || '';
  }
  // Sauvegarde SANS RELOAD + NORMALISATION complète des statuts
  document.getElementById('modify-form').onsubmit = (e) => {
    e.preventDefault();
    // Normalisation : minuscule, sans accent, espaces → tiret
    function normalizeStatut(str) {
      if (!str) return '';
      return str
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, '-')
        .replace(/[^a-z-]/g, '');
    }
    if (animeData) {
      let animes = JSON.parse(localStorage.getItem('animes') || '[]');
      const index = animes.findIndex(a => a.nom === animeData.nom);
      if (index !== -1) {
        animes[index].nom = document.getElementById('mod-nom-anime').value;
        animes[index].type = document.getElementById('mod-type-anime').value;
        const statutOriginal = document.getElementById('mod-statut-anime').value;
        animes[index].statut = normalizeStatut(statutOriginal);
        animes[index].note = document.getElementById('mod-note-anime').value;
        const newCoverUrl = document.getElementById('mod-url-cover').value.trim();
        if (newCoverUrl) animes[index].urlCover = newCoverUrl;
        localStorage.setItem('animes', JSON.stringify(animes));
        document.getElementById('detail-nom-anime').textContent = animes[index].nom || 'Nom inconnu';
        document.getElementById('detail-type-anime').textContent = `Type : ${animes[index].type || 'Inconnu'}`;
        document.getElementById('detail-statut-anime').textContent = `Statut : ${statutOriginal || 'Inconnu'}`;
        document.getElementById('detail-note-anime').textContent = `Note : ${animes[index].note || 'NA'}`;
        if (newCoverUrl) document.getElementById('detail-cover-anime').src = newCoverUrl;
      }
    }
    if (waifuData) {
      let waifus = JSON.parse(localStorage.getItem('waifus') || '[]');
      const index = waifus.findIndex(w => w.nom === waifuData.nom);
      if (index !== -1) {
        waifus[index].nom = document.getElementById('mod-nom-waifu').value;
        waifus[index].note = document.getElementById('mod-note-waifu').value;
        localStorage.setItem('waifus', JSON.stringify(waifus));
        document.getElementById('detail-nom-waifu').innerHTML = `<strong>${waifus[index].nom || 'Nom inconnu'}</strong>`;
        document.getElementById('detail-note-waifu').textContent = `Note : ${waifus[index].note || 'NA'}`;
      }
    }
    if (typeof updateStats === 'function') {
      updateStats();
    }
    if (typeof updateAllCounters === 'function') {
      updateAllCounters(JSON.parse(localStorage.getItem('animes') || '[]'));
    }
    modal.remove();
  };
}
// Suppression anime (supprime aussi waifu associée)
function deleteAnime(nomAnime) {
  if (!nomAnime || !confirm('Supprimer cet anime ? La waifu associée sera aussi supprimée.')) return;
  let animes = JSON.parse(localStorage.getItem('animes') || '[]');
  animes = animes.filter(a => a.nom !== nomAnime);
  localStorage.setItem('animes', JSON.stringify(animes));
  let waifus = JSON.parse(localStorage.getItem('waifus') || '[]');
  waifus = waifus.filter(w => w.animeAssocie !== nomAnime);
  localStorage.setItem('waifus', JSON.stringify(waifus));
  location.reload();
}
// Suppression waifu (anime reste)
function deleteWaifu(nomWaifu) {
  if (!nomWaifu || !confirm('Supprimer cette waifu ?')) return;
  let waifus = JSON.parse(localStorage.getItem('waifus') || '[]');
  waifus = waifus.filter(w => w.nom !== nomWaifu);
  localStorage.setItem('waifus', JSON.stringify(waifus));
  location.reload();
}
