// info.js – Cover au même endroit que la page détail
function showInfosPage(animeData) {
  console.log("showInfosPage appelé avec :", animeData);

  // Switch vers la page Infos
  document.querySelectorAll('.page').forEach(page => page.style.display = 'none');
  document.getElementById('page-infos').style.display = 'block';

  // === COVER (exactement même taille + position que page détail) ===
  const cover = document.getElementById('infos-cover-anime');
  if (cover) {
    cover.src = animeData.urlCover || 'https://placehold.co/420x590?text=Cover+Anime';
    
    // Taille fixe identique à la page détail
    cover.style.width = '420px';
    cover.style.height = '590px';
    cover.style.objectFit = 'cover';
    
    // Décalage vers le bas pour être au même niveau que dans la page détail
    cover.style.marginTop = '80px';   // ← c’est ce qui corrige le "trop haut"
  }

  // On garde le rectangle blanc caché pour l’instant
  const contentBox = document.getElementById('infos-content');
  if (contentBox) contentBox.style.display = 'none';

  console.log("Cover placée correctement");
}
