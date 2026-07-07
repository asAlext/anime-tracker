let data = { games: [] };
let activeGameId = null;

const gamesView = document.getElementById("games-view");
const gameDetailView = document.getElementById("game-detail-view");
const gamesList = document.getElementById("games-list");
const gamesEmpty = document.getElementById("games-empty");
const gameTitle = document.getElementById("game-title");
const gameProgress = document.getElementById("game-progress");
const progressFill = document.getElementById("progress-fill");
const chaptersList = document.getElementById("chapters-list");
const chaptersEmpty = document.getElementById("chapters-empty");
const addGameDialog = document.getElementById("add-game-dialog");
const addGameForm = document.getElementById("add-game-form");
const gameNameInput = document.getElementById("game-name-input");
const addChapterDialog = document.getElementById("add-chapter-dialog");
const addChapterForm = document.getElementById("add-chapter-form");
const chapterNameInput = document.getElementById("chapter-name-input");

function initApp() {
  data = loadData();

  const addGameBtn = document.getElementById("add-game-btn");
  const addChapterBtn = document.getElementById("add-chapter-btn");
  const backBtn = document.getElementById("back-btn");
  const deleteGameBtn = document.getElementById("delete-game-btn");
  const cancelGameBtn = document.getElementById("cancel-game-btn");
  const cancelChapterBtn = document.getElementById("cancel-chapter-btn");

  if (
    !addGameBtn ||
    !addChapterBtn ||
    !addGameDialog ||
    !addChapterDialog ||
    !chaptersList
  ) {
    alert(
      "Le site n'est pas à jour dans ton navigateur. Fais Ctrl+F5 pour recharger la page."
    );
    return;
  }

  addGameBtn.addEventListener("click", () => {
    gameNameInput.value = "";
    addGameDialog.showModal();
  });

  cancelGameBtn.addEventListener("click", () => {
    addGameDialog.close();
  });

  addGameForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = gameNameInput.value.trim();
    if (!name) {
      return;
    }

    data.games.push({
      id: createId(),
      name,
      chapters: [],
    });

    saveData(data);
    addGameDialog.close();
    renderGamesView();
  });

  addChapterBtn.addEventListener("click", () => {
    chapterNameInput.value = "";
    addChapterDialog.showModal();
  });

  cancelChapterBtn.addEventListener("click", () => {
    addChapterDialog.close();
  });

  addChapterForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const game = getActiveGame();
    if (!game) {
      return;
    }

    const name = chapterNameInput.value.trim();
    if (!name) {
      return;
    }

    game.chapters.push({
      id: createId(),
      name,
      items: [],
    });

    saveData(data);
    addChapterDialog.close();
    renderGameDetail();
  });

  backBtn.addEventListener("click", () => {
    activeGameId = null;
    showGamesView();
  });

  deleteGameBtn.addEventListener("click", () => {
    const game = getActiveGame();
    if (!game) {
      return;
    }

    const confirmed = confirm(
      `Supprimer "${game.name}" et tous ses chapitres ?`
    );
    if (!confirmed) {
      return;
    }

    data.games = data.games.filter((entry) => entry.id !== game.id);
    saveData(data);
    activeGameId = null;
    showGamesView();
  });

  renderGamesView();
}

function getActiveGame() {
  return data.games.find((game) => game.id === activeGameId) ?? null;
}

function showGamesView() {
  gamesView.classList.remove("hidden");
  gameDetailView.classList.add("hidden");
  renderGamesView();
}

function showGameDetail(gameId) {
  activeGameId = gameId;
  gamesView.classList.add("hidden");
  gameDetailView.classList.remove("hidden");
  renderGameDetail();
}

function renderGamesView() {
  gamesList.innerHTML = "";

  if (!data.games.length) {
    gamesEmpty.classList.remove("hidden");
    return;
  }

  gamesEmpty.classList.add("hidden");

  data.games.forEach((game) => {
    const progress = getGameProgress(game);
    const itemCount = getAllGameItems(game).length;
    const chapterCount = game.chapters.length;
    const card = document.createElement("article");
    card.className = "game-card";
    card.innerHTML = `
      <div>
        <h3>${escapeHtml(game.name)}</h3>
        <p>${chapterCount} chapitre${chapterCount > 1 ? "s" : ""} · ${itemCount} étape${itemCount > 1 ? "s" : ""} · ${progress}% complété</p>
      </div>
      <span>→</span>
    `;

    card.addEventListener("click", () => showGameDetail(game.id));
    gamesList.appendChild(card);
  });
}

function renderGameDetail() {
  const game = getActiveGame();
  if (!game) {
    showGamesView();
    return;
  }

  const allItems = getAllGameItems(game);
  const progress = getGameProgress(game);
  const completedCount = allItems.filter((item) => item.completed).length;

  gameTitle.textContent = game.name;
  gameProgress.textContent = `${completedCount} / ${allItems.length} étapes complétées (${progress}%) · ${game.chapters.length} chapitre${game.chapters.length > 1 ? "s" : ""}`;
  progressFill.style.width = `${progress}%`;

  chaptersList.innerHTML = "";

  if (!game.chapters.length) {
    chaptersEmpty.classList.remove("hidden");
    return;
  }

  chaptersEmpty.classList.add("hidden");

  game.chapters.forEach((chapter) => {
    chaptersList.appendChild(createChapterElement(game, chapter));
  });
}

function createChapterElement(game, chapter) {
  const items = Array.isArray(chapter.items) ? chapter.items : [];
  const chapterProgress = getChapterProgress(chapter);
  const completedInChapter = items.filter((item) => item.completed).length;
  const section = document.createElement("section");
  section.className = "chapter-card";

  const header = document.createElement("div");
  header.className = "chapter-header";
  header.innerHTML = `
    <div>
      <h4>${escapeHtml(chapter.name)}</h4>
      <p class="chapter-progress-text">${completedInChapter} / ${items.length} étapes · ${chapterProgress}%</p>
    </div>
    <button type="button" class="btn btn-danger btn-small">Supprimer</button>
  `;

  header.querySelector("button").addEventListener("click", () => {
    const confirmed = confirm(`Supprimer le chapitre "${chapter.name}" ?`);
    if (!confirmed) {
      return;
    }

    game.chapters = game.chapters.filter((entry) => entry.id !== chapter.id);
    saveData(data);
    renderGameDetail();
    renderGamesView();
  });

  const progressBar = document.createElement("div");
  progressBar.className = "progress-bar chapter-progress-bar";
  const progressFillEl = document.createElement("div");
  progressFillEl.className = "progress-fill";
  progressFillEl.style.width = `${chapterProgress}%`;
  progressBar.appendChild(progressFillEl);

  const addStepForm = document.createElement("form");
  addStepForm.className = "add-step-form";
  addStepForm.innerHTML = `
    <input type="text" placeholder="Nouvelle étape dans ce chapitre" required />
    <button type="submit" class="btn btn-primary">Ajouter</button>
  `;

  addStepForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const input = addStepForm.querySelector("input");
    const label = input.value.trim();
    if (!label) {
      return;
    }

    if (!Array.isArray(chapter.items)) {
      chapter.items = [];
    }

    chapter.items.push({
      id: createId(),
      label,
      completed: false,
    });

    saveData(data);
    input.value = "";
    renderGameDetail();
    renderGamesView();
  });

  const stepsList = document.createElement("ul");
  stepsList.className = "steps-list";

  section.appendChild(header);
  section.appendChild(progressBar);
  section.appendChild(addStepForm);

  if (!items.length) {
    const empty = document.createElement("p");
    empty.className = "chapter-empty";
    empty.textContent = "Aucune étape dans ce chapitre.";
    section.appendChild(empty);
    return section;
  }

  items.forEach((item) => {
    const li = document.createElement("li");
    li.className = `step-item${item.completed ? " completed" : ""}`;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = item.completed;
    checkbox.addEventListener("change", () => {
      item.completed = checkbox.checked;
      saveData(data);
      renderGameDetail();
      renderGamesView();
    });

    const label = document.createElement("span");
    label.className = "step-label";
    label.textContent = item.label;

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "btn-icon";
    deleteBtn.title = "Supprimer l'étape";
    deleteBtn.textContent = "✕";
    deleteBtn.addEventListener("click", () => {
      chapter.items = chapter.items.filter((entry) => entry.id !== item.id);
      saveData(data);
      renderGameDetail();
      renderGamesView();
    });

    li.appendChild(checkbox);
    li.appendChild(label);
    li.appendChild(deleteBtn);
    stepsList.appendChild(li);
  });

  section.appendChild(stepsList);

  return section;
}

function escapeHtml(text) {
  const element = document.createElement("div");
  element.textContent = text;
  return element.innerHTML;
}

initApp();
