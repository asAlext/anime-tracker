// info.js – Gestion de la page Infos

let currentAnimeNom = null; // On garde le nom de l'anime actuel pour savoir où sauvegarder

function showInfosPage(animeData) {
  currentAnimeNom = animeData.nom;

  // Affiche la page Infos
  document.querySelectorAll('.page').forEach(page => page.style.display = 'none');
  document.getElementById('page-infos').style.display = 'block';

  // Affiche la cover
  const coverEl = document.getElementById('infos-cover-anime');
  coverEl.src = animeData.urlCover || 'https://placehold.co/420x590?text=Cover+Anime';

  // Charge et affiche les lignes existantes (on fera ça après)
  loadInfosContent();
}

// Charger les lignes sauvegardées (à implémenter après)
function loadInfosContent() {
  // On remplira cette fonction plus tard
}

// Retour vers la page détail
document.getElementById('btn-retour-detail').onclick = () => {
  document.querySelectorAll('.page').forEach(page => page.style.display = 'none');
  document.getElementById('page-detail').style.display = 'block';
};
