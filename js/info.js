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

  // Chargement depuis le JSON principal 'animes'
  let animes = JSON.parse(localStorage.getItem('animes') || '[]');
  const anime = animes.find(a => a.nom === currentAnimeNom);
  const data = anime && anime.customInfos ? anime.customInfos : [];

  data.forEach((item) => {
    let ligne = document.createElement('div');

    if (item.type === 'titre') {
      ligne.className = 'info-ligne titre-ligne';
      ligne.innerHTML = `
        <textarea class="info-titre" placeholder="Titre libre..." style="border:none; font-weight:bold;">${item.texte || ''}</textarea>
        <span class="delete-x">×</span>
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
        <span class="delete-x">×</span>
      `;
    } else if (item.type === 'separateur') {
      ligne.className = 'info-separateur';
      ligne.innerHTML = `<div style="height: 60px;"></div><span class="delete-x">×</span>`;
    }

    container.appendChild(ligne);
    attachDeleteHandler(ligne);
  });
}

// Nouvelle fonction réutilisable pour gérer le X (hover + suppression)
function attachDeleteHandler(ligne) {
  const x = ligne.querySelector('.delete-x');
  if (!x) return;

  // Style du X
  x.style.opacity = '0';
  x.style.transition = 'opacity 0.2s ease';
  x.style.cursor = 'pointer';
  x.style.fontSize = '24px';
  x.style.color = '#000';
  x.style.marginLeft = '15px';
  x.style.userSelect = 'none';

  // Afficher le X uniquement au survol de la ligne entière
  ligne.addEventListener('mouseenter', () => {
    x.style.opacity = '1';
  });

  ligne.addEventListener('mouseleave', () => {
    x.style.opacity = '0';
  });

  // Suppression de la ligne au clic sur X
  x.addEventListener('click', function(e) {
    e.stopPropagation();
    ligne.remove();
    saveInfosContent();         // Sauvegarde après suppression
  });
}

function saveInfosContent() {
  console.log("🚀 saveInfosContent a été appelée !");

  if (!currentAnimeNom) {
    console.log("❌ currentAnimeNom est vide");
    return;
  }

  const container = document.getElementById('infos-content');
  console.log("Nombre d'éléments dans le container :", container.children.length);

  const data = [];

  Array.from(container.children).forEach((el, i) => {
    console.log(`Ligne ${i} → classe: ${el.className}`);

    if (el.classList.contains('titre-ligne')) {
      const txt = el.querySelector('textarea') ? el.querySelector('textarea').value : '';
      data.push({ type: 'titre', texte: txt });
    } else if (el.classList.contains('entree-ligne')) {
      data.push({ 
        type: 'entree', 
        nom: el.querySelector('.info-nom') ? el.querySelector('.info-nom').value : '',
        typeVal: el.querySelector('.info-type') ? el.querySelector('.info-type').value : 'Anime',
        statut: el.querySelector('.info-statut') ? el.querySelector('.info-statut').value : 'Terminé'
      });
    } else if (el.classList.contains('info-separateur')) {
      data.push({ type: 'separateur' });
    }
  });

  console.log("Données qui vont être sauvegardées :", data);

  let animes = JSON.parse(localStorage.getItem('animes') || '[]');
  const index = animes.findIndex(a => a.nom === currentAnimeNom);

  if (index !== -1) {
    animes[index].customInfos = data;
    localStorage.setItem('animes', JSON.stringify(animes));
    console.log("✅ Sauvegarde effectuée dans 'animes'");
  } else {
    console.log("❌ Anime non trouvé");
  }
}

// ====================== AJOUT DES NOUVELLES LIGNES ======================

function addTitre() {
  const container = document.getElementById('infos-content');
  const ligne = document.createElement('div');
  ligne.className = 'info-ligne titre-ligne';
  ligne.innerHTML = `<textarea class="info-titre" placeholder="Titre libre..." style="border:none; font-weight:bold;"></textarea><span class="delete-x">×</span>`;
  
  container.appendChild(ligne);
  attachDeleteHandler(ligne);   // ← Important : on attache le X sur la nouvelle ligne
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
  attachDeleteHandler(ligne);   // ← Important
  saveInfosContent();
}

function addSeparateur() {
  const container = document.getElementById('infos-content');
  const sep = document.createElement('div');
  sep.className = 'info-separateur';
  sep.innerHTML = `<div style="height: 60px;"></div><span class="delete-x">×</span>`;
  
  container.appendChild(sep);
  attachDeleteHandler(sep);     // ← Important
  saveInfosContent();
}
