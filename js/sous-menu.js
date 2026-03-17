// sous-menu.js – Version complète et propre (sous la cover seulement)
const SOUS_MENU_KEY = 'sousMenus';

const SousMenuManager = {

  // Appel depuis detail-page.js après l'affichage de la cover
  renderSousMenu(nomAnime) {
    // Supprime l'ancien si présent
    let old = document.getElementById('sous-menu-container');
    if (old) old.remove();

    const container = document.createElement('div');
    container.id = 'sous-menu-container';
    container.style.marginTop = '25px';
    container.style.padding = '20px';
    container.style.background = '#f9f9f9';
    container.style.border = '1px solid #ddd';
    container.style.borderRadius = '8px';
    container.style.width = '100%';
    container.style.boxSizing = 'border-box';

    // Barre d'outils fixe (toujours visible)
    const toolbar = document.createElement('div');
    toolbar.style.display = 'flex';
    toolbar.style.gap = '12px';
    toolbar.style.marginBottom = '20px';

    const btnTitre = document.createElement('button');
    btnTitre.textContent = '+ Titre';
    btnTitre.style.padding = '10px 18px';
    btnTitre.onclick = () => this.addItem(nomAnime, 'titre');

    const btnAjout = document.createElement('button');
    btnAjout.textContent = 'Ajouter entrée';
    btnAjout.style.padding = '10px 18px';
    btnAjout.onclick = () => this.addItem(nomAnime, 'entree');

    const btnSeparateur = document.createElement('button');
    btnSeparateur.textContent = 'Séparateur';
    btnSeparateur.style.padding = '10px 18px';
    btnSeparateur.onclick = () => this.addItem(nomAnime, 'separateur');

    toolbar.append(btnTitre, btnAjout, btnSeparateur);
    container.appendChild(toolbar);

    const content = document.createElement('div');
    content.id = 'sous-menu-content';
    container.appendChild(content);

    // Placement : on ajoute dans .detail-left (juste après la cover)
    const detailLeft = document.querySelector('.detail-left');
    if (detailLeft) detailLeft.appendChild(container);

    this.loadItems(nomAnime, content);
  },

  loadItems(nomAnime, content) {
    content.innerHTML = '';
    const data = JSON.parse(localStorage.getItem(SOUS_MENU_KEY) || '{}');
    const items = data[nomAnime] || [];

    items.forEach((item, index) => {
      const ligne = document.createElement('div');
      ligne.style.position = 'relative';
      ligne.style.marginBottom = '12px';
      ligne.style.padding = '10px';
      ligne.style.background = '#fff';
      ligne.style.border = '1px solid #eee';
      ligne.style.borderRadius = '6px';

      const x = document.createElement('span');
      x.textContent = '×';
      x.style.position = 'absolute';
      x.style.right = '12px';
      x.style.top = '50%';
      x.style.transform = 'translateY(-50%)';
      x.style.color = 'red';
      x.style.fontSize = '24px';
      x.style.cursor = 'pointer';
      x.style.opacity = '0';
      x.onclick = () => this.deleteItem(nomAnime, index);

      ligne.onmouseenter = () => x.style.opacity = '1';
      ligne.onmouseleave = () => x.style.opacity = '0';

      if (item.type === 'titre') {
        const input = document.createElement('input');
        input.type = 'text';
        input.value = item.texte || '';
        input.style.fontSize = '22px';
        input.style.fontWeight = 'bold';
        input.style.width = '100%';
        input.style.border = 'none';
        input.style.background = 'transparent';
        input.onchange = (e) => this.updateItem(nomAnime, index, 'texte', e.target.value);
        ligne.appendChild(input);
      } else if (item.type === 'entree') {
        const nomInput = document.createElement('input');
        nomInput.type = 'text';
        nomInput.value = item.nom || '';
        nomInput.placeholder = 'Nom';
        nomInput.style.width = '40%';
        nomInput.style.marginRight = '10px';
        nomInput.onchange = (e) => this.updateItem(nomAnime, index, 'nom', e.target.value);

        const typeSelect = document.createElement('select');
        ['Anime','Film','OAV'].forEach(t => {
          const opt = document.createElement('option');
          opt.value = t; opt.textContent = t;
          if (t === item.type) opt.selected = true;
          typeSelect.appendChild(opt);
        });
        typeSelect.onchange = (e) => this.updateItem(nomAnime, index, 'type', e.target.value);

        const statutSelect = document.createElement('select');
        ['Terminé','En Cours','En Pause','A Regarder'].forEach(s => {
          const opt = document.createElement('option');
          opt.value = s; opt.textContent = s;
          if (s === item.statut) opt.selected = true;
          statutSelect.appendChild(opt);
        });
        statutSelect.onchange = (e) => this.updateItem(nomAnime, index, 'statut', e.target.value);

        ligne.append(nomInput, typeSelect, statutSelect);
      } else if (item.type === 'separateur') {
        ligne.innerHTML = '<hr style="border:none; border-top:4px solid #ccc; margin:20px 0;">';
      }

      ligne.appendChild(x);
      content.appendChild(ligne);
    });
  },

  addItem(nomAnime, type) {
    let data = JSON.parse(localStorage.getItem(SOUS_MENU_KEY) || '{}');
    if (!data[nomAnime]) data[nomAnime] = [];

    if (type === 'titre') data[nomAnime].push({ type: 'titre', texte: 'Nouveau titre' });
    else if (type === 'entree') data[nomAnime].push({ type: 'entree', nom: 'Nouveau nom', type: 'Anime', statut: 'En Cours' });
    else if (type === 'separateur') data[nomAnime].push({ type: 'separateur' });

    localStorage.setItem(SOUS_MENU_KEY, JSON.stringify(data));
    const content = document.getElementById('sous-menu-content');
    if (content) this.loadItems(nomAnime, content);
  },

  updateItem(nomAnime, index, field, value) {
    let data = JSON.parse(localStorage.getItem(SOUS_MENU_KEY) || '{}');
    if (data[nomAnime] && data[nomAnime][index]) {
      data[nomAnime][index][field] = value;
      localStorage.setItem(SOUS_MENU_KEY, JSON.stringify(data));
    }
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

// Initialisation (indicateur * sur la grille)
document.addEventListener('DOMContentLoaded', () => SousMenuManager.init = () => {
  // Ajoute le * rouge sur les cartes qui ont un sous-menu
  const cartes = document.querySelectorAll('#anime-grid .anime-card');
  const data = JSON.parse(localStorage.getItem(SOUS_MENU_KEY) || '{}');
  cartes.forEach(card => {
    const nom = card.textContent.trim();
    if (data[nom] && data[nom].length > 0) {
      let star = card.querySelector('.sous-menu-star');
      if (!star) {
        star = document.createElement('span');
        star.className = 'sous-menu-star';
        star.textContent = '*';
        star.style.position = 'absolute';
        star.style.top = '8px';
        star.style.right = '8px';
        star.style.color = 'red';
        star.style.fontSize = '24px';
        star.style.fontWeight = 'bold';
        star.style.zIndex = '10';
        const wrapper = card.querySelector('.img-wrapper');
        if (wrapper) {
          wrapper.style.position = 'relative';
          wrapper.appendChild(star);
        }
      }
    }
  });
});
