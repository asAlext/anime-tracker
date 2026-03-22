// info.js – Gestion de la page Infos

let currentAnimeNom = null;  // Pour savoir quel anime on modifie (utile plus tard)

function showInfosPage(animeData) {
  currentAnimeNom = animeData.nom;

  // Switch affichage
  document.querySelectorAll('.page').forEach(page => page.style.display = 'none');
  document.getElementById('page-infos').style.display = 'block';

  // === AFFICHAGE DE LA COVER (exactement comme dans la page détail) ===
  const coverEl = document.getElementById('infos-cover-anime');
  if (coverEl) {
    coverEl.src = animeData.urlCover || 'https://placehold.co/420x590?text=Cover+Anime';
    coverEl.style.width = '420px';
    coverEl.style.height = '590px';
    coverEl.style.objectFit = 'cover';
  } else {
    console.error('Élément #infos-cover-anime non trouvé dans la page');
  }

  console.log('Page Infos ouverte pour :', animeData.nom);
}
