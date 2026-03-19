// sous-menu.js – Gestion complète du sous-menu (films/OAV/saisons)
const SOUS_MENU_KEY = 'sousMenus';

const SousMenuManager = {
  // Rendu du sous-menu juste sous la cover (pleine largeur)
  renderSousMenu(nomAnime) {
    const detailLeft = document.querySelector('.detail-left');
    if (!detailLeft) return;

    // Supprime l’ancien si présent
    const old = document.getElementById('sous-menu-container');
    if (old) old.remove();

    const container = document.createElement('div');
    container.id = 'sous-menu-container';
    container.style.marginTop = '30px';
    container.style.padding = '20px';
    container.style.background = '#f9f9f9';
    container.style.border = '1px solid #ddd';
    container.style.borderRadius = '8px';
    container.style.width = '100%';
    container.style.boxSizing = 'border-box';

    // Barre d’outils fixe
    const toolbar = document.createElement('div');
    toolbar.style.display = 'flex';
    toolbar.style.gap = '12px';
    toolbar.style.marginBottom = '20px';
    toolbar.style.flexWrap = 'wrap';

    const btnTitre = document.createElement('button');
    btnTitre.textContent = '+ Titre';
    btnTitre.style.padding = '10px 18px';
    btnTitre.onclick = () => this.addItem(nomAnime, 'titre');

    const btnEntree = document.createElement('button');
    btnEntree.textContent = 'Ajouter entrée';
    btnEntree.style.padding = '10px 18px';
    btnEntree.onclick = () => this.addItem(nomAnime, 'entree');

    const btnSep = document.createElement('button');
    btnSep.textContent = 'Séparateur';
    btnSep.style.padding = '10px 18px';
    btnSep.onclick = () => this.addItem(nomAnime, 'separateur');

    toolbar.append(btnTitre, btnEntree, btnSep);
    container.appendChild(toolbar);

    const content = document.createElement('div');
    content.id = 'sous-menu-content';
    container.appendChild(content);

    detailLeft.appendChild(container);   // ← placement exact sous la cover

    this.loadItems(nomAnime, content);
  },

  // Ajout direct (sans popup)
  addItem(nomAnime, type) {
    let data = JSON.parse(localStorage.getItem(SOUS_MENU_KEY) || '{}');
    if (!data[nomAnime]) data[nomAnime] = [];

    if (type === 'titre') {
      data[nomAnime].push({ type: 'titre', texte: 'Nouveau titre' });
    } else if (type === 'entree') {
      data[nomAnime].push({ type: 'entree', nom: '', typeItem: 'Anime', statut: 'En Cours' });
    } else if (type === 'separateur') {
      data[nomAnime].push({ type: 'separateur' });
    }

    localStorage.setItem(SOUS_MENU_KEY, JSON.stringify(data));
    const content = document.getElementById('sous-menu-content');
    if (content) this.loadItems(nomAnime, content);
  },

  // Chargement et affichage des lignes
  loadItems(nomAnime, content) {
    content.innerHTML = '';
    const data = JSON.parse(localStorage.getItem(SOUS_MENU_KEY) || '{}');
    const items = data[nomAnime] || [];

    items.forEach((item, index) => {
      const ligne = document.createElement('div');
      ligne.style.display = 'flex';
      ligne.style.alignItems = 'center';
      ligne.style.gap = '10px';
      ligne.style.marginBottom = '12px';

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = '×';
      deleteBtn.style.color = 'red';
      deleteBtn.style.cursor = 'pointer';
      deleteBtn.onclick = () => this.deleteItem(nomAnime, index);

      if (item.type === 'titre') {
        const input = document.createElement('input');
        input.type = 'text';
        input.value = item.texte || '';
        input.style.flex = '1';
        input.style.fontWeight = 'bold';
        input.style.fontSize = '18px';
        input.onchange = (e) => {
          item.texte = e.target.value;
          data[nomAnime] = items;
          localStorage.setItem(SOUS_MENU_KEY, JSON.stringify(data));
        };
        ligne.append(input, deleteBtn);
      } else if (item.type === 'entree') {
        const nomInput = document.createElement('input');
        nomInput.type = 'text';
        nomInput.value = item.nom || '';
        nomInput.style.flex = '2';
        nomInput.onchange = (e) => { item.nom = e.target.value; this.save(nomAnime, items); };

        const typeSelect = document.createElement('select');
        ['Anime', 'Film', 'OAV'].forEach(t => {
          const opt = document.createElement('option');
          opt.value = t;
          opt.textContent = t;
          if (t === item.typeItem) opt.selected = true;
          typeSelect.appendChild(opt);
        });
        typeSelect.onchange = (e) => { item.typeItem = e.target.value; this.save(nomAnime, items); };

        const statutSelect = document.createElement('select');
        ['Terminé', 'En Cours', 'En Pause', 'A Regarder'].forEach(s => {
          const opt = document.createElement('option');
          opt.value = s;
          opt.textContent = s;
          if (s === item.statut) opt.selected = true;
          statutSelect.appendChild(opt);
        });
        statutSelect.onchange = (e) => { item.statut = e.target.value; this.save(nomAnime, items); };

        ligne.append(nomInput, typeSelect, statutSelect, deleteBtn);
      } else if (item.type === 'separateur') {
        const hr = document.createElement('hr');
        hr.style.border = 'none';
        hr.style.borderTop = '4px solid #ccc';
        hr.style.margin = '25px 0';
        hr.style.width = '100%';
        ligne.append(hr, deleteBtn);
      }

      content.appendChild(ligne);
    });
  },

  save(nomAnime, items) {
    let data = JSON.parse(localStorage.getItem(SOUS_MENU_KEY) || '{}');
    data[nomAnime] = items;
    localStorage.setItem(SOUS_MENU_KEY, JSON.stringify(data));
  },

  deleteItem(nomAnime, index) {
    let data = JSON.parse(localStorage.getItem(SOUS_MENU_KEY) || '{}');
    if (data[nomAnime]) {
      data[nomAnime].splice(index, 1);
      localStorage.setItem(SOUS_MENU_KEY, JSON.stringify(data));
      const content = document.getElementById('sous-menu-content');
      if (content) this.loadItems(nomAnime, content);
    }
  }
};

// Auto-init (indicateur * rouge sur les cartes)
document.addEventListener('DOMContentLoaded', () => {
  // Tu peux appeler SousMenuManager.renderSousMenu depuis detail-page.js
});
