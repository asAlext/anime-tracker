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

    // ====================== TEXTAREA SOUS LA COVER ======================
    const detailLeft = document.querySelector('.detail-left');
    if (detailLeft) {
      const textareaContainer = document.createElement('div');
      textareaContainer.style.marginTop = '30px';
      textareaContainer.style.width = '100%';

      const textarea = document.createElement('textarea');
      textarea.style.width = '100%';
      textarea.style.minHeight = '220px';
      textarea.style.padding = '15px';
      textarea.style.fontSize = '16px';
      textarea.style.border = '1px solid #ccc';
      textarea.style.borderRadius = '8px';
      textarea.style.resize = 'vertical';
      textarea.placeholder = 'Écris ici tes saisons, films, OAV... (N/ pour nom en gras, --- pour séparateur)';

      // Chargement du texte sauvegardé
      const savedText = localStorage.getItem(`sousmenu_${animeData.nom}`);
      if (savedText) textarea.value = savedText;

      // Transformation automatique + sauvegarde
      textarea.addEventListener('input', () => {
        let text = textarea.value;

        // N/ → nom en gras (remplace - par espaces)
        text = text.replace(/^N\/(.*)$/gm, (match, name) => {
          const cleanName = name.trim().replace(/-/g, ' ');
          return `**${cleanName}**`;
        });

        // --- → grosse ligne de séparation
        text = text.replace(/^---$/gm, '─────────────────────────────');

        textarea.value = text;
        localStorage.setItem(`sousmenu_${animeData.nom}`, text);
      });

      textareaContainer.appendChild(textarea);
      detailLeft.appendChild(textareaContainer);
    }

    // === INFOS VERTICALES (Nom → Type → Statut → Note) ===
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

    const detailLeft2 = document.querySelector('.detail-left');
    if (detailLeft2) {
      const existingInfo = detailLeft2.querySelector('.detail-anime-info');
      if (existingInfo) existingInfo.remove();
      detailLeft2.appendChild(infoWrapper);
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
}
// Modal Modifier – sauvegarde sans reload + NORMALISATION complète des statuts
function openModifyModal(animeData, waifuData) {
  // ... (ton code modal actuel reste IDENTIQUE)
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
