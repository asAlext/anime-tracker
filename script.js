// Clé unique pour localStorage
const CLE_STORAGE = 'mesAnimesTracker';

// Tableau global
let items = [];

// Cache pour les posters (évite de spammer l'API)
const posterCache = {};

// Élément preview
const posterPreview = document.getElementById('poster-preview');
const posterImg = document.getElementById('poster-img');

// Fonction pour récupérer le poster via Jikan API
async function getPosterUrl(nom) {
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

  getPosterUrl(nom).then(url => {
    if (!url) return;
    posterImg.src = url;
    posterPreview.style.display = 'block';
    posterPreview.style.opacity = '1';

    // Position près de la souris (décalage pour ne pas cacher le texte)
    const offsetX = 20;
    const offsetY = 20;
    posterPreview.style.left = (event.clientX + offsetX) + 'px';
    posterPreview.style.top = (event.clientY + offsetY) + 'px';
  });
}

function hidePoster() {
  posterPreview.style.opacity = '0';
  setTimeout(() => {
    if (posterPreview.style.opacity === '0') {
      posterPreview.style.display = 'none';
      posterImg.src = ''; // nettoie
    }
  }, 250); // après transition
}

// Charger les données au démarrage
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

// Mise à jour des compteurs (inchangé)
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

// Afficher la liste (inchangé sauf events hover à la fin)
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
      return ordre === 'asc' ? a.note - b.note : b.note - a.note;
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
          <span class="item-nom">${item.nom}</span>
          <div class="right-fixed">
            <span class="item-statut">${item.statut}</span>
            <span class="item-type">${item.type}</span>
            <span class="item-note">Note : ${Number(item.note)}/10</span>
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

  // Ajout des events hover UNE FOIS la liste affichée
  document.querySelectorAll('.item-nom, .sub-nom').forEach(el => {
    el.addEventListener('mouseenter', showPoster);
    el.addEventListener('mouseleave', hidePoster);
    // Option : mousemove si tu veux que l'image suive parfaitement
    // el.addEventListener('mousemove', showPoster);
  });
}

// Les autres fonctions restent identiques (toggleSubMenu, ajouterSousItem, etc.)
// ... (copie-colle le reste de ton script.js original ici : toggleSubMenu, ajouterSousItem, ajouterSeparateur, renderSubItems, supprimerSousItem, form submit, editerItem, btnAnnulerEdit, supprimerItem, events filtres/tris/recherche, export, import)

// Démarrage
chargerDonnees();
