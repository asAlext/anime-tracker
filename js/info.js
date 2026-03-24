// info.js – Boutons fonctionnels + cover au bon endroit
function showInfosPage(animeData) {
  console.log("showInfosPage appelé avec :", animeData);

  // Switch vers la page Infos
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

  // === BOUTONS (on leur donne leur fonction) ===

  // Bouton Retour
  document.getElementById('btn-retour').onclick = () => {
    document.getElementById('page-infos').style.display = 'none';
    document.getElementById('page-detail').style.display = 'block';
  };

  // Bouton Titre (à coder plus tard)
  document.getElementById('btn-titre').onclick = () => {
    alert("Fonction Titre → à venir (on ajoutera un gros textarea)");
  };

  // Bouton +1 (à coder plus tard)
  document.getElementById('btn-plus1').onclick = () => {
    alert("Fonction +1 → à venir (nom + type + statut)");
  };

  // Bouton Séparateur (à coder plus tard)
  document.getElementById('btn-separateur').onclick = () => {
    alert("Fonction Séparateur → à venir");
  };
}
