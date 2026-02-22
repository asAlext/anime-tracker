// Clé unique pour localStorage
const CLE_STORAGE = 'mesAnimesTracker';

// Tableau global
let items = [];

// Cache pour les posters
const posterCache = {};

// Élément preview
const posterPreview = document.getElementById('poster-preview');
const posterImg = document.getElementById('poster-img');

// Fonction pour récupérer le poster
async function getPosterUrl(nom, customPoster = null) {
  if (customPoster && customPoster.trim() !== '') {
    return customPoster;
  }

  if (posterCache[nom]) return posterCache[nom];

  try {
    const response = await fetch(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(nom)}&limit=1&sfw=true`);
    if (!response.ok) return null;

    const data = await response.json();
    const anime = data.data?.[0];
    if (!anime?.images?.jpg?.large_image_url) return null;

    posterCache[nom] = anime.images.jpg.large_image_url;
    return posterCache[nom];
  } catch (err) {
    console.warn('Erreur Jikan API pour', nom, err);
    return null;
  }
}

// Affichage du poster au hover
function showPoster(event) {
  const target = event.target;
  const nomElement = target.closest('.item-nom, .sub-nom');
  if (!nomElement) return;

  const nom = nomElement.textContent.trim();
  if (!nom) return;

  const customPoster = nomElement.dataset.posterUrl || null;

  getPosterUrl(nom, customPoster).then(url => {
    if (!url) return;
    posterImg.src = url;
    posterPreview.style.display = 'block';
    posterPreview.style.opacity = '1';

    const offsetX = 20;
    const offsetY = -320;

    let posX = event.clientX + offsetX;
    let posY = event.clientY + offsetY;

    if (posY < 10) posY = 10;
    if (posY + 300 > window.innerHeight) {
      posY = event.clientY - 320;
    }

    posterPreview.style.left = posX + 'px';
    posterPreview.style.top = posY + 'px';
  });
}

function hidePoster() {
  posterPreview.style.opacity = '0';
  setTimeout(() => {
    if (posterPreview.style.opacity === '0') {
      posterPreview.style.display = 'none';
      posterImg.src = '';
    }
  }, 250);
}

// Charger les données
function chargerDonnees() {
  const data = localStorage.getItem(CLE_STORAGE);
  items = data ? JSON.parse(data) : [];
  afficherListe();
  mettreAJourCompteurs();
}

// Sauvegarder
function sauvegarder() {
  localStorage.setItem(CLE_STORAGE, JSON.stringify(items));
}

// Mise à jour des compteurs
function mettreAJourCompteurs() {
  const total = items.length;
  const counts = {
    fini: 0,
    abandon: 0,
    'en pause': 0,
    'a regarder': 0,
    'en cours': 0,
    'plus jamais': 0
  };

  items.forEach(item => {
    const s = item.statut.toLowerCase();
    if (counts.hasOwnProperty(s)) {
      counts[s]++;
    }
  });

  document.getElementById('count-total').textContent = total;
  document.getElementById('count-fini').textContent = counts.fini;
  document.getElementById('count-en-cours').textContent = counts['en cours'];
  document.getElementById('count-en-pause').textContent = counts['en pause'];
  document.getElementById('count-a-regarder').textContent = counts['a regarder'];
  document.getElementById('count-abandon').textContent = counts.abandon;
  document.getElementById('count-plus-jamais').textContent = counts['plus jamais'];
}

// Afficher la liste
function afficherListe(filtreNom = '') {
  const ul = document.getElementById('liste');
  ul.innerHTML = '';

  const rechercheLower = filtreNom.toLowerCase();

  let resultat = items.filter(item =>
    item.nom.toLowerCase().includes(rechercheLower)
  );

  const filtreStatut = document.getElementById('filtre-statut')?.value || '';
  if (filtreStatut) {
    resultat = resultat.filter(item => item.statut === filtreStatut);
  }

  const filtreType = document.getElementById('filtre-type')?.value || '';
  if (filtreType) {
    resultat = resultat.filter(item => item.type === filtreType);
  }

  const triNom = document.getElementById('tri-nom')?.value || '';
  const triNote = document.getElementById('tri-note')?.value || '';

  let typeTri = '';
  let ordre = '';

  if (triNote) {
    typeTri = 'note';
    ordre = triNote;
  } else if (triNom) {
    typeTri = 'nom';
    ordre = triNom;
  }

  if (typeTri === 'nom') {
    resultat.sort((a, b) => {
      const nomA = a.nom.toLowerCase();
      const nomB = b.nom.toLowerCase();
      return ordre === 'asc' ? nomA.localeCompare(nomB) : nomB.localeCompare(nomA);
    });
  } else if (typeTri === 'note') {
    resultat.sort((a, b) => {
      // Gestion NA pour le tri par note (NA = -1 pour les mettre en bas)
      const noteA = a.note === "NA" ? -1 : a.note;
      const noteB = b.note === "NA" ? -1 : b.note;
      return ordre === 'asc' ? noteA - noteB : noteB - noteA;
    });
  }

  if (resultat.length === 0) {
    document.getElementById('message-vide').style.display = 'block';
  } else {
    document.getElementById('message-vide').style.display = 'none';

    resultat.forEach((item) => {
      const indexOriginal = items.indexOf(item);

      const li = document.createElement('li');
      li.className = item.hasSubMenu ? 'li' : '';

      li.innerHTML = `
        <div class="main-row">
          <span class="item-nom" data-poster-url="${item.posterUrl || ''}">${item.nom}</span>
          <div class="right-fixed">
            <span class="item-statut">${item.statut}</span>
            <span class="item-type">${item.type}</span>
            <span class="item-note">Note : ${item.note === "NA" ? "NA" : Number(item.note) + "/10"}</span>
            <div class="actions">
              <button onclick="editerItem(${indexOriginal})">Modifier</button>
              <button onclick="supprimerItem(${indexOriginal})">Supprimer</button>
              ${item.hasSubMenu ? `<span class="arrow" onclick="toggleSubMenu(this)">▼</span>` : ''}
            </div>
          </div>
        </div>

        ${item.hasSubMenu ? `
        <div class="sub-menu">
          <div class="sub-form">
            <input type="text" placeholder="Nom" class="sub-nom">
            <select class="sub-statut">
              <option value="fini">Fini</option>
              <option value="en cours">En cours</option>
              <option value="en pause">En pause</option>
              <option value="a regarder">A Regarder</option>
              <option value="abandon">Abandon</option>
              <option value="plus jamais">Plus Jamais</option>
            </select>
            <select class="sub-type">
              <option value="anime">Anime</option>
              <option value="film">Film</option>
            </select>
            <button onclick="ajouterSousItem(${indexOriginal}, this)">Ajouter entrée</button>
            <button onclick="ajouterSeparateur(${indexOriginal}, this)">Ajouter séparateur</button>
          </div>
          <div class="sub-list" id="sub-list-${indexOriginal}"></div>
        </div>` : ''}
      `;

      ul.appendChild(li);

      if (item.hasSubMenu) {
        renderSubItems(indexOriginal);
      }
    });
  }

  document.querySelectorAll('.item-nom, .sub-nom').forEach(el => {
    el.addEventListener('mouseenter', showPoster);
    el.addEventListener('mouseleave', hidePoster);
  });
}

// Les autres fonctions restent identiques (toggleSubMenu, ajouterSousItem, etc.)
function toggleSubMenu(arrow) {
  const li = arrow.closest('li');
  li.classList.toggle('expanded');
}

function ajouterSousItem(mainIndex, btn) {
  const subForm = btn.parentElement;
  const nom = subForm.querySelector('.sub-nom').value.trim();
  const statut = subForm.querySelector('.sub-statut').value;
  const type = subForm.querySelector('.sub-type').value;

  if (!nom) return alert("Le nom est obligatoire");

  if (!items[mainIndex].subItems) items[mainIndex].subItems = [];

  items[mainIndex].subItems.push({ id: Date.now(), nom, statut, type, isSeparator: false });

  sauvegarder();
  renderSubItems(mainIndex);
  subForm.querySelector('.sub-nom').value = '';
}

function ajouterSeparateur(mainIndex, btn) {
  if (!items[mainIndex].subItems) items[mainIndex].subItems = [];

  items[mainIndex].subItems.push({ id: Date.now(), isSeparator: true });

  sauvegarder();
  renderSubItems(mainIndex);
}

function renderSubItems(mainIndex) {
  const container = document.getElementById(`sub-list-${mainIndex}`);
  if (!container) return;
  container.innerHTML = '';

  const subItems = items[mainIndex].subItems || [];

  subItems.forEach((sub, i) => {
    const div = document.createElement('div');
    div.className = 'sub-item';
    if (sub.isSeparator) {
      div.innerHTML = `<div class="separator"></div>`;
    } else {
      div.innerHTML = `
        <span class="prefix">-</span>
        <span class="sub-nom" data-poster-url="${items[mainIndex].posterUrl || ''}">${sub.nom}</span>
        <span class="sub-statut">${sub.statut}</span>
        <span class="sub-type">${sub.type}</span>
        <button onclick="supprimerSousItem(${mainIndex}, ${i})" style="margin-left:10px;color:#ff6b6b;">×</button>
      `;
    }
    container.appendChild(div);
  });

  container.querySelectorAll('.sub-nom').forEach(el => {
    el.addEventListener('mouseenter', showPoster);
    el.addEventListener('mouseleave', hidePoster);
  });
}

function supprimerSousItem(mainIndex, subIndex) {
  if (confirm("Supprimer cette entrée du sous-menu ?")) {
    items[mainIndex].subItems.splice(subIndex, 1);
    sauvegarder();
    renderSubItems(mainIndex);
  }
}

// Ajout / Modification
document.getElementById('formAjout').addEventListener('submit', function(e) {
  e.preventDefault();

  const nom    = document.getElementById('nom').value.trim();
  const type   = document.getElementById('type').value;
  const statut = document.getElementById('statut').value;
  const noteValue = document.getElementById('note').value;
  const hasSubMenu = document.getElementById('hasSubMenu').checked;

  if (!nom || !type || !statut || !noteValue) return;

  let note;
  if (noteValue === "NA") {
    note = "NA";
  } else {
    note = parseFloat(noteValue);
    if (isNaN(note) || note < 0 || note > 10) {
      alert("La note doit être NA ou un nombre entre 0 et 10 (ex: 9.5)");
      return;
    }
  }

  const posterUrlInput = document.getElementById('posterUrl');
  const posterUrl = posterUrlInput ? posterUrlInput.value.trim() : '';

  const nouvelItem = { 
    nom, 
    type, 
    statut, 
    note: note,
    hasSubMenu, 
    posterUrl: posterUrl || undefined, 
    subItems: hasSubMenu ? [] : undefined 
  };

  const editIndex = this.dataset.editIndex;

  if (editIndex !== undefined) {
    items[parseInt(editIndex)] = nouvelItem;
    delete this.dataset.editIndex;
    document.getElementById('btnAnnulerEdit').style.display = 'none';
  } else {
    items.push(nouvelItem);
  }

  sauvegarder();
  afficherListe(document.getElementById('recherche').value);
  mettreAJourCompteurs();
  this.reset();
  document.getElementById('hasSubMenu').checked = false;
  if (posterUrlInput) posterUrlInput.value = '';
});

// Edition
function editerItem(index) {
  const item = items[index];
  document.getElementById('nom').value = item.nom;
  document.getElementById('type').value = item.type;
  document.getElementById('statut').value = item.statut;

  // Gestion note dans le select
  document.getElementById('note').value = item.note === "NA" ? "NA" : item.note;

  document.getElementById('hasSubMenu').checked = !!item.hasSubMenu;

  const posterUrlInput = document.getElementById('posterUrl');
  if (posterUrlInput) {
    posterUrlInput.value = item.posterUrl || '';
  }

  document.getElementById('formAjout').dataset.editIndex = index;
  document.getElementById('btnAnnulerEdit').style.display = 'inline';
}

document.getElementById('btnAnnulerEdit').addEventListener('click', function() {
  document.getElementById('formAjout').reset();
  delete document.getElementById('formAjout').dataset.editIndex;
  this.style.display = 'none';
  document.getElementById('hasSubMenu').checked = false;
});

function supprimerItem(index) {
  if (!confirm('Supprimer cet élément ?')) return;
  items.splice(index, 1);
  sauvegarder();
  afficherListe(document.getElementById('recherche').value);
  mettreAJourCompteurs();
}

// Événements
document.getElementById('recherche').addEventListener('input', function() {
  afficherListe(this.value);
});

document.getElementById('filtre-statut').addEventListener('change', function() {
  afficherListe(document.getElementById('recherche').value);
});

document.getElementById('filtre-type').addEventListener('change', function() {
  afficherListe(document.getElementById('recherche').value);
});

document.getElementById('tri-nom').addEventListener('change', function() {
  document.getElementById('tri-note').value = '';
  afficherListe(document.getElementById('recherche').value);
});

document.getElementById('tri-note').addEventListener('change', function() {
  document.getElementById('tri-nom').value = '';
  afficherListe(document.getElementById('recherche').value);
});

// Export
document.getElementById('exporter').addEventListener('click', function() {
  const data = localStorage.getItem(CLE_STORAGE);
  if (!data) return alert('Aucune donnée à exporter');

  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'mon-tracker-animes.json';
  a.click();
  URL.revokeObjectURL(url);
});

// Import
document.getElementById('importer').addEventListener('click', function() {
  const fileInput = document.getElementById('importeur');
  const file = fileInput.files[0];
  if (!file) return alert('Sélectionne un fichier JSON');

  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const data = JSON.parse(e.target.result);
      if (!Array.isArray(data)) throw new Error('Pas un tableau valide');
      items = data;
      sauvegarder();
      afficherListe();
      mettreAJourCompteurs();
      alert('Import réussi !');
      fileInput.value = '';
    } catch (err) {
      alert('Erreur : fichier invalide ou corrompu\n' + err.message);
    }
  };
  reader.readAsText(file);
});

// Démarrage
chargerDonnees();
