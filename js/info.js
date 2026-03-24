// info.js – Version ultra simple pour tester la cover

function showInfosPage(animeData) {
  console.log("showInfosPage appelé avec :", animeData);

  document.querySelectorAll('.page').forEach(page => page.style.display = 'none');
  document.getElementById('page-infos').style.display = 'block';

  const cover = document.getElementById('infos-cover-anime');
  if (cover) {
    cover.src = animeData.urlCover || 'https://placehold.co/420x590?text=Cover+Anime';
    console.log("Cover src mis à :", cover.src);
  } else {
    console.error("ERREUR : #infos-cover-anime non trouvé !");
  }
}
