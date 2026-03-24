// info.js – Version debug pour fixer le bouton Retour
function showInfosPage(animeData) {
  console.log("=== showInfosPage appelé ===", animeData);

  // Switch page
  document.querySelectorAll('.page').forEach(page => page.style.display = 'none');
  document.getElementById('page-infos').style.display = 'block';

  // Cover
  const cover = document.getElementById('infos-cover-anime');
  if (cover) {
    cover.src = animeData.urlCover || 'https://placehold.co/420x590?text=Cover+Anime';
    cover.style.width = '420px';
    cover.style.height = '590px';
    cover.style.objectFit = 'cover';
    cover.style.marginTop = '80px';
  }

  // ====================== BOUTONS ======================
  const btnRetour = document.getElementById('btn-retour');
  if (btnRetour) {
    btnRetour.onclick = () => {
      console.log("Bouton Retour cliqué !");
      document.getElementById('page-infos').style.display = 'none';
      document.getElementById('page-detail').style.display = 'block';
    };
    console.log("Bouton Retour trouvé et attaché");
  } else {
    console.error("ERREUR : bouton #btn-retour non trouvé dans le HTML !");
  }

  // Boutons de test
  ['btn-titre', 'btn-plus1', 'btn-separateur'].forEach(id => {
    const btn = document.getElementById(id);
    if (btn) {
      btn.onclick = () => alert(`Bouton ${id} cliqué (à coder)`);
    } else {
      console.error(`Bouton #${id} non trouvé !`);
    }
  });
}
