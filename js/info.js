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

 // === BOUTONS FONCTIONNELS ===

  // Bouton Retour → doit vraiment revenir sur la page détail
  const btnRetour = document.getElementById('btn-retour');
  if (btnRetour) {
    btnRetour.onclick = () => {
      document.getElementById('page-infos').style.display = 'none';
      document.getElementById('page-detail').style.display = 'block';
      console.log("Retour vers page détail");
    };
  }

  // Les 3 autres boutons (on les garde en alerte pour l’instant)
  const btnTitre = document.getElementById('btn-titre');
  if (btnTitre) btnTitre.onclick = () => alert("Titre → à venir (on ajoutera un gros textarea)");

  const btnPlus1 = document.getElementById('btn-plus1');
  if (btnPlus1) btnPlus1.onclick = () => alert("+1 → à venir (nom + type + statut)");

  const btnSeparateur = document.getElementById('btn-separateur');
  if (btnSeparateur) btnSeparateur.onclick = () => alert("Séparateur → à venir");
}
