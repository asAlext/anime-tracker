// sous-menu.js – Gestion du sous-menu (films/OAV/saisons parallèles)

const SOUS_MENU_KEY = 'sousMenus';

const SousMenuManager = {
  // Initialisation : indicateurs + écoute des changements de page
  init() {
    this.addIndicatorsToGrid();

    // Ré-init quand on navigue (cartes rechargées dynamiquement)
    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        setTimeout(() => this.addIndicatorsToGrid(), 200);
      });
    });
  },

  // Ajoute le * rouge uniquement si hasSousMenu ou sous-menu non vide
  addIndicatorsToGrid() {
    const cartes = document.querySelectorAll('#anime-grid .anime-card');
    const sousMenus = JSON.parse(localStorage.getItem(SOUS_MENU_KEY) || '{}');

    cartes.forEach(card => {
      const nom = card.textContent.trim(); // nom de l'anime
      const hasSousMenu = sousMenus[nom] && sousMenus[nom].length > 0;

      // On cherche aussi dans localStorage.animes si hasSousMenu est true
      const animes = JSON.parse(localStorage.getItem('animes') || '[]');
      const anime = animes.find(a => a.nom === nom);
      const hasFlag = anime && anime.hasSousMenu === true;

      if (hasSousMenu || hasFlag) {
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
  },

  // Affiche le sous-menu juste sous la cover anime (dans .detail-left)
  renderSousMenu(nomAnime) {
    // Vérifie si on doit afficher (checkbox ou éléments existants)
    const animes = JSON.parse(localStorage.getItem('animes') || '[]');
    const anime = animes.find(a => a.nom === nomAnime);
    const hasFlag = anime && anime.hasSousMenu === true;
    const sousMenus = JSON.parse(localStorage.getItem(SOUS_MENU_KEY) || '{}');
    const hasItems = sousMenus[nomAnime] && sousMenus[nomAnime].length > 0;

    if (!hasFlag && !hasItems) return; // rien à afficher

    let container = document.getElementById('sous-menu-container');
    if (container) container.remove();

    container = document.createElement('div');
    container.id = 'sous-menu-container';
    container.style.marginTop = '30px'; // espace après les infos anime
    container.style.padding = '15px';
    container.style.background = '#f9f9f9';
    container.style.border = '1px solid #ddd';
    container.style.borderRadius = '8px';

    // Barre d'outils fixe (toujours visible)
    const toolbar = document.createElement('div');
    toolbar.style.display = 'flex';
    toolbar.style.gap = '12px';
    toolbar.style.marginBottom = '20px';

    const btnTitre = document.createElement('button');
    btnTitre.textContent = '+ Titre';
    btnTitre.onclick = () => this.addTitre(nomAnime, container);

    const btnAjout = document.createElement('button');
    btnAjout.textContent = 'Ajouter entrée';
    btnAjout.onclick = () => this.addEntree(nomAnime, container);

    const btnSeparateur = document.createElement('button');
    btnSeparateur.textContent = 'Séparateur';
    btnSeparateur.onclick = () => this.addSeparateur(nomAnime, container);

    toolbar.append(btnTitre, btnAjout, btnSeparateur);
    container.appendChild(toolbar);

    const content = document.createElement('div');
    content.id = 'sous-menu-content';
    container.appendChild(content);

    // Placement : juste après les infos anime (dans .detail-left)
    const detailLeft = document.querySelector('.detail-left');
    if (detailLeft) detailLeft.appendChild(container);

    this.loadAndRender(nomAnime, content);
  },

  // Charge et affiche les items (sans popup)
  loadAndRender(nomAnime, container) {
    container.innerHTML = '';
    const data = JSON.parse(localStorage.getItem(SOUS_MENU_KEY) || '{}');
    const items = data[nomAnime] || [];

    items.forEach((item, index) => {
      const ligne = document.createElement('div');
      ligne.style.position = 'relative';
      ligne.style.marginBottom = '12px';
      ligne.style.padding = '8px';
      ligne.style.borderBottom = '1px solid #eee';

      const x = document.createElement('span');
      x.textContent = '×';
      x.style.position = 'absolute';
      x.style.right = '8px';
      x.style.top = '50%';
      x.style.transform = 'translateY(-50%)';
      x.style.color = 'red';
      x.style.fontSize = '22px';
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
        nomInput.style.width = '40%';
        nomInput.style.marginRight = '10px';
        nomInput.onchange = (e) => this.updateItem(nomAnime, index, 'nom', e.target.value);

        const typeSelect = document.createElement('select');
        ['Anime', 'Film', 'OAV'].forEach(opt => {
          const option = document.createElement('option');
          option.value = opt;
          option.textContent = opt;
          if (opt === item.type) option.selected = true;
          typeSelect.appendChild(option);
        });
        typeSelect.onchange = (e) => this.updateItem(nomAnime, index, 'type', e.target.value);

        const statutSelect = document.createElement('select');
        ['Terminé', 'En Cours', 'En Pause', 'A Regarder'].forEach(opt => {
          const option = document.createElement('option');
          option.value = opt;
          option.textContent = opt;
          if (opt === item.statut) option.selected = true;
          statutSelect.appendChild(option);
        });
        statutSelect.onchange = (e) => this.updateItem(nomAnime, index, 'statut', e.target.value);

        ligne.append(nomInput, typeSelect, statutSelect);
      } else if (item.type === 'separateur') {
        ligne.innerHTML = '<hr style="border:none; border-top:6px solid #aaa; margin:30px 0;">';
      }

      ligne.appendChild(x);
      container.appendChild(ligne);
    });
  },

  updateItem(nomAnime, index, field, value) {
    let data = JSON.parse(localStorage.getItem(SOUS_MENU_KEY) || '{}');
    if (data[nomAnime] && data[nomAnime][index]) {
      data[nomAnime][index][field] = value;
      localStorage.setItem(SOUS_MENU_KEY, JSON.stringify(data));
    }
  },

  addTitre(nomAnime, container) {
    const data = JSON.parse(localStorage.getItem(SOUS_MENU_KEY) || '{}');
    if (!data[nomAnime]) data[nomAnime] = [];
    data[nomAnime].push({ type: 'titre', texte: 'Nouveau titre' });
    localStorage.setItem(SOUS_MENU_KEY, JSON.stringify(data));
    this.loadAndRender(nomAnime, container);
  },

  addEntree(nomAnime, container) {
    const data = JSON.parse(localStorage.getItem(SOUS_MENU_KEY) || '{}');
    if (!data[nomAnime]) data[nomAnime] = [];
    data[nomAnime].push({ type: 'entree', nom: 'Nouvelle entrée', type: 'Anime', statut: 'En Cours' });
    localStorage.setItem(SOUS_MENU_KEY, JSON.stringify(data));
    this.loadAndRender(nomAnime, container);
  },

  addSeparateur(nomAnime, container) {
    const data = JSON.parse(localStorage.getItem(SOUS_MENU_KEY) || '{}');
    if (!data[nomAnime]) data[nomAnime] = [];
    data[nomAnime].push({ type: 'separateur' });
    localStorage.setItem(SOUS_MENU_KEY, JSON.stringify(data));
    this.loadAndRender(nomAnime, container);
  },

  deleteItem(nomAnime, index) {
    let data = JSON.parse(localStorage.getItem(SOUS_MENU_KEY) || '{}');
    if (data[nomAnime]) {
      data[nomAnime].splice(index, 1);
      localStorage.setItem(SOUS_MENU_KEY, JSON.stringify(data));
      const content = document.getElementById('sous-menu-content');
      if (content) this.loadAndRender(nomAnime, content);
    }
  }
};

// Initialisation
document.addEventListener('DOMContentLoaded', () => SousMenuManager.init());
