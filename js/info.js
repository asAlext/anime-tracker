// info.js – Version debug pour que Retour fonctionne
function showInfosPage(animeData) {
  console.log("%cshowInfosPage appelé avec :", "color: green; font-weight: bold", animeData);

  // Switch page
  document.querySelectorAll('.page').forEach(page => page.style.display = 'none');
  const infosPage = document.getElementById('page-infos');
  if (infosPage) infosPage.style.display = 'block';

  // Cover (ne jamais toucher)
  const cover = document.getElementById('infos-cover-anime');
  if (cover) {
    cover.src = animeData.urlCover || 'https://placehold.co/420x590?text=Cover+Anime';
    cover.style.width = '420px';
    cover.style.height = '590px';
    cover.style.objectFit = 'cover';
    cover.style.marginTop = '80px';
  }

  // ====================== BOUTON RETOUR ======================
  const btnRetour = document.getElementById('btn-retour');
  if (btnRetour) {
    console.log("✅ Bouton Retour trouvé, onclick attaché");
    btnRetour.onclick = () => {
      console.log("🔄 Clic sur Retour détecté");
      document.getElementById('page-infos').style.display = 'none';
      document.getElementById('page-detail').style.display = 'block';
    };
  } else {
    console.error("❌ Bouton #btn-retour NON TROUVÉ dans le HTML !");
  }

  // Les autres boutons (alert pour tester)
  const btnTitre = document.getElementById('btn-titre');
  if (btnTitre) btnTitre.onclick = () => alert("Fonction Titre → à venir");

  const btnPlus1 = document.getElementById('btn-plus1');
  if (btnPlus1) btnPlus1.onclick = () => alert("Fonction +1 → à venir");

  const btnSeparateur = document.getElementById('btn-separateur');
  if (btnSeparateur) btnSeparateur.onclick = () => alert("Fonction Séparateur → à venir");
}
