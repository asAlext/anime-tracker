const CLE_STORAGE = 'mesAnimesTracker';
let items = [];

function chargerDonnees() {
  const data = localStorage.getItem(CLE_STORAGE);
  items = data ? JSON.parse(data) : [];
  afficherListe();
}

function sauvegarder() {
  localStorage.setItem(CLE_STORAGE, JSON.stringify(items));
}

function afficherListe() {
  const ul = document.getElementById('liste');
  ul.innerHTML = '';

  items.forEach((item, index) => {
    const li = document.createElement('li');
    
    let sousItemsHtml = '';
    if (item.sousItems && item.sousItems.length > 0) {
      sousItemsHtml = '<ul class="sub-list">';
      item.sousItems.forEach(sub => {
        if (sub.type === 'separateur') {
          sousItemsHtml += '<li class="separator"></li>';
        } else {
          sousItemsHtml += `<li class="sub-item">
            <span>${sub.nom} — ${sub.statut} — ${sub.type}</span>
          </li>`;
        }
      });
      sousItemsHtml += '</ul>';
    }

    li.innerHTML = `
      <span class="toggle-arrow" onclick="toggleSousItems(${index}, this)">${item.sousItems && item.sousItems.length > 0 ? '▼' : '►'}</span>
      <div class="item-content">
        <span class="item-nom">${item.nom}</span>
        <div class="right-fixed">
          <span class="item-statut">${item.statut}</span>
          <span class="item-type">${item.type}</span>
          <span class="item-note">Note : ${Number(item.note)}/10</span>
          <div class="actions">
            <button onclick="editerItem(${index})">Modifier</button>
            <button onclick="supprimerItem(${index})">Supprimer</button>
          </div>
        </div>
      </div>
      ${sousItemsHtml}
    `;

    ul.appendChild(li);
  });
}

function toggleSousItems(index, arrow) {
  const li = arrow.parentElement;
  const subList = li.querySelector('.sub-list');
  if (subList) {
    if (subList.style.display === 'none' || !subList.style.display) {
      subList.style.display = 'block';
      arrow.textContent = '▼';
    } else {
      subList.style.display = 'none';
      arrow.textContent = '►';
    }
  }
}

// Ajout / Modification
document.getElementById('formAjout').addEventListener('submit', function(e) {
  e.preventDefault();

  const nom = document.getElementById('nom').value.trim();
  const type = document.getElementById('type').value;
  const statut = document.getElementById('statut').value;
  const noteStr = document.getElementById('note').value.trim();

  if (!nom || !type || !statut || !noteStr) return;

  const note = parseFloat(noteStr);
  if (isNaN(note) || note < 0 || note > 10) {
    alert("Note invalide");
    return;
  }

  const editIndex = this.dataset.editIndex;
  const nouvelItem = { nom, type, statut, note, sousItems: [] };

  if (editIndex !== undefined) {
    const oldItem = items[parseInt(editIndex)];
    nouvelItem.sousItems = oldItem.sousItems || [];
    items[parseInt(editIndex)] = nouvelItem;
    delete this.dataset.editIndex;
    document.getElementById('btnAnnulerEdit').style.display = 'none';
  } else {
    items.push(nouvelItem);
  }

  sauvegarder();
  afficherListe();
  this.reset();
});

// ... (le reste du code reste identique : editerItem, supprimerItem, filtres, export/import, démarrage)
