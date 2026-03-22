// info.js – Gestion de la page Infos

let currentAnimeNom = null;

function showInfosPage(animeData) {
  currentAnimeNom = animeData.nom;

  // Switch page
  document.querySelectorAll('.page').forEach(page => page.style.display = 'none');
  document.getElementById('page-infos').style.display = 'block';

  // Cover – force le chargement
  const coverEl = document.getElementById('infos-cover-anime');
  if (coverEl) {
    coverEl.src = ''; // reset d'abord pour forcer le rechargement
    coverEl.src = animeData.urlCover || 'https://placehold.co/420x590?text=Cover+Anime';
    coverEl.style.width = '420px';
    coverEl.style.height = '590px';
    coverEl.style.objectFit = 'cover';
    coverEl.style.display = 'block'; // force visible
    console.log('Cover chargée pour :', animeData.nom, 'URL:', coverEl.src);
  } else {
    console.error('Impossible de trouver #infos-cover-anime dans la page');
  }
}
