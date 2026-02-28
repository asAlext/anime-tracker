// main.js – Navigation + gestion ajout anime

// Fonction switchPage (déjà présente, on la garde)
function switchPage(mode) {
  document.querySelectorAll('.page').forEach(page => {
    page.style.display = 'none';
    page.classList.remove('active');
  });

  const pageElement = document.getElementById(`page-${mode}`);
  if (pageElement) {
    pageElement.style.display = 'block';
    pageElement.classList.add('active');
  }

  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.mode === mode) {
      btn.classList.add('active');
    }
  });
}

// Gestion du formulaire ajout anime
document.addEventListener('DOMContentLoaded', () => {
  const formAjout = document.getElementById('form-ajout-anime');
  if (formAjout) {
    formAjout.addEventListener('submit', async (e) => {
      e.preventDefault(); // ← bloque le refresh de la page

      const nom = document.getElementById('nom-anime').value.trim();
      const type = document.getElementById('type-anime').value;
      const statut = document.getElementById('statut-anime').value;
      const note = document.getElementById('note-anime').value.trim() || 'NA';
      const urlCover = document.getElementById('poster-anime').value.trim() || ''; // vide = cover par défaut plus tard

      if (!nom || !type || !statut) {
        alert('Nom, Type et Statut sont obligatoires');
        return;
      }

      // Création de la carte anime
      const card = document.createElement('div');
      card.className = 'anime-card';

      // Image (URL fournie ou placeholder)
      const img = document.createElement('img');
      img.src = urlCover || 'https://via.placeholder.com/220x300?text=' + encodeURIComponent(nom);
      img.alt = nom;
      card.appendChild(img);

      // Infos
      const info = document.createElement('div');
      info.className = 'anime-info';
      info.innerHTML = `
        <h4>${nom}</h4>
        <p>${type} • ${statut}</p>
        <p>Note : ${note}</p>
      `;
      card.appendChild(info);

      // Ajout à la grille
      document.getElementById('anime-grid').appendChild(card);

      // Reset formulaire
      formAjout.reset();

      // Optionnel : mise à jour compteur (à implémenter plus tard)
      // Exemple : document.getElementById('count-' + statut).textContent = parseInt(...) + 1;
    });
  }
});
