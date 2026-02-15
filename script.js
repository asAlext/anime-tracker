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

// Afficher la liste (avec filtres si recherche)
function afficherListe(filtre = '') {
  const ul = document.getElementById('liste');
  ul.innerHTML = '';

  const rechercheLower = filtre.toLowerCase();

  items
    .filter(item => item.nom.toLowerCase().includes(rechercheLower))
    .forEach((item, index) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <strong>${item.nom}</strong> 
        (${item.type}) — 
        Statut : ${item.statut} — 
        Note : ${item.note}/10
        <button onclick="editerItem(${index})">Modifier</button>
        <button onclick="supprimerItem(${index})">Supprimer</button>
      `;
      ul.appendChild(li);
    });
}

// Ajouter ou modifier
document.getElementById('formAjout').addEventListener('submit', function(e) {
  e.preventDefault();

  const nom = document.getElementById('nom').value.trim();
  const type = document.getElementById('type').value;
  const statut = document.getElementById('statut').value;
  const note = document.getElementById('note').value;

  if (!nom || !type || !statut || !note) return;

  const editIndex = this.dataset.editIndex; // Si en mode édition

  const nouvelItem = { nom, type, statut, note: parseInt(note) };

  if (editIndex !== undefined) {
    // Mode édition
    items[parseInt(editIndex)] = nouvelItem;
    delete this.dataset.editIndex;
    document.getElementById('btnAnnulerEdit').style.display = 'none';
  } else {
    // Ajout normal
    items.push(nouvelItem);
  }

  sauvegarder();
  afficherListe(document.getElementById('recherche').value);
  this.reset(); // Vide le formulaire
});

// Mode édition : remplir le formulaire
function editerItem(index) {
  const item = items[index];
  document.getElementById('nom').value = item.nom;
  document.getElementById('type').value = item.type;
  document.getElementById('statut').value = item.statut;
  document.getElementById('note').value = item.note;

  document.getElementById('formAjout').dataset.editIndex = index;
  document.getElementById('btnAnnulerEdit').style.display = 'inline';
}

// Annuler édition
document.getElementById('btnAnnulerEdit').addEventListener('click', function() {
  document.getElementById('formAjout').reset();
  delete document.getElementById('formAjout').dataset.editIndex;
  this.style.display = 'none';
});

// Supprimer
function supprimerItem(index) {
  if (confirm('Supprimer cet élément ?')) {
    items.splice(index, 1);
    sauvegarder();
    afficherListe(document.getElementById('recherche').value);
  }
}

// Recherche en temps réel
document.getElementById('recherche').addEventListener('input', function() {
  afficherListe(this.value);
});

// Export JSON
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

// Import JSON
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
      fileInput.value = ''; // Reset input file
    } catch (err) {
      alert('Erreur : fichier invalide ou corrompu (' + err.message + ')');
    }
  };
  reader.readAsText(file);
});

// Démarrage
chargerDonnees();
