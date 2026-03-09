// waifu-form.js – Gestion du formulaire ajout waifu et grille

document.addEventListener('DOMContentLoaded', () => {
  const formAjout = document.getElementById('form-ajout-waifu');
  const messageError = document.createElement('p');
  messageError.id = 'form-error-waifu';
  messageError.style.color = 'red';
  messageError.style.marginTop = '10px';
  messageError.style.textAlign = 'center';
  formAjout.appendChild(messageError);

  if (formAjout) {
    formAjout.addEventListener('submit', async (e) => {
      e.preventDefault();

      const nom = document.getElementById('nom-waifu').value.trim();
      const note = document.getElementById('note-waifu').value.trim() || 'NA';
      let urlCover = document.getElementById('poster-waifu').value.trim();

      messageError.textContent = '';

      if (!nom) {
        messageError.textContent = 'Nom est obligatoire';
        return;
      }

      // Si pas d'URL Cover, placeholder
      if (!urlCover) {
        urlCover = `https://placehold.co/220x350?text=${encodeURIComponent(nom)}`;
      }

      // Création de la carte – nom directement sous l’image, sans conteneur
      const card = document.createElement('div');
      card.className = 'anime-card'; // réutilise le style anime-card
      card.innerHTML = `
        <div class="img-wrapper">
          <img src="${urlCover}" alt="${nom}">
          <div class="note">★ ${note}</div>
        </div>
        ${nom}
      `;

      card.onclick = () => alert('Page détail à venir pour : ' + nom);
      document.getElementById('waifu-grid').appendChild(card);

      // Sauvegarde dans localStorage (clé 'waifus')
      const waifu = { nom, note, urlCover };
      let waifus = JSON.parse(localStorage.getItem('waifus') || '[]');
      waifus.push(waifu);
      localStorage.setItem('waifus', JSON.stringify(waifus));

      // Reset formulaire
      formAjout.reset();
    });
  }

  // Chargement des waifus sauvegardés
  const savedWaifus = JSON.parse(localStorage.getItem('waifus') || '[]');
  const grid = document.getElementById('waifu-grid');
  if (grid) {
    grid.innerHTML = ''; // Nettoyage pour éviter doublons
    savedWaifus.forEach(waifu => {
      const card = document.createElement('div');
      card.className = 'anime-card';
      card.innerHTML = `
        <div class="img-wrapper">
          <img src="${waifu.urlCover}" alt="${waifu.nom}">
          <div class="note">★ ${waifu.note}</div>
        </div>
        ${waifu.nom}
      `;
      card.onclick = () => alert('Page détail à venir pour : ' + waifu.nom);
      grid.appendChild(card);
    });
  }
});
