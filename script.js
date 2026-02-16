// Clé unique pour localStorage
const CLE_STORAGE = 'mesAnimesTracker';

// Tableau global
let items = [];

// Charger les données au démarrage
function chargerDonnees() {
  const data = localStorage.getItem(CLE_STORAGE);
  items = data ? JSON.parse(data) : [];
  items = items.map(item => ({
    ...item,
    hasSubmenu: item.hasSubmenu || false,
    subItems: item.subItems || []
  }));
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

      let arrowHtml = '';
      let submenuHtml = '';

      if (item.hasSubmenu) {
        arrowHtml = `<span class="arrow" onclick="toggleSubmenu(${indexOriginal})">▼</span>`;

        submenuHtml = `<div class="submenu" style="max-height: 0px;">`;
        submenuHtml += `<ul class="sub-liste">`;

        item.subItems.forEach((sub, subIndex) => {
          if (sub.type === 'separator') {
            submenuHtml += `
              <li class="separator">
                <hr>
                <div class="sub-actions">
                  <button onclick="supprimerSubItem(${indexOriginal}, ${subIndex})">Supprimer</button>
                </div>
              </li>
            `;
          } else {
            submenuHtml += `
              <li class="sub-item">
                <span class="sub-nom">${sub.nom}</span>
                <span class="sub-statut">${sub.statut}</span>
                <span class="sub-type">${sub.type}</span>
                <div class="sub-actions">
                  <button onclick="editerSubItem(${indexOriginal}, ${subIndex})">Modifier</button>
                  <button onclick="supprimerSubItem(${indexOriginal}, ${subIndex})">Supprimer</button>
                </div>
              </li>
            `;
          }
        });

        submenuHtml += `</ul>`;

        submenuHtml += `
          <form class="form-add-sub" onsubmit="ajouterSubItem(event, ${indexOriginal})">
            <input type="text" name="subNom" placeholder="Nom" required>
            <select name="subType" required>
              <option value="">Type</option>
              <option value="anime">Anime</option>
              <option value="film">Film</option>
            </select>
            <select name="subStatut" required>
              <option value="">Statut</option>
              <option value="fini">Fini</option>
              <option value="en cours">En cours</option>
              <option value="en pause">En pause</option>
              <option value="a regarder">À regarder</option>
              <option value="abandon">Abandon</option>
              <option value="plus jamais">Plus jamais</option>
            </select>
            <button type="submit">Ajouter</button>
            <button type="button" class="btn-annuler-sub" style="display:none;" onclick="annulerSubEdit(${indexOriginal})">Annuler</button>
          </form>
        `;

        submenuHtml += `
          <div class="add-sub">
            <button onclick="ajouterSeparator(${indexOriginal})">Ajouter Séparateur</button>
          </div>
        `;

        submenuHtml += `</div>`;
      }

      li.innerHTML = `
        <div class="content">
          <span class="item-nom">${item.nom}</span>
          ${arrowHtml}
          <div class="right-fixed">
            <span class="item-statut">${item.statut}</span>
            <span class="item-type">${item.type}</span>
            <span class="item-note">Note : ${Number(item.note)}/10</span>
            <div class="actions">
              <button onclick="editerItem(${indexOriginal})">Modifier</button>
              <button onclick="supprimerItem(${indexOriginal})">Supprimer</button>
            </div>
          </div>
        </div>
        ${submenuHtml}
      `;

      ul.appendChild(li);
    });
  }
}

// Toggle submenu
function toggleSubmenu(index) {
  const li = document.querySelector(`#liste li[data-index="${index}"]`);
  li.classList.toggle('open');
  const submenu = li.querySelector('.submenu');
  if (li.classList.contains('open')) {
    submenu.style.maxHeight = submenu.scrollHeight + 'px';
  } else {
    submenu.style.maxHeight = '0px';
  }
}

// Ajouter separator
function ajouterSeparator(index) {
  items[index].subItems.push({ type: 'separator' });
  sauvegarder();
  afficherListe(document.getElementById('recherche').value);
}

// Ajouter / Modifier sub item
function ajouterSubItem(e, index) {
  e.preventDefault();
  const form = e.target;
  const nom = form.subNom.value.trim();
  const type = form.subType.value;
  const statut = form.subStatut.value;
  if (!nom || !type || !statut) return;

  const editSubIndex = form.dataset.editSubIndex;
  if (editSubIndex !== undefined) {
    const subI = parseInt(editSubIndex);
    items[index].subItems[subI] = { type: 'item', nom, type: type, statut };
    delete form.dataset.editSubIndex;
    form.querySelector('button[type="submit"]').textContent = 'Ajouter';
    form.querySelector('.btn-annuler-sub').style.display = 'none';
  } else {
    items[index].subItems.push({ type: 'item', nom, type: type, statut });
  }

  form.reset();
  sauvegarder();
  afficherListe(document.getElementById('recherche').value);
}

// Editer sub item
function editerSubItem(mainIndex, subIndex) {
  const li = document.querySelector(`li[data-index="${mainIndex}"]`);
  const form = li.querySelector('.form-add-sub');
  const sub = items[mainIndex].subItems[subIndex];

  form.subNom.value = sub.nom;
  form.subType.value = sub.type;
  form.subStatut.value = sub.statut;
  form.dataset.editSubIndex = subIndex;
  form.querySelector('button[type="submit"]').textContent = 'Modifier';
  form.querySelector('.btn-annuler-sub').style.display = 'inline';
}

// Annuler edit sub
function annulerSubEdit(mainIndex) {
  const li = document.querySelector(`li[data-index="${mainIndex}"]`);
  const form = li.querySelector('.form-add-sub');
  form.reset();
  delete form.dataset.editSubIndex;
  form.querySelector('button[type="submit"]').textContent = 'Ajouter';
  form.querySelector('.btn-annuler-sub').style.display = 'none';
}

// Supprimer sub item
function supprimerSubItem(mainIndex, subIndex) {
  if (!confirm('Supprimer cet élément ?')) return;
  items[mainIndex].subItems.splice(subIndex, 1);
  sauvegarder();
  afficherListe(document.getElementById('recherche').value);
}

// Ajout / Modification main
document.getElementById('formAjout').addEventListener('submit', function(e) {
  e.preventDefault();

  const nom = document.getElementById('nom').value.trim();
  const type = document.getElementById('type').value;
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
  let nouvelItem;

  if (editIndex !== undefined) {
    const oldItem = items[parseInt(editIndex)];
    nouvelItem = { ...oldItem, nom, type, statut, note, hasSubmenu };
    items[parseInt(editIndex)] = nouvelItem;
    delete this.dataset.editIndex;
    document.getElementById('btnAnnulerEdit').style.display = 'none';
  } else {
    nouvelItem = { nom, type, statut, note, hasSubmenu, subItems: [] };
    items.push(nouvelItem);
  }

  sauvegarder();
  afficherListe(document.getElementById('recherche').value);
  mettreAJourCompteurs();
  this.reset();
});

// Edition main
function editerItem(index) {
  const item = items[index];
  document.getElementById('nom').value = item.nom;
  document.getElementById('type').value = item.type;
  document.getElementById('statut').value = item.statut;
  document.getElementById('note').value = item.note;
  document.getElementById('hasSubmenu').checked = item.hasSubmenu;

  document.getElementById('formAjout
