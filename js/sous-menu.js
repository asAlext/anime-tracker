// sous-menu.js – Gestion du sous-menu pour les animes avec films/OAV/saisons parallèles

// Clé de stockage dans localStorage
const SOUS_MENU_KEY = 'sousMenus';

// Objet principal pour gérer tout
const SousMenuManager = {
  // Initialisation au chargement de la page
  init() {
    // Ajoute l'indicateur * rouge sur les cartes qui ont un sous-menu
    this.addIndicatorsToGrid();

    // Si on est sur la page détail, affiche le sous-menu si nécessaire
    if (document.getElementById('page-detail')?.style.display !== 'none') {
      const animeNom = document.getElementById('detail-nom-anime')?.textContent.trim();
      if (animeNom && animeNom !== 'Nom inconnu') {
        this.renderSousMenu(animeNom);
      }
    }
  },

  // Ajoute le * rouge en haut à droite sur les cartes de la grille
  addIndicatorsToGrid() {
    const cartes = document.querySelectorAll('#anime-grid .anime-card');
    const sousMenus = JSON.parse(localStorage.getItem(SOUS_MENU_KEY) || '{}');

    cartes.forEach(card => {
      const nom = card.textContent.trim(); // nom de l'anime (dernier enfant texte)
      if (sousMenus[nom] && sousMenus[nom].length > 0) {
        let indicator = card.querySelector('.sous-menu-indicator');
        if (!indicator) {
          indicator = document.createElement('span');
          indicator.className = 'sous-menu-indicator';
          indicator.textContent = '*';
          indicator.style.position = 'absolute';
          indicator.style.top = '8px';
          indicator.style.right = '8px';
          indicator.style.color = 'red';
          indicator.style.fontSize = '20px';
          indicator.style.fontWeight = 'bold';
          indicator.style.zIndex = '10';
          indicator.style.pointerEvents = 'none';
          card.querySelector('.img-wrapper').appendChild(indicator);
        }
      }
    });
  },

  // Charge et affiche le sous-menu pour un anime donné
  renderSousMenu(nomAnime) {
    const container = document.createElement('div');
    container.id = 'sous-menu-container';
    container.style.marginTop = '40px'; // espace après les covers
    container.style.padding = '20px';
    container.style.background = '#f9f9f9';
    container.style.borderTop = '2px solid #ddd';
    container.style.borderRadius = '8px';

    // Barre d'outils fixe (toujours visible)
    const toolbar = document.createElement('div');
    toolbar.style.position = 'sticky';
    toolbar.style.top = '20px';
    toolbar.style.background = '#fff';
    toolbar.style.padding = '10px 0';
    toolbar.style.borderBottom = '1px solid #eee';
    toolbar.style.marginBottom = '20px';
    toolbar.style.display = 'flex';
    toolbar.style.gap = '12px';
    toolbar.style.zIndex = '5';

    const btnTitre = document.createElement('button');
    btnTitre.textContent = '+ Titre';
    btnTitre.onclick = () => this.addTitre(container, nomAnime);

    const btnAjout = document.createElement('button');
    btnAjout.textContent = 'Ajouter entrée';
    btnAjout.onclick = () => this.addEntree(container, nomAnime);

    const btnSeparateur = document.createElement('button');
    btnSeparateur.textContent = 'Séparateur';
    btnSeparateur.onclick = () => this.addSeparateur(container, nomAnime);

    toolbar.appendChild(btnTitre);
    toolbar.appendChild(btnAjout);
    toolbar.appendChild(btnSeparateur);
    container.appendChild(toolbar);

    // Zone où s'affichent les éléments
    const content = document.createElement('div');
    content.id = 'sous-menu-content';
    container.appendChild(content);

    // Ajoute le tout en bas de .detail-content
    const detailContent = document.querySelector('.detail-content');
    if (detailContent) {
      detailContent.appendChild(container);
    }

    // Charge les données existantes
    this.loadAndDisplay(nomAnime, content);
  },

  // Charge les données depuis localStorage et affiche
  loadAndDisplay(nomAnime, contentContainer) {
    const sousMenus = JSON.parse(localStorage.getItem(SOUS_MENU_KEY) || '{}');
    const items = sousMenus[nomAnime] || [];

    contentContainer.innerHTML = '';

    items.forEach((item, index) => {
      const ligne = document.createElement('div');
      ligne.className = 'sous-menu-ligne';
      ligne.style.position = 'relative';
      ligne.style.padding = '8px 0';
      ligne.style.borderBottom = '1px solid #eee';
      ligne.style.minHeight = '30px';

      // Bouton supprimer (X) au hover
      const deleteBtn = document.createElement('span');
      deleteBtn.textContent = '×';
      deleteBtn.style.position = 'absolute';
      deleteBtn.style.right = '0';
      deleteBtn.style.top = '50%';
      deleteBtn.style.transform = 'translateY(-50%)';
      deleteBtn.style.color = 'red';
      deleteBtn.style.fontSize = '20px';
      deleteBtn.style.cursor = 'pointer';
      deleteBtn.style.opacity = '0';
      deleteBtn.style.transition = 'opacity 0.2s';
      deleteBtn.onclick = () => this.deleteLigne(nomAnime, index);

      ligne.onmouseenter = () => (deleteBtn.style.opacity = '1');
      ligne.onmouseleave = () => (deleteBtn.style.opacity = '0');

      if (item.type === 'titre') {
        ligne.innerHTML = `<strong style="font-size: 22px;">${item.texte}</strong>`;
      } else if (item.type === 'entrée') {
        ligne.innerHTML = `
          <strong>${item.nom}</strong> - 
          ${item.type} - 
          ${item.statut}
        `;
      } else if (item.type === 'separateur') {
        ligne.innerHTML = '<hr style="border: none; border-top: 3px solid #ccc; margin: 20px 0;">';
      }

      ligne.appendChild(deleteBtn);
      contentContainer.appendChild(ligne);
    });
  },

  // Ajoute un titre (champ texte éditable)
  addTitre(container, nomAnime) {
    const texte = prompt("Titre du groupe (ex: Trame principale) :");
    if (!texte) return;

    const sousMenus = JSON.parse(localStorage.getItem(SOUS_MENU_KEY) || '{}');
    if (!sousMenus[nomAnime]) sousMenus[nomAnime] = [];
    sousMenus[nomAnime].push({ type: 'titre', texte });
    localStorage.setItem(SOUS_MENU_KEY, JSON.stringify(sousMenus));

    this.loadAndDisplay(nomAnime, document.getElementById('sous-menu-content'));
  },

  // Ajoute une entrée complète
  addEntree(container, nomAnime) {
    const nom = prompt("Nom de l'œuvre :");
    if (!nom) return;

    const type = prompt("Type (Anime, Film, OAV) :", "Anime");
    if (!['Anime', 'Film', 'OAV'].includes(type)) {
      alert("Type invalide. Choisis Anime, Film ou OAV.");
      return;
    }

    const statut = prompt("Statut (Terminé, En Cours, En Pause, A Regarder) :", "En Cours");
    if (!['Terminé', 'En Cours', 'En Pause', 'A Regarder'].includes(statut)) {
      alert("Statut invalide.");
      return;
    }

    const sousMenus = JSON.parse(localStorage.getItem(SOUS_MENU_KEY) || '{}');
    if (!sousMenus[nomAnime]) sousMenus[nomAnime] = [];
    sousMenus[nomAnime].push({ type: 'entrée', nom, type, statut });
    localStorage.setItem(SOUS_MENU_KEY, JSON.stringify(sousMenus));

    this.loadAndDisplay(nomAnime, document.getElementById('sous-menu-content'));
  },

  // Ajoute un séparateur
  addSeparateur(container, nomAnime) {
    const sousMenus = JSON.parse(localStorage.getItem(SOUS_MENU_KEY) || '{}');
    if (!sousMenus[nomAnime]) sousMenus[nomAnime] = [];
    sousMenus[nomAnime].push({ type: 'separateur' });
    localStorage.setItem(SOUS_MENU_KEY, JSON.stringify(sousMenus));

    this.loadAndDisplay(nomAnime, document.getElementById('sous-menu-content'));
  },

  // Supprime une ligne
  deleteLigne(nomAnime, index) {
    if (!confirm("Supprimer cette ligne ?")) return;

    const sousMenus = JSON.parse(localStorage.getItem(SOUS_MENU_KEY) || '{}');
    if (sousMenus[nomAnime]) {
      sousMenus[nomAnime].splice(index, 1);
      localStorage.setItem(SOUS_MENU_KEY, JSON.stringify(sousMenus));
      this.loadAndDisplay(nomAnime, document.getElementById('sous-menu-content'));
    }
  }
};

// Initialisation au chargement
document.addEventListener('DOMContentLoaded', () => {
  SousMenuManager.init();

  // Ré-init quand on change de page (car les cartes sont rechargées dynamiquement)
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      setTimeout(() => SousMenuManager.init(), 100); // petit délai pour laisser le DOM se mettre à jour
    });
  });
});
