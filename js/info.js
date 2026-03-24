// info.js – Boutons fonctionnels dans la zone jaune
let currentAnimeNom = null;

function showInfosPage(animeData) {
  currentAnimeNom = animeData.nom;

  console.log("showInfosPage appelé avec :", animeData);

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

  // Charger le contenu déjà sauvegardé pour cet anime
  loadInfosContent();

  // Bouton Retour
  document.getElementById('btn-retour').onclick = () => {
    document.getElementById('page-infos').style.display = 'none';
    document.getElementById('page-detail').style.display = 'block';
  };

  // Bouton Titre
  document.getElementById('btn-titre').onclick = () => addTitre();

  // Bouton +1
  document.getElementById('btn-plus1').onclick = () => addEntree();

  // Bouton Séparateur
  document.getElementById('btn-separateur').onclick = () => addSeparateur();
}

// ==================== FONCTIONS DES BOUTONS ====================

function addTitre() {
  const container = document.getElementById('infos-content');
  const ligne = document.createElement('div');
  ligne.className = 'info-ligne titre-ligne';
  ligne.innerHTML = `
    <textarea class="info-titre" placeholder="Écris ton titre ici..."></textarea>
    <span class="delete-x">×</span>
  `;
  container.appendChild(ligne);
  saveInfosContent();
}

function addEntree() {
  const container = document.getElementById('infos-content');
  const ligne = document.createElement('div');
  ligne.className = 'info-ligne entree-ligne';
  ligne.innerHTML = `
    <input type="text" class="info-nom" placeholder="Nom de l'entrée">
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
}

function addSeparateur() {
  const container = document.getElementById('infos-content');
  const sep = document.createElement('div');
  sep.className = 'info-separateur';
  sep.innerHTML = '<hr>';
  container.appendChild(sep);
  saveInfosContent();
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

// Chargement du contenu sauvegardé
function loadInfosContent() {
  const container = document.getElementById('infos-content');
  container.innerHTML = '';

  if (!currentAnimeNom) return;
  const allInfos = JSON.parse(localStorage.getItem('animeInfos') || '{}');
  const data = allInfos[currentAnimeNom] || [];

  data.forEach(item => {
    if (item.type === 'titre') {
      const ligne = document.createElement('div');
      ligne.className = 'info-ligne titre-ligne';
      ligne.innerHTML = `
        <textarea class="info-titre">${item.texte || ''}</textarea>
        <span class="delete-x">×</span>
      `;
      container.appendChild(ligne);
    } else if (item.type === 'entree') {
      const ligne = document.createElement('div');
      ligne.className = 'info-ligne entree-ligne';
      ligne.innerHTML = `
        <input type="text" class="info-nom" value="${item.nom || ''}">
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
      container.appendChild(ligne);
    } else if (item.type === 'separateur') {
      const sep = document.createElement('div');
      sep.className = 'info-separateur';
      sep.innerHTML = '<hr>';
      container.appendChild(sep);
    }
  });

  // Ajouter le comportement "X" pour supprimer
  container.querySelectorAll('.delete-x').forEach(x => {
    x.onclick = () => {
      x.parentElement.remove();
      saveInfosContent();
    };
  });
}
