main.js – Navigation + gestion ajout anime
// Fonction switchPage (déjà présente, on la garde)
function switchPage(mode) {
document.querySelectorAll('.page').forEach(page => {
page.style.display = 'none';
page.classList.remove('active');
});
const pageElement = document.getElementById(page-${mode});
if (pageElement) {
pageElement.style.display = 'block';
pageElement.classList.add('active');
}
document.querySelectorAll('.nav-btn').forEach(btn => {
btn.classList.remove('active');
if (btn.dataset.mode === mode) {
btn.classList.add('active');
}
});
}
// Gestion du formulaire ajout anime
document.addEventListener('DOMContentLoaded', () => {
const formAjout = document.getElementById('form-ajout-anime');
if (formAjout) {
formAjout.addEventListener('submit', async (e) => {
e.preventDefault(); // Bloque le refresh de la page
const nom = document.getElementById('nom-anime').value.trim();
const type = document.getElementById('type-anime').value;
const statut = document.getElementById('statut-anime').value;
const note = document.getElementById('note-anime').value.trim() || 'NA';
let urlCover = document.getElementById('poster-anime').value.trim();
if (!nom || !type || !statut) {
alert('Nom, Type et Statut sont obligatoires');
return;
}
// Si pas d'URL Cover, fetch depuis AniList API
if (!urlCover) {
try {
const query =             query ($search: String) {               Media(search: $search, type: ANIME) {                 coverImage {                   large                 }               }             }          ;
const variables = { search: nom };
const response = await fetch('https://graphql.anilist.co', {
method: 'POST',
headers: {'Content-Type': 'application/json'},
body: JSON.stringify({ query, variables })
});
const data = await response.json();
if (data.data && data.data.Media && data.data.Media.coverImage.large) {
urlCover = data.data.Media.coverImage.large;
} else {
urlCover = 'https://via.placeholder.com/220x310?text=' + encodeURIComponent(nom);
}
} catch (error) {
urlCover = 'https://via.placeholder.com/220x310?text=' + encodeURIComponent(nom);
}
}
// Création de la carte anime
const card = document.createElement('div');
card.className = 'anime-card';
card.onclick = () => alert('Page détail à venir pour : ' + nom);
const imgWrapper = document.createElement('div');
imgWrapper.className = 'img-wrapper';
const img = document.createElement('img');
img.src = urlCover;
img.alt = nom;
imgWrapper.appendChild(img);
// Note bottom left
const noteDiv = document.createElement('div');
noteDiv.className = 'note';
noteDiv.innerHTML = '★ ' + note;
imgWrapper.appendChild(noteDiv);
// Type bottom right
const typeDiv = document.createElement('div');
typeDiv.className = 'type';
typeDiv.textContent = type.toUpperCase();
imgWrapper.appendChild(typeDiv);
card.appendChild(imgWrapper);
// Ajout à la grille
document.getElementById('anime-grid').appendChild(card);
// Mise à jour compteur
const countId = 'count-' + statut.replace(/ /g, '-').toLowerCase();
const countElement = document.getElementById(countId);
if (countElement) {
countElement.textContent = parseInt(countElement.textContent) + 1;
}
// Reset formulaire
formAjout.reset();
});
}
});
