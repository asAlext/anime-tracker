let data = loadData();
let activeGameId = null;

const gamesView = document.getElementById("games-view");
const gameDetailView = document.getElementById("game-detail-view");
const gamesList = document.getElementById("games-list");
const gamesEmpty = document.getElementById("games-empty");
const gameTitle = document.getElementById("game-title");
const gameProgress = document.getElementById("game-progress");
const progressFill = document.getElementById("progress-fill");
const stepsList = document.getElementById("steps-list");
const stepsEmpty = document.getElementById("steps-empty");
const addGameDialog = document.getElementById("add-game-dialog");
const addGameForm = document.getElementById("add-game-form");
const gameNameInput = document.getElementById("game-name-input");
const addStepForm = document.getElementById("add-step-form");
const stepInput = document.getElementById("step-input");

document.getElementById("add-game-btn").addEventListener("click", () => {
  gameNameInput.value = "";
  addGameDialog.showModal();
});

document.getElementById("cancel-game-btn").addEventListener("click", () => {
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
    items: [],
  });

  saveData(data);
  addGameDialog.close();
  renderGamesView();
});

document.getElementById("back-btn").addEventListener("click", () => {
  activeGameId = null;
  showGamesView();
});

document.getElementById("delete-game-btn").addEventListener("click", () => {
  const game = getActiveGame();
  if (!game) {
    return;
  }

  const confirmed = confirm(`Supprimer "${game.name}" et toutes ses étapes ?`);
  if (!confirmed) {
    return;
  }

  data.games = data.games.filter((entry) => entry.id !== game.id);
  saveData(data);
  activeGameId = null;
  showGamesView();
});

addStepForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const game = getActiveGame();
  if (!game) {
    return;
  }

  const label = stepInput.value.trim();
  if (!label) {
    return;
  }

  game.items.push({
    id: createId(),
    label,
    completed: false,
  });

  saveData(data);
  stepInput.value = "";
  renderGameDetail();
});

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
    const card = document.createElement("article");
    card.className = "game-card";
    card.innerHTML = `
      <div>
        <h3>${escapeHtml(game.name)}</h3>
        <p>${game.items.length} étape${game.items.length > 1 ? "s" : ""} · ${progress}% complété</p>
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

  const progress = getGameProgress(game);
  const completedCount = game.items.filter((item) => item.completed).length;

  gameTitle.textContent = game.name;
  gameProgress.textContent = `${completedCount} / ${game.items.length} étapes complétées (${progress}%)`;
  progressFill.style.width = `${progress}%`;

  stepsList.innerHTML = "";

  if (!game.items.length) {
    stepsEmpty.classList.remove("hidden");
    return;
  }

  stepsEmpty.classList.add("hidden");

  game.items.forEach((item) => {
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
      game.items = game.items.filter((entry) => entry.id !== item.id);
      saveData(data);
      renderGameDetail();
      renderGamesView();
    });

    li.appendChild(checkbox);
    li.appendChild(label);
    li.appendChild(deleteBtn);
    stepsList.appendChild(li);
  });
}

function escapeHtml(text) {
  const element = document.createElement("div");
  element.textContent = text;
  return element.innerHTML;
}

renderGamesView();
