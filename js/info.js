// info.js – Page Infos (cover fixe + zone droite pour les boutons et contenu)
function showInfosPage(animeData) {
    console.log("showInfosPage appelé avec :", animeData);

    // Switch vers la page Infos
    document.querySelectorAll('.page').forEach(page => page.style.display = 'none');
    document.getElementById('page-infos').style.display = 'block';

    // === COVER (ne jamais toucher) ===
    const cover = document.getElementById('infos-cover-anime');
    if (cover) {
        cover.src = animeData.urlCover || 'https://placehold.co/420x590?text=Cover+Anime';
        cover.style.width = '420px';
        cover.style.height = '590px';
        cover.style.objectFit = 'cover';
        cover.style.marginTop = '80px';
    }

    // === ZONE DROITE (jusqu’au bord) ===
    const rightZone = document.getElementById('infos-right-zone');
    if (rightZone) {
        rightZone.innerHTML = ''; // on vide à chaque fois pour éviter doublons

        // On va mettre ici les boutons + futur contenu (Titre, +1, Séparateur)
        const container = document.createElement('div');
        container.style.padding = '40px 30px';
        container.style.background = '#fefaf4';
        container.style.minHeight = '590px';
        container.style.borderLeft = '1px solid #ddd';

        // Placeholder pour les boutons et lignes futures
        container.innerHTML = `
            <h3 style="margin-bottom: 30px; color: #333;">Informations supplémentaires pour ${animeData.nom}</h3>
            <p style="color: #666;">Les boutons "Retour", "Titre", "+1" et "Séparateur" seront ajoutés ici.</p>
            <p style="color: #666; margin-top: 20px;">Zone de droite prête – jusqu’au bord.</p>
        `;

        rightZone.appendChild(container);
    }
}
