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

    const detailLeft = document.querySelector('.detail-left');
    if (detailLeft) {
      const existingInfo = detailLeft.querySelector('.detail-anime-info');
      if (existingInfo) existingInfo.remove();
      detailLeft.appendChild(infoWrapper);
    }

    // === SOUS-MENU : on l'ajoute juste après les infos anime ===
    if (animeData.nom) {
      renderSousMenu(animeData.nom, detailLeft);
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

// === FONCTION SOUS-MENU (à placer ici ou dans un fichier séparé) ===
function renderSousMenu(nomAnime, parentContainer) {
  // On crée un conteneur juste après les infos
  let sousMenuContainer = document.getElementById('sous-menu-container');
  if (sousMenuContainer) sousMenuContainer.remove(); // évite doublons

  sousMenuContainer = document.createElement('div');
  sousMenuContainer.id = 'sous-menu-container';
  sousMenuContainer.style.marginTop = '30px';
  sousMenuContainer.style.padding = '15px';
  sousMenuContainer.style.background = '#f8f9fa';
  sousMenuContainer.style.borderRadius = '8px';
  sousMenuContainer.style.border = '1px solid #ddd';

  // Barre d'outils fixe
  const toolbar = document.createElement('div');
  toolbar.style.display = 'flex';
  toolbar.style.gap = '12px';
  toolbar.style.marginBottom = '20px';
  toolbar.style.flexWrap = 'wrap';

  const btnTitre = document.createElement('button');
  btnTitre.textContent = '+ Titre';
  btnTitre.style.padding = '8px 16px';
  btnTitre.onclick = () => addSousMenuItem(nomAnime, 'titre');

  const btnAjout = document.createElement('button');
  btnAjout.textContent = 'Ajouter entrée';
  btnAjout.style.padding = '8px 16px';
  btnAjout.onclick = () => addSousMenuItem(nomAnime, 'entree');

  const btnSeparateur = document.createElement('button');
  btnSeparateur.textContent = 'Séparateur';
  btnSeparateur.style.padding = '8px 16px';
  btnSeparateur.onclick = () => addSousMenuItem(nomAnime, 'separateur');

  toolbar.appendChild(btnTitre);
  toolbar.appendChild(btnAjout);
  toolbar.appendChild(btnSeparateur);
  sousMenuContainer.appendChild(toolbar);

  // Zone contenu
  const content = document.createElement('div');
  content.id = 'sous-menu-content';
  sousMenuContainer.appendChild(content);

  parentContainer.appendChild(sousMenuContainer);

  // Charge et affiche les items existants
  loadSousMenuItems(nomAnime, content);
}

// Ajoute un item (titre, entrée, séparateur)
function addSousMenuItem(nomAnime, type) {
  let sousMenus = JSON.parse(localStorage.getItem('sousMenus') || '{}');
  if (!sousMenus[nomAnime]) sousMenus[nomAnime] = [];

  let item;
  if (type === 'titre') {
    const texte = prompt("Titre du groupe (ex: Trame principale) :");
    if (!texte) return;
    item = { type: 'titre', texte };
  } else if (type === 'entree') {
    const nom = prompt("Nom de l'œuvre :");
    if (!nom) return;
    const typeVal = prompt("Type (Anime, Film, OAV) :", "Anime");
    if (!['Anime', 'Film', 'OAV'].includes(typeVal)) return alert("Type invalide.");
    const statut = prompt("Statut (Terminé, En Cours, En Pause, A Regarder) :", "En Cours");
    if (!['Terminé', 'En Cours', 'En Pause', 'A Regarder'].includes(statut)) return alert("Statut invalide.");
    item = { type: 'entree', nom, type: typeVal, statut };
  } else if (type === 'separateur') {
    item = { type: 'separateur' };
  }

  sousMenus[nomAnime].push(item);
  localStorage.setItem('sousMenus', JSON.stringify(sousMenus));

  // Re-render le contenu
  const content = document.getElementById('sous-menu-content');
  if (content) loadSousMenuItems(nomAnime, content);
}

// Charge et affiche les items
function loadSousMenuItems(nomAnime, container) {
  container.innerHTML = '';
  const sousMenus = JSON.parse(localStorage.getItem('sousMenus') || '{}');
  const items = sousMenus[nomAnime] || [];

  items.forEach((item, index) => {
    const ligne = document.createElement('div');
    ligne.style.position = 'relative';
    ligne.style.padding = '10px 0';
    ligne.style.borderBottom = '1px solid #eee';

    // Bouton X au hover
    const x = document.createElement('span');
    x.textContent = '×';
    x.style.position = 'absolute';
    x.style.right = '0';
    x.style.top = '50%';
    x.style.transform = 'translateY(-50%)';
    x.style.color = 'red';
    x.style.fontSize = '22px';
    x.style.cursor = 'pointer';
    x.style.opacity = '0';
    x.style.transition = 'opacity 0.2s';
    x.onclick = () => {
      if (confirm('Supprimer cette ligne ?')) {
        items.splice(index, 1);
        sousMenus[nomAnime] = items;
        localStorage.setItem('sousMenus', JSON.stringify(sousMenus));
        loadSousMenuItems(nomAnime, container);
      }
    };

    ligne.onmouseenter = () => x.style.opacity = '1';
    ligne.onmouseleave = () => x.style.opacity = '0';

    if (item.type === 'titre') {
      ligne.innerHTML = `<strong style="font-size: 22px;">${item.texte}</strong>`;
    } else if (item.type === 'entree') {
      ligne.innerHTML = `${item.nom} - <em>${item.type}</em> - ${item.statut}`;
    } else if (item.type === 'separateur') {
      ligne.innerHTML = '<hr style="border: none; border-top: 4px solid #aaa; margin: 25px 0;">';
    }

    ligne.appendChild(x);
    container.appendChild(ligne);
  });
}

// === Appel au chargement initial + quand on navigue ===
document.addEventListener('DOMContentLoaded', () => {
  // On ré-appelle quand on clique sur un nav-btn (car les cartes sont rechargées)
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      setTimeout(() => {
        const animeGrid = document.getElementById('anime-grid');
        if (animeGrid) {
          const cartes = animeGrid.querySelectorAll('.anime-card');
          cartes.forEach(card => {
            const nom = card.textContent.trim();
            const sousMenus = JSON.parse(localStorage.getItem('sousMenus') || '{}');
            if (sousMenus[nom] && sousMenus[nom].length > 0) {
              let star = card.querySelector('.sous-menu-star');
              if (!star) {
                star = document.createElement('span');
                star.className = 'sous-menu-star';
                star.textContent = '*';
                star.style.position = 'absolute';
                star.style.top = '5px';
                star.style.right = '5px';
                star.style.color = 'red';
                star.style.fontSize = '24px';
                star.style.fontWeight = 'bold';
                star.style.zIndex = '10';
                card.querySelector('.img-wrapper').style.position = 'relative';
                card.querySelector('.img-wrapper').appendChild(star);
              }
            }
          });
        }
      }, 300); // petit délai pour laisser le DOM se mettre à jour
    });
  });
});

// === Suppression automatique du sous-menu quand on supprime l'anime ===
function deleteAnime(nomAnime) {
  if (!nomAnime || !confirm('Supprimer cet anime ? La waifu associée et le sous-menu seront aussi supprimés.')) return;

  let animes = JSON.parse(localStorage.getItem('animes') || '[]');
  animes = animes.filter(a => a.nom !== nomAnime);
  localStorage.setItem('animes', JSON.stringify(animes));

  let waifus = JSON.parse(localStorage.getItem('waifus') || '[]');
  waifus = waifus.filter(w => w.animeAssocie !== nomAnime);
  localStorage.setItem('waifus', JSON.stringify(waifus));

  // Suppression du sous-menu
  let sousMenus = JSON.parse(localStorage.getItem('sousMenus') || '{}');
  delete sousMenus[nomAnime];
  localStorage.setItem('sousMenus', JSON.stringify(sousMenus));

  location.reload();
}

// (le reste du fichier reste inchangé)
