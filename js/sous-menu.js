// js/sous-menu.js – Sous-menu complet (films / OAV / saisons parallèles)
// Ne touche à rien d’autre dans la page détail

const SOUS_MENU_KEY = 'sousMenus';

const SousMenuManager = {
  // Appelée depuis detail-page.js quand on est sur un anime avec hasSousMenu = true
  renderSousMenu(nomAnime) {
    // On cherche la cover anime pour insérer juste en dessous
    const imgAnime = document.getElementById('detail-cover-anime');
    if (!imgAnime) return;

    // On crée le container juste après la cover
    let container = document.getElementById('sous-menu-container');
    if (container) container.remove();

    container = document.createElement('div');
    container.id = 'sous-menu-container';
    container.style.marginTop = '25px'; // espace raisonnable sous la cover
    container.style.padding = '20px';
    container.style.background = '#f9f9f9';
    container.style.border = '1px solid #ddd';
    container.style.borderRadius = '8px';
    container.style.width = '100%';
    container.style.boxSizing = 'border-box';

    // Barre d'outils fixe (toujours visible)
    const toolbar = document.createElement('div');
    toolbar.style.display = 'flex';
    toolbar.style.gap = '15px';
    toolbar.style.marginBottom = '25px';
    toolbar.style.flexWrap = 'wrap';

    const btnTitre = document.createElement('button');
    btnTitre.textContent = '+ Titre';
    btnTitre.style.padding = '10px 18px';
    btnTitre.onclick = () => this.addTitre(nomAnime, content);

    const btnAjout = document.createElement('button');
    btnAjout.textContent = 'Ajouter entrée';
    btnAjout.style.padding = '10px 18px';
    btnAjout.onclick = () => this.addEntree(nomAnime, content);

    const btnSeparateur = document.createElement('button');
    btnSeparateur.textContent = 'Séparateur';
    btnSeparateur.style.padding = '10px 18px';
    btnSeparateur.onclick = () => this.addSeparateur(nomAnime, content);

    toolbar.append(btnTitre, btnAjout, btnSeparateur);
    container.appendChild(toolbar);

    const content = document.createElement('div');
    content.id = 'sous-menu-content';
    container.appendChild(content);

    // Insertion juste après la cover (dans detail-left)
    const detailLeft = document.querySelector('.detail-left');
    if (detailLeft && imgAnime.parentNode === detailLeft) {
      detailLeft.insertBefore(container, imgAnime.nextSibling);
    }

    this.loadAndRender(nomAnime, content);
  },

  loadAndRender(nomAnime, content) {
    content.innerHTML = '';
    const data = JSON.parse(localStorage.getItem(SOUS_MENU_KEY) || '{}');
    const items = data[nomAnime] || [];

    items.forEach((item, index) => {
      const ligne = document.createElement('div');
      ligne.style.position = 'relative';
      ligne.style.marginBottom = '16px';
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
      x.onclick = () => this.deleteItem(nomAnime, index, content);

      ligne.onmouseenter = () => x.style.opacity = '1';
      ligne.onmouseleave = () => x.style.opacity = '0';

      if (item.type === 'titre') {
        const input = document.createElement('input');
        input.type = 'text';
        input.value = item.texte || 'Nouveau titre';
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
        nomInput.value = item.nom || 'Nouveau nom';
        nomInput.placeholder = 'Nom';
        nomInput.style.width = '40%';
        nomInput.style.marginRight = '10px';
        nomInput.onchange = (e) => this.updateItem(nomAnime, index, 'nom', e.target.value);

        const typeSelect = document.createElement('select');
        ['Anime', 'Film', 'OAV'].forEach(t => {
          const opt = document.createElement('option');
          opt.value = t;
          opt.textContent = t;
          if (t === item.type) opt.selected = true;
          typeSelect.appendChild(opt);
        });
        typeSelect.onchange = (e) => this.updateItem(nomAnime, index, 'type', e.target.value);

        const statutSelect = document.createElement('select');
        ['Terminé', 'En Cours', 'En Pause', 'A Regarder'].forEach(s => {
          const opt = document.createElement('option');
          opt.value = s;
          opt.textContent = s;
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

  updateItem(nomAnime, index, field, value) {
    let data = JSON.parse(localStorage.getItem(SOUS_MENU_KEY) || '{}');
    if (data[nomAnime] && data[nomAnime][index]) {
      data[nomAnime][index][field] = value;
      localStorage.setItem(SOUS_MENU_KEY, JSON.stringify(data));
    }
  },

  addTitre(nomAnime, content) {
    let data = JSON.parse(localStorage.getItem(SOUS_MENU_KEY) || '{}');
    if (!data[nomAnime]) data[nomAnime] = [];
    data[nomAnime].push({ type: 'titre', texte: 'Nouveau titre' });
    localStorage.setItem(SOUS_MENU_KEY, JSON.stringify(data));
    this.loadAndRender(nomAnime, content);
  },

  addEntree(nomAnime, content) {
    let data = JSON.parse(localStorage.getItem(SOUS_MENU_KEY) || '{}');
    if (!data[nomAnime]) data[nomAnime] = [];
    data[nomAnime].push({ type: 'entree', nom: 'Nouveau nom', type: 'Anime', statut: 'En Cours' });
    localStorage.setItem(SOUS_MENU_KEY, JSON.stringify(data));
    this.loadAndRender(nomAnime, content);
  },

  addSeparateur(nomAnime, content) {
    let data = JSON.parse(localStorage.getItem(SOUS_MENU_KEY) || '{}');
    if (!data[nomAnime]) data[nomAnime] = [];
    data[nomAnime].push({ type: 'separateur' });
    localStorage.setItem(SOUS_MENU_KEY, JSON.stringify(data));
    this.loadAndRender(nomAnime, content);
  },

  deleteItem(nomAnime, index, content) {
    let data = JSON.parse(localStorage.getItem(SOUS_MENU_KEY) || '{}');
    if (data[nomAnime]) {
      data[nomAnime].splice(index, 1);
      localStorage.setItem(SOUS_MENU_KEY, JSON.stringify(data));
      this.loadAndRender(nomAnime, content);
    }
  }
};

// Initialisation : indicateur * rouge sur la grille + écoute navigation
document.addEventListener('DOMContentLoaded', () => {
  SousMenuManager.addIndicatorsToGrid();

  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      setTimeout(() => SousMenuManager.addIndicatorsToGrid(), 300);
    });
  });
});

// Fonction pour ajouter l'indicateur * rouge sur les cartes
SousMenuManager.addIndicatorsToGrid = function() {
  const cartes = document.querySelectorAll('#anime-grid .anime-card');
  const animes = JSON.parse(localStorage.getItem('animes') || '[]');
  cartes.forEach(card => {
    const nom = card.textContent.trim();
    const anime = animes.find(a => a.nom === nom);
    if (anime && anime.hasSousMenu === true) {
      let indicator = card.querySelector('.sous-menu-indicator');
      if (!indicator) {
        indicator = document.createElement('span');
        indicator.className = 'sous-menu-indicator';
        indicator.textContent = '*';
        indicator.style.position = 'absolute';
        indicator.style.top = '5px';
        indicator.style.right = '5px';
        indicator.style.color = 'red';
        indicator.style.fontSize = '24px';
        indicator.style.fontWeight = 'bold';
        indicator.style.zIndex = '10';
        indicator.style.pointerEvents = 'none';
        const imgWrapper = card.querySelector('.img-wrapper');
        if (imgWrapper) {
          imgWrapper.style.position = 'relative';
          imgWrapper.appendChild(indicator);
        }
      }
    }
  });
};
