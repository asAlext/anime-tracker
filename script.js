// Clé unique pour localStorage
const CLE_STORAGE = 'mesAnimesTracker';

// Tableau global
let items = [];

// Charger les données au démarrage
function chargerDonnees() {
  const data = localStorage.getItem(CLE_STORAGE);
  items = data ? JSON.parse(data) : [];
  afficherListe();
}

// Sauvegarder dans localStorage
function sauvegarder() {
  localStorage.setItem(CLE_STORAGE, JSON.stringify(items));
}

// Afficher la liste
function afficherListe(filtreNom = '') {
  const ul = document.getElementById('liste');
  ul.innerHTML = '';

  const rechercheLower = filtreNom.toLowerCase();

  // 1. Filtre par nom (recherche texte)
  let resultat = items.filter(item =>
    item.nom.toLowerCase().includes(rechercheLower)
  );

  // 2. Filtre par statut (nouveau)
  const filtreStatut = document.getElementById('filtre-statut')?.value || '';
  if (filtreStatut) {
    resultat = resultat.filter(item => item.statut === filtreStatut);
  }

  // 3. Tri
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
      return ordre === 'asc'
        ? nomA.localeCompare(nomB)
        : nomB.localeCompare(nomA);
    });
  } else if (typeTri === 'note') {
    resultat.sort((a, b) => {
      return ordre === 'asc'
        ? a.note - b.note
        : b.note - a.note;
    });
  }

  // Affichage
  if (resultat.length === 0) {
    document.getElementById('message-vide').style.display = 'block';
  } else {
    document.getElementById('message-vide').style.display = 'none';

    resultat.forEach((item) => {
      const indexOriginal = items.indexOf(item);

      const li = document.createElement('li');
      li.innerHTML = `
        <div class="info-container">
          <span class="item-nom">${item.nom}</span>
          <div class="milieu-statut">
            <span class="item-statut">${item.statut}</span>
            <span class="item-type">${item.type}</span>
          </div>
          <span class="item-note">Note : ${item.note}/10</span>
        </div>
        <div class="actions">
          <button onclick="editerItem(${indexOriginal})">Modifier</button>
          <button onclick="supprimerItem(${indexOriginal})">Supprimer</button>
        </div>
      `;

      ul.appendChild(li);
    });
  }
}

// Ajouter ou modifier
document.getElementById('formAjout').addEventListener('submit', function(e) {
  e.preventDefault();

  const nom    = document.getElementById('nom').value.trim();
  const type   = document.getElementById('type').value;
  const statut = document.getElementById('statut').value;
  const note   = document.getElementById('note').value;

  if (!nom || !type || !statut || !note) return;

  const nouvelItem = { nom, type, statut, note: parseInt(note) };

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
  this.reset();
});

// Edition
function editerItem(index) {
  const item = items[index];
  document.getElementById('nom').value    = item.nom;
  document.getElementById('type').value   = item.type;
  document.getElementById('statut').value = item.statut;
  document.getElementById('note').value   = item.note;

  document.getElementById('formAjout').dataset.editIndex = index;
  document.getElementById('btnAnnulerEdit').style.display = 'inline';
}

document.getElementById('btnAnnulerEdit').addEventListener('click', function() {
  document.getElementById('formAjout').reset();
  delete document.getElementById('formAjout').dataset.editIndex;
  this.style.display = 'none';
});

// Suppression
function supprimerItem(index) {
  if (!confirm('Supprimer cet élément ?')) return;
  
  items.splice(index, 1);
  sauvegarder();
  afficherListe(document.getElementById('recherche').value);
}

// Recherche par nom (temps réel)
document.getElementById('recherche').addEventListener('input', function() {
  afficherListe(this.value);
});

// Filtre par statut
document.getElementById('filtre-statut').addEventListener('change', function() {
  afficherListe(document.getElementById('recherche').value);
});

// Tri par nom
document.getElementById('tri-nom').addEventListener('change', function() {
  document.getElementById('tri-note').value = '';
  afficherListe(document.getElementById('recherche').value);
});

// Tri par note
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
