// info.js – Version propre pour que la cover soit au même endroit que page détail

function showInfosPage(animeData) {
  console.log("showInfosPage appelé avec :", animeData);

  // Switch page
  document.querySelectorAll('.page').forEach(page => page.style.display = 'none');
  document.getElementById('page-infos').style.display = 'block';

  // === COVER (exactement comme dans la page détail) ===
  const cover = document.getElementById('infos-cover-anime');
  if (cover) {
    cover.src = animeData.urlCover || 'https://placehold.co/420x590?text=Cover+Anime';
    cover.style.width = '420px';
    cover.style.height = '590px';
    cover.style.objectFit = 'cover';
  }

  // Cache temporairement le rectangle blanc (infos-content)
  const contentBox = document.getElementById('infos-content');
  if (contentBox) {
    contentBox.style.display = 'none';   // ← On le cache pour l’instant
  }

  console.log("Cover chargée correctement");
}
