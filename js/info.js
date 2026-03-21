// info.js – Gestion de la page "Infos" avancée

function showInfoPage() {
  const infoPage = document.getElementById('page-infos');
  if (!infoPage) {
    console.error('Page infos non trouvée');
    return;
  }

  // Switch page
  document.querySelectorAll('.page').forEach(p => p.style.display = 'none');
  infoPage.style.display = 'block';

  // Récupérer l'item depuis le stockage temporaire
  const stored = localStorage.getItem('tempDetailItem');
  if (!stored) {
    console.error('Aucun anime/waifu sélectionné');
    return;
  }
  const item = JSON.parse(stored);
  const isAnime = item.isAnime;
  const data = isAnime ? item : /* waifu → trouve l'anime associé si besoin */;

  // Cover (exactement comme detail-page.js)
  const coverContainer = document.querySelector('.detail-left') || infoPage.querySelector('#cover-container');
  if (coverContainer) {
    coverContainer.innerHTML = ''; // reset si besoin
    const img = document.createElement('img');
    const coverUrl = data.urlCover || (isAnime 
      ? 'https://placehold.co/420x590?text=Cover+Anime'
      : 'https://placehold.co/260x365?text=Cover+Waifu');
    img.src = coverUrl;
    img.style.width = isAnime ? '420px' : '260px';
    img.style.height = isAnime ? '590px' : '365px';
    img.style.objectFit = 'cover';
    coverContainer.appendChild(img);
  }

  // Zone boutons haut (même style que detail-page)
  const actionsContainer = document.querySelector('#info-actions') || createActionsContainer();
  actionsContainer.innerHTML = '';

  // Bouton Retour (position symétrique au bouton Infos)
  const backBtn = document.createElement('button');
  backBtn.textContent = '← Retour';
  backBtn.style.marginRight = '10px';
  backBtn.style.padding = '8px 16px';
  backBtn.style.backgroundColor = '#f8f9fa';
  backBtn.style.color = '#212529';
  backBtn.style.border = '1px solid #6c757d';
  backBtn.style.borderRadius = '6px';
  backBtn.style.cursor = 'pointer';
  backBtn.style.fontSize = '14px';
  backBtn.style.fontWeight = '500';
  backBtn.onclick = () => {
    document.querySelectorAll('.page').forEach(p => p.style.display = 'none');
    document.getElementById('page-detail').style.display = 'block';
    // Optionnel : localStorage.removeItem('tempDetailItem');
  };
  actionsContainer.appendChild(backBtn);

  // Boutons Ajout
  ['Titre', '+1', 'Séparateur'].forEach(label => {
    const btn = document.createElement('button');
    btn.textContent = label;
    btn.style.marginRight = '10px';
    btn.style.padding = '8px 16px';
    btn.style.backgroundColor = '#f8f9fa';
    btn.style.color = '#212529';
    btn.style.border = '1px solid #6c757d';
    btn.style.borderRadius = '6px';
    btn.style.cursor = 'pointer';
    btn.style.fontSize = '14px';
    btn.style.fontWeight = '500';
    btn.onclick = () => addEntry(label);
    actionsContainer.appendChild(btn);
  });

  // Container des entrées (à droite)
  let entriesContainer = document.getElementById('info-entries');
  if (!entriesContainer) {
    entriesContainer = document.createElement('div');
    entriesContainer.id = 'info-entries';
    entriesContainer.style.display = 'flex';
    entriesContainer.style.flexDirection = 'column';
    entriesContainer.style.gap = '12px';
    entriesContainer.style.maxWidth = '600px';
    entriesContainer.style.marginLeft = '40px'; // espace après la cover
    const rightZone = document.querySelector('.detail-right') || infoPage;
    rightZone.appendChild(entriesContainer);
  }
  entriesContainer.innerHTML = ''; // reset pour recharger si besoin

  // Fonction ajout entrée
  function addEntry(type) {
    const entry = document.createElement('div');
    entry.className = 'info-entry';
    entry.style.display = 'flex';
    entry.style.alignItems = 'flex-start';
    entry.style.gap = '12px';
    entry.style.padding = '8px';
    entry.style.borderRadius = '6px';
    entry.style.position = 'relative';
    entry.style.backgroundColor = 'rgba(0,0,0,0.02)'; // léger fond au hover possible

    // Boutons réordonner (toujours visibles)
    const reorderDiv = document.createElement('div');
    reorderDiv.style.display = 'flex';
    reorderDiv.style.flexDirection = 'column';
    reorderDiv.style.gap = '2px';
    ['↑', '↓'].forEach(dir => {
      const b = document.createElement('button');
      b.textContent = dir;
      b.style.fontSize = '12px';
      b.style.padding = '2px 6px';
      b.style.minWidth = '24px';
      b.style.background = '#eee';
      b.style.border = '1px solid #ccc';
      b.style.borderRadius = '4px';
      b.style.cursor = 'pointer';
      b.onclick = () => moveEntry(entry, dir === '↑' ? -1 : 1);
      reorderDiv.appendChild(b);
    });
    entry.appendChild(reorderDiv);

    let content;
    if (type === 'Titre') {
      content = document.createElement('textarea');
      content.style.fontSize = '38px';
      content.style.fontWeight = 'bold';
      content.style.width = '100%';
      content.style.minHeight = '60px';
      content.style.border = '1px solid #ccc';
      content.style.borderRadius = '6px';
      content.style.padding = '8px';
      content.style.resize = 'vertical';
      content.placeholder = 'Titre principal ou arc...';
    } else if (type === '+1') {
      content = document.createElement('div');
      content.style.display = 'flex';
      content.style.gap = '12px';
      content.style.alignItems = 'center';
      content.style.flexWrap = 'wrap';
      content.style.width = '100%';

      const nameInput = document.createElement('textarea');
      nameInput.placeholder = 'Nom de la saison / film...';
      nameInput.style.flex = '2';
      nameInput.style.minHeight = '38px';
      nameInput.style.resize = 'vertical';

      const typeSelect = document.createElement('select');
      ['Anime', 'Film', 'OVA'].forEach(v => {
        const opt = document.createElement('option');
        opt.value = opt.textContent = v;
        if (v === 'Anime') opt.selected = true;
        typeSelect.appendChild(opt);
      });

      const statutSelect = document.createElement('select');
      ['Terminé', 'En Cours', 'En Pause', 'A Regarder'].forEach(v => {
        const opt = document.createElement('option');
        opt.value = opt.textContent = v;
        if (v === 'A Regarder') opt.selected = true;
        statutSelect.appendChild(opt);
      });

      content.append(nameInput, typeSelect, statutSelect);
    } else if (type === 'Séparateur') {
      content = document.createElement('div');
      content.style.height = '24px';
      content.style.width = '100%';
    }

    entry.appendChild(content);

    // X suppression (hover only)
    const deleteBtn = document.createElement('span');
    deleteBtn.textContent = '×';
    deleteBtn.style.position = 'absolute';
    deleteBtn.style.right = '8px';
    deleteBtn.style.top = '8px';
    deleteBtn.style.fontSize = '20px';
    deleteBtn.style.color = '#000';
    deleteBtn.style.cursor = 'pointer';
    deleteBtn.style.opacity = '0';
    deleteBtn.style.transition = 'opacity 0.2s';
    deleteBtn.onclick = () => entry.remove();

    entry.onmouseenter = () => { deleteBtn.style.opacity = '1'; };
    entry.onmouseleave = () => { deleteBtn.style.opacity = '0'; };

    entry.appendChild(deleteBtn);
    entriesContainer.appendChild(entry);
  }

  // Déplacer une entrée (réordonner)
  function moveEntry(entry, direction) {
    const siblings = [...entriesContainer.children];
    const idx = siblings.indexOf(entry);
    const newIdx = idx + direction;
    if (newIdx < 0 || newIdx >= siblings.length) return;
    if (direction === -1) {
      entriesContainer.insertBefore(entry, siblings[newIdx]);
    } else {
      entriesContainer.insertBefore(entry, siblings[newIdx].nextSibling);
    }
  }

  // Placeholder pour sauvegarde (à connecter plus tard à tes JSON)
  function saveEntries() {
    console.log('Sauvegarde à implémenter – voici les données actuelles :');
    const entries = [];
    entriesContainer.querySelectorAll('.info-entry').forEach(el => {
      // À toi de parser selon le type...
      entries.push({ /* ... */ });
    });
    // Exemple : localStorage.setItem('custom_' + data.nom, JSON.stringify(entries));
  }

  // Optionnel : appeler saveEntries() sur certains events si tu veux plus tard
}

// Création conteneur actions si pas existant
function createActionsContainer() {
  const cont = document.createElement('div');
  cont.id = 'info-actions';
  cont.style.display = 'flex';
  cont.style.gap = '8px';
  cont.style.marginBottom = '24px';
  cont.style.justifyContent = 'flex-start'; // ou flex-end selon ton layout
  const parent = document.querySelector('.detail-header') || document.getElementById('page-infos');
  parent.insertBefore(cont, parent.firstChild);
  return cont;
}

// Appel principal (à appeler quand on switch sur la page)
showInfoPage();
