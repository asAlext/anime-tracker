// anime-form.js – Gestion du formulaire ajout anime et grille

document.addEventListener('DOMContentLoaded', () => {
  const formAjout = document.getElementById('form-ajout-anime');
  if (formAjout) {
    formAjout.addEventListener('submit', async (e) => {
      e.preventDefault(); // Bloque le refresh

      const nom = document.getElementById('nom-anime').value.trim();
      const type = document.getElementById('type-anime').value;
      const statut = document.getElementById('statut-anime').value;
      const note = document.getElementById('note-anime').value.trim() || 'NA';
      let urlCover = document.getElementById('poster-anime').value.trim();

      if (!nom || !type || !statut) {
        alert('Nom, Type et Statut sont obligatoires');
        return;
      }

      // Si pas d'URL Cover, fetch depuis Jikan API
      if (!urlCover) {
        try {
          const response = await fetch(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(nom)}&limit=1`);
          const data = await response.json();
          if (data.data && data.data[0] && data.data[0].images.jpg.image_url) {
            urlCover = data.data[0].images.jpg.image_url;
          } else {
            urlCover = 'https://via.placeholder.com/220x310?text=' + encodeURIComponent(nom);
          }
        } catch (error) {
          urlCover = 'https://via.placeholder.com/220x310?text=' + encodeURIComponent(nom);
        }
      }

      // Création de la carte (comme la photo)
      const card = document.createElement('div');
      card.className = 'anime-card';
      card.onclick = () => {
        alert('Page détail à venir pour : ' + nom);
        // Plus tard : bascule vers page détail
      };

      const imgWrapper = document.createElement('div');
      imgWrapper.className = 'img-wrapper';
      const img = document.createElement('img');
      img.src = urlCover;
      img.alt = nom;
      imgWrapper.appendChild(img);

      // Note bottom left
      const noteDiv = document.createElement('div');
      noteDiv.className = 'note';
      noteDiv.innerHTML = '&#9733; ' + note;
      imgWrapper.appendChild(noteDiv);

      // Type bottom right
      const typeDiv = document.createElement('div');
      typeDiv.className = 'type';
      typeDiv.textContent = type.toUpperCase();
      imgWrapper.appendChild(typeDiv);

      card.appendChild(imgWrapper);

      // Ajout à la grille
      document.getElementById('anime-grid').appendChild(card);

      // Mise à jour compteur statut
      const countId = 'count-' + statut.replace(/ /g, '-').toLowerCase();
      const countElement = document.getElementById(countId);
      if (countElement) {
        countElement.textContent = parseInt(countElement.textContent) + 1;
      }

      // Reset formulaire
      formAjout.reset();
    });
  }
});
