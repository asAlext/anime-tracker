// info.js – Retour fonctionnel + cover OK
function showInfosPage(animeData) {
  console.log("showInfosPage appelé avec :", animeData);

  // Afficher la page Infos
  document.querySelectorAll('.page').forEach(page => page.style.display = 'none');
  document.getElementById('page-infos').style.display = 'block';

  // Cover (on ne touche plus jamais à ça)
  const cover = document.getElementById('infos-cover-anime');
  if (cover) {
    cover.src = animeData.urlCover || 'https://placehold.co/420x590?text=Cover+Anime';
    cover.style.width = '420px';
    cover.style.height = '590px';
    cover.style.objectFit = 'cover';
    cover.style.marginTop = '80px';
  }

  // ====================== BOUTONS ======================

  // Bouton Retour → revient sur la page détail
  document.getElementById('btn-retour').onclick = () => {
    document.getElementById('page-infos').style.display = 'none';
    document.getElementById('page-detail').style.display = 'block';
  };

  // Les 3 autres boutons (on les laisse en test pour l’instant)
  document.getElementById('btn-titre').onclick = () => alert("→ Fonction Titre (à coder ensuite)");
  document.getElementById('btn-plus1').onclick = () => alert("→ Fonction +1 (nom + type + statut)");
  document.getElementById('btn-separateur').onclick = () => alert("→ Fonction Séparateur (à coder ensuite)");
}
