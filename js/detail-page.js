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
    // Cherche la waifu associée par nom exact
    const waifus = JSON.parse(localStorage.getItem('waifus') || '[]');
    waifuData = waifus.find(w => w.animeAssocie === animeData.nom);
  } else {
    waifuData = item;
    // Cherche l’anime associé par nom exact
    const animes = JSON.parse(localStorage.getItem('animes') || '[]');
    animeData = animes.find(a => a.nom === waifuData.animeAssocie);
  }

  // Affichage anime (cover + infos à droite)
  if (animeData) {
    const coverUrl = animeData.urlCover || 'https://placehold.co/380x540?text=Cover+Anime';
    document.getElementById('detail-cover-anime').src = coverUrl;
    document.getElementById('detail-nom-anime').textContent = animeData.nom || 'Nom inconnu';
    document.getElementById('detail-type-anime').textContent = `Type : ${animeData.type || 'Inconnu'}`;
    document.getElementById('detail-statut-anime').textContent = `Statut : ${animeData.statut || 'Inconnu'}`;
    document.getElementById('detail-note-anime').textContent = `Note : ${animeData.note || 'NA'}`;
  } else {
    document.getElementById('detail-nom-anime').textContent = 'Aucun anime sélectionné';
  }

  // Affichage waifu (cover + nom + note en dessous)
  if (waifuData) {
    const coverUrl = waifuData.urlCover || 'https://placehold.co/180x260?text=Cover+Waifu';
    document.getElementById('detail-cover-waifu').src = coverUrl;
    document.getElementById('detail-nom-waifu').textContent = waifuData.nom || 'Nom inconnu';
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

// Modal Modifier (popup) – inchangé
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
    modal.style.background = 'rgba(0,0,0,0.7)';
    modal.style.display = 'flex';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    modal.style.zIndex = '2000';
    modal.innerHTML = `
      <div style="background:white; padding:30px; border-radius:12px; width:500px; max-width:90%;">
        <h2>Modifier</h2>
        <form id="modify-form">
          <h3>Anime</h3>
          <label>Nom</label><input type="text" id="mod-nom-anime"><br>
          <label>Type</label><input type="text" id="mod-type-anime"><br>
          <label>Statut</label><input type="text" id="mod-statut-anime"><br>
          <label>Note</label><input type="text" id="mod-note-anime"><br>
          <h3>Waifu associée</h3>
          <label>Nom</label><input type="text" id="mod-nom-waifu"><br>
          <label>Note</label><input type="text" id="mod-note-waifu"><br>
          <button type="submit">Sauvegarder</button>
          <button type="button" onclick="document.getElementById('modify-modal').remove()">Annuler</button>
        </form>
      </div>
    `;
    document.body.appendChild(modal);
  }

  // Pré-remplir les champs
  if (animeData) {
    document.getElementById('mod-nom-anime').value = animeData.nom || '';
    document.getElementById('mod-type-anime').value = animeData.type || '';
    document.getElementById('mod-statut-anime').value = animeData.statut || '';
    document.getElementById('mod-note-anime').value = animeData.note || '';
  }
  if (waifuData) {
    document.getElementById('mod-nom-waifu').value = waifuData.nom || '';
    document.getElementById('mod-note-waifu').value = waifuData.note || '';
  }

  // Sauvegarde
  document.getElementById('modify-form').onsubmit = (e) => {
    e.preventDefault();
    if (animeData) {
      let animes = JSON.parse(localStorage.getItem('animes') || '[]');
      const index = animes.findIndex(a => a.nom === animeData.nom);
      if (index !== -1) {
        animes[index].nom = document.getElementById('mod-nom-anime').value;
        animes[index].type = document.getElementById('mod-type-anime').value;
        animes[index].statut = document.getElementById('mod-statut-anime').value;
        animes[index].note = document.getElementById('mod-note-anime').value;
        localStorage.setItem('animes', JSON.stringify(animes));
      }
    }
    if (waifuData) {
      let waifus = JSON.parse(localStorage.getItem('waifus') || '[]');
      const index = waifus.findIndex(w => w.nom === waifuData.nom);
      if (index !== -1) {
        waifus[index].nom = document.getElementById('mod-nom-waifu').value;
        waifus[index].note = document.getElementById('mod-note-waifu').value;
        localStorage.setItem('waifus', JSON.stringify(waifus));
      }
    }
    modal.remove();
    location.reload();
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
