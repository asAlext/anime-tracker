// info.js – Version finale selon tes demandes précises
let currentAnimeNom = null;

function showInfosPage(animeData) {
  currentAnimeNom = animeData.nom;

  document.querySelectorAll('.page').forEach(page => page.style.display = 'none');
  document.getElementById('page-infos').style.display = 'block';

  // Cover (ne jamais toucher)
  const cover = document.getElementById('infos-cover-anime');
  if (cover) {
    cover.src = animeData.urlCover || 'https://placehold.co/420x590?text=Cover+Anime';
    cover.style.width = '420px';
    cover.style.height = '590px';
    cover.style.objectFit = 'cover';
    cover.style.marginTop = '80px';
  }

  loadInfosContent();

  // Bouton Retour
  document.getElementById('btn-retour').onclick = () => {
    document.getElementById('page-infos').style.display = 'none';
    document.getElementById('page-detail').style.display = 'block';
  };
}

// ====================== ZONE JAUNE ======================
function loadInfosContent() {
  const container = document.getElementById('infos-content');
  container.innerHTML = '';

  // Style de la zone jaune (descendue + élargie)
  container.style.marginTop = '120px';      // descend un peu pour ne plus chevaucher les boutons
  container.style.marginLeft = '60px';
  container.style.width = 'calc(100% - 520px)';

  if (!currentAnimeNom) return;

  const allInfos = JSON.parse(localStorage.getItem('animeInfos') || '{}');
  const data = allInfos[currentAnimeNom] || [];

  data.forEach((item, index) => {
    let ligne = document.createElement('div');

    if (item.type === 'titre') {
      ligne.className = 'info-ligne titre-ligne';
      ligne.innerHTML = `
        <textarea class="info-titre" placeholder="Titre libre...">${item.texte || ''}</textarea>
        <span class="delete-x">×</span>
      `;
    } else if (item.type === 'entree') {
      ligne.className = 'info-ligne entree-ligne';
      ligne.innerHTML = `
        <input type="text" class="info-nom" value="${item.nom || ''}" placeholder="Nom">
        <select class="info-type">
          <option value="Anime" ${item.typeVal === 'Anime' ? 'selected' : ''}>Anime</option>
          <option value="Film" ${item.typeVal === 'Film' ? 'selected' : ''}>Film</option>
          <option value="OVA" ${item.typeVal === 'OVA' ? 'selected' : ''}>OVA</option>
        </select>
        <select class="info-statut">
          <option value="Terminé" ${item.statut === 'Terminé' ? 'selected' : ''}>Terminé</option>
          <option value="En Cours" ${item.statut === 'En Cours' ? 'selected' : ''}>En Cours</option>
          <option value="En Pause" ${item.statut === 'En Pause' ? 'selected' : ''}>En Pause</option>
          <option value="A Regarder" ${item.statut === 'A Regarder' ? 'selected' : ''}>A Regarder</option>
        </select>
        <span class="delete-x">×</span>
      `;
    } else if (item.type === 'separateur') {
      ligne.className = 'info-separateur';
      ligne.innerHTML = '<div style="height: 60px;"></div>'; // espace plus grand et discret
    }

    container.appendChild(ligne);

    // X visible uniquement au survol
    const x = ligne.querySelector('.delete-x');
    if (x) {
      x.style.opacity = '0';
      x.style.transition = 'opacity 0.2s';
      ligne.addEventListener('mouseenter', () => x.style.opacity = '1');
      ligne.addEventListener('mouseleave', () => x.style.opacity = '0');
      x.onclick = (e) => {
        e.stopPropagation();
        ligne.remove();
        saveInfosContent();
      };
    }
  });
}

// Sauvegarde automatique
function saveInfosContent() {
  if (!currentAnimeNom) return;
  const container = document.getElementById('infos-content');
  const data = [];

  container.querySelectorAll('.info-ligne, .info-separateur').forEach(el => {
    if (el.classList.contains('titre-ligne')) {
      data.push({ type: 'titre', texte: el.querySelector('textarea').value });
    } else if (el.classList.contains('entree-ligne')) {
      data.push({
        type: 'entree',
        nom: el.querySelector('.info-nom').value,
        typeVal: el.querySelector('.info-type').value,
        statut: el.querySelector('.info-statut').value
      });
    } else if (el.classList.contains('info-separateur')) {
      data.push({ type: 'separateur' });
    }
  });

  let allInfos = JSON.parse(localStorage.getItem('animeInfos') || '{}');
  allInfos[currentAnimeNom] = data;
  localStorage.setItem('animeInfos', JSON.stringify(allInfos));
}

// Boutons
document.getElementById('btn-titre').onclick = () => {
  const container = document.getElementById('infos-content');
  const ligne = document.createElement('div');
  ligne.className = 'info-ligne titre-ligne';
  ligne.innerHTML = `<textarea class="info-titre" placeholder="Titre libre..."></textarea><span class="delete-x">×</span>`;
  container.appendChild(ligne);
  saveInfosContent();
};

document.getElementById('btn-plus1').onclick = () => {
  const container = document.getElementById('infos-content');
  const ligne = document.createElement('div');
  ligne.className = 'info-ligne entree-ligne';
  ligne.innerHTML = `
    <input type="text" class="info-nom" placeholder="Nom">
    <select class="info-type">
      <option value="Anime">Anime</option>
      <option value="Film">Film</option>
      <option value="OVA">OVA</option>
    </select>
    <select class="info-statut">
      <option value="Terminé">Terminé</option>
      <option value="En Cours">En Cours</option>
      <option value="En Pause">En Pause</option>
      <option value="A Regarder">A Regarder</option>
    </select>
    <span class="delete-x">×</span>
  `;
  container.appendChild(ligne);
  saveInfosContent();
};

document.getElementById('btn-separateur').onclick = () => {
  const container = document.getElementById('infos-content');
  const sep = document.createElement('div');
  sep.className = 'info-separateur';
  sep.innerHTML = '<div style="height: 60px;"></div>';
  container.appendChild(sep);
  saveInfosContent();
};
