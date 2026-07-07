const STORAGE_KEY = "checklist-g-data";

function createId() {
  return crypto.randomUUID();
}

function loadData() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return { games: [] };
  }

  try {
    const data = JSON.parse(raw);
    return {
      games: Array.isArray(data.games) ? data.games : [],
    };
  } catch {
    return { games: [] };
  }
}

function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function getGameProgress(game) {
  if (!game.items.length) {
    return 0;
  }

  const completed = game.items.filter((item) => item.completed).length;
  return Math.round((completed / game.items.length) * 100);
}
