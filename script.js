// Clé unique pour localStorage
const CLE_STORAGE = 'mesAnimesTracker';

// Tableau global
let items = [];

// Charger les données au démarrage
function chargerDonnees() {
  const data = localStorage.getItem(CLE_STORAGE);
  items = data ? JSON.parse(data) : [];
  afficherListe();          // affiche avec le tri par défaut
}

// Sauvegarder dans localStorage
function sauvegarder() {
  localStorage.setItem(CLE_STORAGE, JSON.stringify(items));
}

// =============================================
//            FONCTION PRINCIPALE D'AFFICHAGE
// =============================================
function afficherListe(filtre = '') {
  const ul = document.getElementById('liste');
  ul.innerHTML = '';

  const rechercheLower = filtre.toLowerCase();

  // On filtre d'abord
  let resultat = items.filter(item =>
    item.nom.toLowerCase().includes(rechercheLower)
  );

  // Puis on trie selon le critère actif
  const triActif = document.querySelector('.sort-btn.active');
  if (triActif) {
    const typeTri = triActif.dataset.type;   // "nom" ou "note"
    const ordre = triActif.dataset.ordre;    // "asc" ou "desc"

    if (typeTri === 'nom') {
      resultat.sort((a, b) => {
        const nomA = a.nom.toLowerCase();
        const nomB = b.nom.toLowerCase();
        return ordre === 'asc'
          ? nomA.localeCompare(nomB)
          : nomB.localeCompare(nomA);
      });
    }
    else if (typeTri === 'note') {
      resultat.sort((a, b) => {
        return ordre === 'asc'
          ? a.note - b.note
          : b.note - a.note;
      });
    }
  }

  // Affichage final
  if (resultat.length === 0) {
    document.getElementById('message-vide')?.style.setProperty('display', 'block');
  } else {
    document.getElementById('message-vide')?.style.setProperty('display', 'none');

    resultat.forEach((item) => {
      // On retrouve l'index ORIGINAL dans le tableau items
      // (important pour edit et delete)
      const indexOriginal = items.indexOf(item);

      const li = document.createElement('li');
      li.innerHTML = `
        <strong>${item.nom}</strong> 
        (${item.type}) — 
        ${item.statut} — 
        Note : ${item.note}/10
        <div class="actions">
          <button onclick="editerItem(${indexOriginal})">Modifier</button>
          <button onclick="supprimerItem(${indexOriginal})">Supprimer</button>
        </div>
      `;
      ul.appendChild(li);
    });
  }
}

// =============================================
//                  AJOUT / MODIFICATION
// =============================================
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
    // === Modification ===
    items[parseInt(editIndex)] = nouvelItem;
    delete this.dataset.editIndex;
    document.getElementById('btnAnnulerEdit').style.display = 'none';
  } else {
    // === Ajout ===
    items.push(nouvelItem);
  }

  sauvegarder();
  afficherListe(document.getElementById('recherche').value);
  this.reset();
});

// =============================================
//                  EDITION & SUPPRESSION
// =============================================
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

function supprimerItem(index) {
  if (!confirm('Supprimer cet élément ?')) return;
  
  items.splice(index, 1);
  sauvegarder();
  afficherListe(document.getElementById('recherche').value);
}

// =============================================
//               RECHERCHE TEMPS RÉEL
// =============================================
document.getElementById('recherche').addEventListener('input', function() {
  afficherListe(this.value);
});

// =============================================
//               GESTION DES BOUTONS DE TRI
// =============================================
document.querySelectorAll('.sort-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    // Retire la classe active à tous les boutons
    document.querySelectorAll('.sort-btn').forEach(b => b.classList.remove('active'));

    // Active le bouton cliqué
    this.classList.add('active');

    // On réaffiche avec le nouveau tri
    afficherListe(document.getElementById('recherche').value);
  });
});

// =============================================
//               EXPORT / IMPORT
// =============================================
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

// =============================================
//                   DÉMARRAGE
// =============================================
chargerDonnees();

// Par défaut on peut activer un tri (optionnel)
document.getElementById('sort-nom-asc')?.classList.add('active');
afficherListe();
