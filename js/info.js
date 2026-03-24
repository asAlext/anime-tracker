// info.js – Page Infos (cover bien placée + suppression du rectangle blanc)

function showInfosPage(animeData) {
  console.log("showInfosPage appelé avec :", animeData);

  // Switch vers la page Infos
  document.querySelectorAll('.page').forEach(page => page.style.display = 'none');
  document.getElementById('page-infos').style.display = 'block';

  // Cover - même style et position que dans la page détail
  const cover = document.getElementById('infos-cover-anime');
  if (cover) {
    cover.src = animeData.urlCover || 'https://placehold.co/420x590?text=Cover+Anime';
    cover.style.width = '420px';
    cover.style.height = '590px';
    cover.style.objectFit = 'cover';
    cover.style.display = 'block';
    console.log("Cover chargée :", cover.src);
  } else {
    console.error("ERREUR : #infos-cover-anime non trouvé !");
  }

  // Nettoyage du rectangle blanc (on vide le contenu au cas où)
  const content = document.getElementById('infos-content');
  if (content) content.innerHTML = '';
}
