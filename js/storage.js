const STORAGE_KEY = "checklist-g-data";

function createId() {
  return crypto.randomUUID();
}

function migrateGame(game) {
  if (Array.isArray(game.chapters)) {
    return game;
  }

  const oldItems = Array.isArray(game.items) ? game.items : [];

  return {
    id: game.id,
    name: game.name,
    chapters: oldItems.length
      ? [{ id: createId(), name: "Général", items: oldItems }]
      : [],
  };
}

function loadData() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return { games: [] };
  }

  try {
    const data = JSON.parse(raw);
    const games = Array.isArray(data.games) ? data.games.map(migrateGame) : [];
    return { games };
  } catch {
    return { games: [] };
  }
}

function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function getAllGameItems(game) {
  return game.chapters.flatMap((chapter) => chapter.items);
}

function getChapterProgress(chapter) {
  if (!chapter.items.length) {
    return 0;
  }

  const completed = chapter.items.filter((item) => item.completed).length;
  return Math.round((completed / chapter.items.length) * 100);
}

function getGameProgress(game) {
  const items = getAllGameItems(game);
  if (!items.length) {
    return 0;
  }

  const completed = items.filter((item) => item.completed).length;
  return Math.round((completed / items.length) * 100);
}
