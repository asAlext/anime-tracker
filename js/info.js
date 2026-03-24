// info.js – Boutons existants rendus fonctionnels (aucun bouton ajouté)

function showInfosPage(animeData) {
  console.log("showInfosPage appelé avec :", animeData);

  // Switch vers la page Infos
  document.querySelectorAll('.page').forEach(page => page.style.display = 'none');
  document.getElementById('page-infos').style.display = 'block';

  // Cover (même taille et position que page détail)
  const cover = document.getElementById('infos-cover-anime');
  if (cover) {
    cover.src = animeData.urlCover || 'https://placehold.co/420x590?text=Cover+Anime';
    cover.style.width = '420px';
    cover.style.height = '590px';
    cover.style.objectFit = 'cover';
    cover.style.marginTop = '80px';
  }

  // Zone de contenu à droite (jusqu'au bord)
  const rightZone = document.getElementById('infos-right-zone');
  if (rightZone) rightZone.style.display = 'flex';

  // === RENDRE TES 4 BOUTONS FONCTIONNELS ===
  const btnRetour = document.getElementById('btn-retour');
  const btnTitre = document.getElementById('btn-titre');
  const btnPlus = document.getElementById('btn-plus');
  const btnSeparateur = document.getElementById('btn-separateur');

  if (btnRetour) {
    btnRetour.onclick = () => {
      document.getElementById('page-infos').style.display = 'none';
      document.getElementById('page-detail').style.display = 'block';
    };
  }

  if (btnTitre) {
    btnTitre.onclick = () => addInfoLine(animeData.nom, 'titre');
  }

  if (btnPlus) {
    btnPlus.onclick = () => addInfoLine(animeData.nom, 'entree');
  }

  if (btnSeparateur) {
    btnSeparateur.onclick = () => addInfoLine(animeData.nom, 'separateur');
  }

  // Chargement des lignes déjà sauvegardées
  loadInfoLines(animeData.nom);
}

// Fonction pour ajouter une ligne (Titre, +1 ou Séparateur)
function addInfoLine(nomAnime, type) {
  let infos = JSON.parse(localStorage.getItem('animeInfos') || '{}');
  if (!infos[nomAnime]) infos[nomAnime] = [];

  if (type === 'titre') {
    infos[nomAnime].push({ type: 'titre', texte: 'Nouveau titre' });
  } else if (type === 'entree') {
    infos[nomAnime].push({ type: 'entree', nom: '', typeEntree: 'Anime', statut: 'En Cours' });
  } else if (type === 'separateur') {
    infos[nomAnime].push({ type: 'separateur' });
  }

  localStorage.setItem('animeInfos', JSON.stringify(infos));
  loadInfoLines(nomAnime);
}

// Chargement et affichage des lignes
function loadInfoLines(nomAnime) {
  const container = document.getElementById('infos-content-area');
  if (!container) return;
  container.innerHTML = '';

  const infos = JSON.parse(localStorage.getItem('animeInfos') || '{}')[nomAnime] || [];

  infos.forEach((item, index) => {
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
      ['Anime', 'Film', 'OVA'].forEach(v => {
        const opt = document.createElement('option');
        opt.value = v;
        opt.textContent = v;
        if (v === item.typeEntree) opt.selected = true;
        typeSelect.appendChild(opt);
      });
      typeSelect.onchange = () => { item.typeEntree = typeSelect.value; saveInfoLines(nomAnime); };

      const statutSelect = document.createElement('select');
      ['Terminé', 'En Cours', 'En Pause', 'A Regarder'].forEach(v => {
        const opt = document.createElement('option');
        opt.value = v;
        opt.textContent = v;
        if (v === item.statut) opt.selected = true;
        statutSelect.appendChild(opt);
      });
      statutSelect.onchange = () => { item.statut = statutSelect.value; saveInfoLines(nomAnime); };

      ligne.append(nomInput, typeSelect, statutSelect);
    } else if (item.type === 'separateur') {
      ligne.innerHTML = '<hr style="flex:1; border:none; border-top:6px solid #ccc; margin:25px 0;">';
    }

    // Bouton supprimer (X)
    const x = document.createElement('button');
    x.textContent = '×';
    x.style.fontSize = '26px';
    x.style.color = '#ff4444';
    x.style.border = 'none';
    x.style.background = 'transparent';
    x.style.cursor = 'pointer';
    x.onclick = () => {
      infos.splice(index, 1);
      localStorage.setItem('animeInfos', JSON.stringify(infos));
      loadInfoLines(nomAnime);
    };
    ligne.appendChild(x);

    container.appendChild(ligne);
  });
}

function saveInfoLines(nomAnime) {
  const infos = JSON.parse(localStorage.getItem('animeInfos') || '{}');
  localStorage.setItem('animeInfos', JSON.stringify(infos));
}
