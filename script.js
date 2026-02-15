// Clé unique pour localStorage
const CLE_STORAGE = 'mesAnimesTracker';

// Tableau global (contient TOUTES les entrées dans l'ordre d'ajout/original)
let items = [];

// Charger les données au démarrage
function chargerDonnees() {
  const data = localStorage.getItem(CLE_STORAGE);
  items = data ? JSON.parse(data) : [];
  afficherListe();  // affiche avec tri par défaut
}

// Sauvegarder dans localStorage
function sauvegarder() {
  localStorage.setItem(CLE_STORAGE, JSON.stringify(items));
}

// =============================================
//      FONCTION PRINCIPALE D'AFFICHAGE (filtre + tri)
// =============================================
function afficherListe(filtre = '') {
  const ul = document.getElementById('liste');
  if (!ul) return; // sécurité si élément absent

  ul.innerHTML = '';

  const rechercheLower = filtre.toLowerCase();

  // 1. Filtrer par recherche (sur nom)
  let resultat = items.filter(item =>
    item.nom.toLowerCase().includes(rechercheLower)
  );

  // 2. Appliquer le tri actif (priorité : note > nom)
  const selectNom  = document.getElementById('tri-nom');
  const selectNote = document.getElementById('tri-note');

  let typeTri = '';
  let ordre   = '';

  if (selectNote && selectNote.value) {
    typeTri = 'note';
    ordre   = selectNote.value; // 'asc' ou 'desc'
  } else if (selectNom && selectNom.value) {
    typeTri = 'nom';
    ordre   = selectNom.value;  // 'asc' ou 'desc'
  }

  if (typeTri) {
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
  }

  // 3. Affichage
  if (resultat.length === 0) {
    const msgVide = document.getElementById('message-vide');
    if (msgVide) msgVide.style.display = 'block';
  } else {
    const msgVide = document.getElementById('message-vide');
    if (msgVide) msgVide.style.display = 'none';

    resultat.forEach(item => {
      // Retrouver l'index ORIGINAL dans items (pour edit/delete)
      const indexOriginal = items.findIndex(i =>
        i.nom === item.nom &&
        i.type === item.type &&
        i.statut === item.statut &&
        i.note === item.note
      );

      if (indexOriginal === -1) return; // sécurité (ne devrait pas arriver)

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
//           AJOUT / MODIFICATION
// =============================================
document.getElementById('formAjout')?.addEventListener('submit', function(e) {
  e.preventDefault();

  const nom    = document.getElementById('nom')?.value.trim();
  const type   = document.getElementById('type')?.value;
  const statut = document.getElementById('statut')?.value;
  const note   = document.getElementById('note')?.value;

  if (!nom || !type || !statut || !note) return;

  const nouvelItem = { nom, type, statut, note: parseInt(note) };

  const editIndex = this.dataset.editIndex;

  if (editIndex !== undefined) {
    // Modification
    items[parseInt(editIndex)] = nouvelItem;
    delete this.dataset.editIndex;
    const btnAnnuler = document.getElementById('btnAnnulerEdit');
    if (btnAnnuler) btnAnnuler.style.display = 'none';
  } else {
    // Ajout
    items.push(nouvelItem);
  }

  sauvegarder();
  afficherListe(document.getElementById('recherche')?.value || '');
  this.reset();
});

// =============================================
//           EDITION & ANNULATION
// =============================================
function editerItem(index) {
  const item = items[index];
  if (!item) return;

  document.getElementById('nom')?.setAttribute('value', item.nom);
  document.getElementById('type')?.setAttribute('value', item.type);
  document.getElementById('statut')?.setAttribute('value', item.statut);
  document.getElementById('note')?.setAttribute('value', item.note);

  document.getElementById('formAjout').dataset.editIndex = index;

  const btnAnnuler = document.getElementById('btnAnnulerEdit');
  if (btnAnnuler) btnAnnuler.style.display = 'inline';
}

document.getElementById('btnAnnulerEdit')?.addEventListener('click', function() {
  document.getElementById('formAjout')?.reset();
  delete document.getElementById('formAjout')?.dataset.editIndex;
  this.style.display = 'none';
});

// =============================================
//           SUPPRESSION
// =============================================
function supprimerItem(index) {
  if (!confirm('Supprimer cet élément ?')) return;

  items.splice(index, 1);
  sauvegarder();
  afficherListe(document.getElementById('recherche')?.value || '');
}

// =============================================
//           RECHERCHE EN TEMPS RÉEL
// =============================================
document.getElementById('recherche')?.addEventListener('input', function() {
  afficherListe(this.value);
});

// =============================================
//           ÉCOUTE DES MENUS DÉROULANTS DE TRI
// =============================================
['tri-nom', 'tri-note'].forEach(id => {
  const select = document.getElementById(id);
  if (select) {
    select.addEventListener('change', function() {
      // Si on change un tri, on remet l'autre à vide (priorité unique)
      const autreId = id === 'tri-nom' ? 'tri-note' : 'tri-nom';
      const autreSelect = document.getElementById(autreId);
      if (autreSelect) autreSelect.value = '';

      afficherListe(document.getElementById('recherche')?.value || '');
    });
  }
});

// =============================================
//           EXPORT / IMPORT
// =============================================
document.getElementById('exporter')?.addEventListener('click', function() {
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

document.getElementById('importer')?.addEventListener('click', function() {
  const fileInput = document.getElementById('importeur');
  if (!fileInput) return alert('Élément importeur introuvable');

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
//           DÉMARRAGE
// =============================================
chargerDonnees();
