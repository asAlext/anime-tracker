// Clé unique pour localStorage
const CLE_STORAGE = 'mesAnimesTracker';

// Tableau global
let items = [];

// Ensemble pour suivre les items expansés (non sauvegardé, session seulement)
let expandedItems = new Set();

// Charger les données au démarrage
function chargerDonnees() {
  const data = localStorage.getItem(CLE_STORAGE);
  items = data ? JSON.parse(data).map(item => ({
    ...item,
    hasSubmenu: item.hasSubmenu ?? false,
    subItems: item.subItems ?? []
  })) : [];
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
      li.dataset.index = indexOriginal;
      li.innerHTML = `
        <span class="item-nom">${item.nom}</span>
        ${item.hasSubmenu ? `<button class="toggle-submenu">▼</button>` : ''}
        <div class="right-fixed">
          <span class="item-statut">${item.statut}</span>
          <span class="item-type">${item.type}</span>
          <span class="item-note">Note : ${Number(item.note)}/10</span>
          <div class="actions">
            <button onclick="editerItem(${indexOriginal})">Modifier</button>
            <button onclick="supprimerItem(${indexOriginal})">Supprimer</button>
          </div>
        </div>
        ${item.hasSubmenu ? `
          <div class="submenu">
            <ul class="sub-liste">
              ${item.subItems.map((sub, subIndex) => {
                if (sub.isSeparator) {
                  return `<li class="sub-separator"><hr></li>`;
                } else {
                  return `
                    <li class="sub-item">
                      <span class="sub-nom">${sub.nom}</span>
                      <span class="sub-statut">${sub.statut}</span>
                      <span class="sub-type">${sub.subType}</span>
                      <div class="sub-actions">
                        <button onclick="editerSubItem(${indexOriginal}, ${subIndex})">Modifier</button>
                        <button onclick="supprimerSubItem(${indexOriginal}, ${subIndex})">Supprimer</button>
                      </div>
                    </li>
                  `;
                }
              }).join('')}
            </ul>
            <div class="sub-form">
              <input type="text" id="sub-nom-${indexOriginal}" placeholder="Nom">
              <select id="sub-type-${indexOriginal}">
                <option value="">Choisir Type</option>
                <option value="anime">Anime</option>
                <option value="film">Film</option>
              </select>
              <select id="sub-statut-${indexOriginal}">
                <option value="">Choisir Statut</option>
                <option value="fini">Fini</option>
                <option value="en cours">En cours</option>
                <option value="en pause">En pause</option>
                <option value="a regarder">À regarder</option>
                <option value="abandon">Abandon</option>
                <option value="plus jamais">Plus jamais</option>
              </select>
              <button id="sub-ajouter-${indexOriginal}" onclick="ajouterSubEntry(${indexOriginal})">Ajouter</button>
              <button onclick="ajouterSeparator(${indexOriginal})">Ajouter Séparateur</button>
            </div>
          </div>
        ` : ''}
      `;

      if (expandedItems.has(indexOriginal)) {
        li.classList.add('expanded');
      }

      ul.appendChild(li);
    });

    // Ajouter les listeners pour les toggles
    document.querySelectorAll('.toggle-submenu').forEach(btn => {
      btn.addEventListener('click', () => {
        const li = btn.parentElement;
        const idx = parseInt(li.dataset.index);
        if (li.classList.toggle('expanded')) {
          expandedItems.add(idx);
        } else {
          expandedItems.delete(idx);
        }
      });
    });
  }
}

// Ajout / Modification principal
document.getElementById('formAjout').addEventListener('submit', function(e) {
  e.preventDefault();

  const nom    = document.getElementById('nom').value.trim();
  const type   = document.getElementById('type').value;
  const statut = document.getElementById('statut').value;
  const noteStr = document.getElementById('note').value.trim();
  const hasSubmenu = document.getElementById('hasSubmenu').checked;

  if (!nom || !type || !statut || !noteStr) return;

  const note = parseFloat(noteStr);
  if (isNaN(note) || note < 0 || note > 10) {
    alert("La note doit être un nombre entre 0 et 10 (ex: 9.5)");
    return;
  }

  const editIndex = this.dataset.editIndex;
  const subItems = editIndex !== undefined ? items[parseInt(editIndex)].subItems : [];

  const nouvelItem = { nom, type, statut, note, hasSubmenu, subItems };

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
  document.getElementById('hasSubmenu').checked = false;
});

// Edition principal
function editerItem(index) {
  const item = items[index];
  document.getElementById('nom').value    = item.nom;
  document.getElementById('type').value   = item.type;
  document.getElementById('statut').value = item.statut;
  document.getElementById('note').value   = item.note;
  document.getElementById('hasSubmenu').checked = item.hasSubmenu;

  document.getElementById('formAjout').dataset.editIndex = index;
  document.getElementById('btnAnnulerEdit').style.display = 'inline';
}

document.getElementById('btnAnnulerEdit').addEventListener('click', function() {
  document.getElementById('formAjout').reset();
  document.getElementById('hasSubmenu').checked = false;
  delete document.getElementById('formAjout').dataset.editIndex;
  this.style.display = 'none';
});

// Suppression principal
function supprimerItem(index) {
  if (!confirm('Supprimer cet élément ?')) return;
  items.splice(index, 1);
  expandedItems.delete(index);
  sauvegarder();
  afficherListe(document.getElementById('recherche').value);
  mettreAJourCompteurs();
}

// Fonctions pour sous-items
function ajouterSubEntry(index) {
  const nom = document.getElementById(`sub-nom-${index}`).value.trim();
  const subType = document.getElementById(`sub-type-${index}`).value;
  const statut = document.getElementById(`sub-statut-${index}`).value;

  if (!nom || !subType || !statut) {
    alert('Veuillez remplir tous les champs pour le sous-élément.');
    return;
  }

  const btn = document.getElementById(`sub-ajouter-${index}`);
  const editSubindex = btn.dataset.editSubindex;

  if (editSubindex !== undefined) {
    const sidx = parseInt(editSubindex);
    items[index].subItems[sidx] = { nom, subType, statut, isSeparator: false };
    delete btn.dataset.editSubindex;
    btn.textContent = 'Ajouter';
  } else {
    items[index].subItems.push({ nom, subType, statut, isSeparator: false });
  }

  sauvegarder();
  afficherListe(document.getElementById('recherche').value);
}

function ajouterSeparator(index) {
  items[index].subItems.push({ isSeparator: true });
  sauvegarder();
  afficherListe
