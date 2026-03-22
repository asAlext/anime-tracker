// info.js – Gestion de la page Infos (pour l’instant : juste les 4 boutons)

function showInfosPage(animeData) {
  // On garde le nom de l’anime pour plus tard (sauvegarde)
  currentAnimeNom = animeData.nom;

  // Affiche la page
  document.querySelectorAll('.page').forEach(page => page.style.display = 'none');
  document.getElementById('page-infos').style.display = 'block';

  // Affiche la cover (même que dans la page détail)
  const coverEl = document.getElementById('infos-cover-anime');
  coverEl.src = animeData.urlCover || 'https://placehold.co/420x590?text=Cover+Anime';

  // Pour l’instant : on ne fait rien d’autre
  console.log('Page Infos affichée pour l’anime :', animeData.nom);
}

// Les 4 boutons existent déjà dans ton HTML (#btn-retour-detail, #btn-ajout-titre, #btn-ajout-ligne, #btn-separateur)
// On les laisse pour l’instant sans onclick
