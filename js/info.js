// info.js – Boutons fonctionnels à droite de la cover (jusqu'au bord)

function showInfosPage(animeData) {
  console.log("showInfosPage appelé avec :", animeData);

  // Switch vers la page Infos
  document.querySelectorAll('.page').forEach(page => page.style.display = 'none');
  const pageInfos = document.getElementById('page-infos');
  pageInfos.style.display = 'block';

  // Cover à gauche (exactement comme avant, ne pas toucher)
  const cover = document.getElementById('infos-cover-anime');
  if (cover) {
    cover.src = animeData.urlCover || 'https://placehold.co/420x590?text=Cover+Anime';
    cover.style.width = '420px';
    cover.style.height = '590px';
    cover.style.objectFit = 'cover';
    cover.style.marginTop = '80px';
  }

  // === ZONE À DROITE DE LA COVER (jusqu'au bord) ===
  let rightZone = document.getElementById('infos-right-zone');
  if (!rightZone) {
    // Création unique de la zone droite
    rightZone = document.createElement('div');
    rightZone.id = 'infos-right-zone';
    rightZone.style.flex = '1';
    rightZone.style.paddingLeft = '40px';
    rightZone.style.display = 'flex';
    rightZone.style.flexDirection = 'column';
    rightZone.style.gap = '20px';

    // Toolbar des 4 boutons (en haut à droite)
    const toolbar = document.createElement('div');
    toolbar.style.display = 'flex';
    toolbar.style.gap = '15px';
    toolbar.style.flexWrap = 'wrap';

    const btnRetour = document.createElement('button');
    btnRetour.textContent = 'Retour';
    btnRetour.style.padding = '10px 20px';
    btnRetour.onclick = () => {
      pageInfos.style.display = 'none';
      document.getElementById('page-detail').style.display = 'block';
    };

    const btnTitre = document.createElement('button');
    btnTitre.textContent = 'Titre';
    btnTitre.style.padding = '10px 20px';
    btnTitre.onclick = () => addInfoLine(animeData.nom, 'titre', rightZone);

    const btnPlus = document.createElement('button');
    btnPlus.textContent = '+1';
    btnPlus.style.padding = '10px 20px';
    btnPlus.onclick = () => addInfoLine(animeData.nom, 'entree', rightZone);

    const btnSeparateur = document.createElement('button');
    btnSeparateur.textContent = 'Séparateur';
    btnSeparateur.style.padding = '10px 20px';
    btnSeparateur.onclick = () => addInfoLine(animeData.nom, 'separateur', rightZone);

    toolbar.append(btnRetour, btnTitre, btnPlus, btnSeparateur);
    rightZone.appendChild(toolbar);

    // Zone où les lignes (titre / +1 / séparateur) s’ajoutent
    const contentArea = document.createElement('div');
    contentArea.id = 'infos-content-area';
    rightZone.appendChild(contentArea);

    // Ajout de la zone droite dans la page
    pageInfos.querySelector('.detail-content').style.display = 'flex';
    pageInfos.querySelector('.detail-content').appendChild(rightZone);
  }

  // Chargement des lignes déjà sauvegardées
  loadInfoLines(animeData.nom, document.getElementById('infos-content-area'));
}

// Ajoute une ligne (titre, entrée ou séparateur)
function addInfoLine(nomAnime, type, container) {
  const lines = JSON.parse(localStorage.getItem('animeInfos') || '{}');
  if (!lines[nomAnime]) lines[nomAnime] = [];

  if (type === 'titre') {
    lines[nomAnime].push({ type: 'titre', texte: 'Nouveau titre' });
  } else if (type === 'entree') {
    lines[nomAnime].push({ type: 'entree', nom: '', type: 'Anime', statut: 'En Cours' });
  } else if (type === 'separateur') {
    lines[nomAnime].push({ type: 'separateur' });
  }

  localStorage.setItem('animeInfos', JSON.stringify(lines));
  loadInfoLines(nomAnime, container);
}

// Charge et affiche toutes les lignes
function loadInfoLines(nomAnime, container) {
  container.innerHTML = '';
  const lines = JSON.parse(localStorage.getItem('animeInfos') || '{}')[nomAnime] || [];

  lines.forEach((item, index) => {
    const ligne = document.createElement('div');
    ligne.style.display = 'flex';
    ligne.style.alignItems = 'center';
    ligne.style.gap = '15px';
    ligne.style.marginBottom = '15px';

    if (item.type === 'titre') {
      const input = document.createElement('input');
      input.type = 'text';
      input.value = item.texte || '';
      input.style.fontSize = '22px';
      input.style.fontWeight = 'bold';
      input.style.flex = '1';
      input.onchange = () => {
        item.texte = input.value;
        saveInfoLines(nomAnime);
      };
      ligne.appendChild(input);
    } else if (item.type === 'entree') {
      const nomInput = document.createElement('input');
      nomInput.type = 'text';
      nomInput.value = item.nom || '';
      nomInput.style.flex = '1';
      nomInput.onchange = () => { item.nom = nomInput.value; saveInfoLines(nomAnime); };

      const typeSelect = document.createElement('select');
      ['Anime', 'Film', 'OVA'].forEach(val => {
        const opt = document.createElement('option');
        opt.value = val;
        opt.textContent = val;
        if (val === item.type) opt.selected = true;
        typeSelect.appendChild(opt);
      });
      typeSelect.onchange = () => { item.type = typeSelect.value; saveInfoLines(nomAnime); };

      const statutSelect = document.createElement('select');
      ['Terminé', 'En Cours', 'En Pause', 'A Regarder'].forEach(val => {
        const opt = document.createElement('option');
        opt.value = val;
        opt.textContent = val;
        if (val === item.statut) opt.selected = true;
        statutSelect.appendChild(opt);
      });
      statutSelect.onchange = () => { item.statut = statutSelect.value; saveInfoLines(nomAnime); };

      ligne.append(nomInput, typeSelect, statutSelect);
    } else if (item.type === 'separateur') {
      ligne.innerHTML = '<hr style="flex:1; border:none; border-top:8px solid #ccc; margin:30px 0;">';
    }

    // Bouton supprimer (X)
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '×';
    deleteBtn.style.fontSize = '24px';
    deleteBtn.style.color = '#ff4444';
    deleteBtn.style.border = 'none';
    deleteBtn.style.background = 'transparent';
    deleteBtn.style.cursor = 'pointer';
    deleteBtn.onclick = () => {
      lines.splice(index, 1);
      localStorage.setItem('animeInfos', JSON.stringify(lines));
      loadInfoLines(nomAnime, container);
    };
    ligne.appendChild(deleteBtn);

    container.appendChild(ligne);
  });
}

function saveInfoLines(nomAnime) {
  // Sauvegarde automatique après modification
  const lines = JSON.parse(localStorage.getItem('animeInfos') || '{}');
  localStorage.setItem('animeInfos', JSON.stringify(lines));
}
