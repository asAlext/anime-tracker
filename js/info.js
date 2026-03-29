// info.js – Ajout du X invisible au survol (uniquement cette modification)
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

  document.getElementById('btn-titre').onclick = () => addTitre();
  document.getElementById('btn-plus1').onclick = () => addEntree();
  document.getElementById('btn-separateur').onclick = () => addSeparateur();
}

// ====================== FONCTIONS ======================
function loadInfosContent() {
  const container = document.getElementById('infos-content');
  container.innerHTML = '';
  container.style.marginTop = '100px';
  container.style.marginLeft = '40px';
  container.style.width = 'calc(100% - 500px)';

  if (!currentAnimeNom) return;

  const allInfos = JSON.parse(localStorage.getItem('animeInfos') || '{}');
  const data = allInfos[currentAnimeNom] || [];

  data.forEach((item) => {
    let ligne = document.createElement('div');

    if (item.type === 'titre') {
      ligne.className = 'info-ligne titre-ligne';
      ligne.innerHTML = `
        <textarea class="info-titre" placeholder="Titre libre..." style="border:none; font-weight:bold;">${item.texte || ''}</textarea>
        <button class="delete-btn">Supprimer</button>
      `;
    } else if (item.type === 'entree') {
      ligne.className = 'info-ligne entree-ligne';
      ligne.style.marginBottom = '25px';
      ligne.innerHTML = `
        <input type="text" class="info-nom" value="${item.nom || ''}" placeholder="Nom" style="margin-right:35px; border:none;">
        <select class="info-type" style="margin-right:35px; border:none;">
          <option value="Anime" ${item.typeVal === 'Anime' ? 'selected' : ''}>Anime</option>
          <option value="Film" ${item.typeVal === 'Film' ? 'selected' : ''}>Film</option>
          <option value="OVA" ${item.typeVal === 'OVA' ? 'selected' : ''}>OVA</option>
        </select>
        <select class="info-statut" style="border:none;">
          <option value="Terminé" ${item.statut === 'Terminé' ? 'selected' : ''}>Terminé</option>
          <option value="En Cours" ${item.statut === 'En Cours' ? 'selected' : ''}>En Cours</option>
          <option value="En Pause" ${item.statut === 'En Pause' ? 'selected' : ''}>En Pause</option>
          <option value="A Regarder" ${item.statut === 'A Regarder' ? 'selected' : ''}>A Regarder</option>
        </select>
        <button class="delete-btn">Supprimer</button>
      `;
    } else if (item.type === 'separateur') {
      ligne.className = 'info-separateur';
      ligne.innerHTML = `<div style="height: 60px;"></div><button class="delete-btn">Supprimer</button>`;
    }

    container.appendChild(ligne);

    // Bouton Supprimer
    const btn = ligne.querySelector('.delete-btn');
    if (btn) {
      btn.style.marginLeft = '20px';
      btn.style.padding = '4px 10px';
      btn.style.background = '#ff6b6b';
      btn.style.color = 'white';
      btn.style.border = 'none';
      btn.style.borderRadius = '4px';
      btn.style.cursor = 'pointer';

      btn.onclick = () => {
        ligne.remove();
        saveInfosContent();
      };
    }
  });
}

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

// Ajout des boutons
function addTitre() {
  const container = document.getElementById('infos-content');
  const ligne = document.createElement('div');
  ligne.className = 'info-ligne titre-ligne';
  ligne.innerHTML = `<textarea class="info-titre" placeholder="Titre libre..." style="border:none; font-weight:bold;"></textarea><span class="delete-x">×</span>`;
  container.appendChild(ligne);
  saveInfosContent();
}

function addEntree() {
  const container = document.getElementById('infos-content');
  const ligne = document.createElement('div');
  ligne.className = 'info-ligne entree-ligne';
  ligne.style.marginBottom = '25px';
  ligne.innerHTML = `
    <input type="text" class="info-nom" placeholder="Nom" style="margin-right:35px; border:none;">
    <select class="info-type" style="margin-right:35px; border:none;">
      <option value="Anime">Anime</option>
      <option value="Film">Film</option>
      <option value="OVA">OVA</option>
    </select>
    <select class="info-statut" style="border:none;">
      <option value="Terminé">Terminé</option>
      <option value="En Cours">En Cours</option>
      <option value="En Pause">En Pause</option>
      <option value="A Regarder">A Regarder</option>
    </select>
    <span class="delete-x">×</span>
  `;
  container.appendChild(ligne);
  saveInfosContent();
}

function addSeparateur() {
  const container = document.getElementById('infos-content');
  const sep = document.createElement('div');
  sep.className = 'info-separateur';
  sep.innerHTML = `<div style="height: 60px;"></div><span class="delete-x">×</span>`;
  container.appendChild(sep);
  saveInfosContent();
}
