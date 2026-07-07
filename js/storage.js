const STORAGE_KEY = "checklist-g-data";

function createId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function normalizeItem(item) {
  return {
    id: item?.id || createId(),
    label: String(item?.label || item?.text || "").trim(),
    completed: Boolean(item?.completed),
  };
}

function normalizeChapter(chapter) {
  const items = Array.isArray(chapter?.items) ? chapter.items.map(normalizeItem) : [];

  return {
    id: chapter?.id || createId(),
    name: String(chapter?.name || "Sans nom").trim() || "Sans nom",
    items: items.filter((item) => item.label),
  };
}

function normalizeGame(game) {
  const chapters = Array.isArray(game?.chapters)
    ? game.chapters.map(normalizeChapter)
    : [];

  const legacyItems = Array.isArray(game?.items) ? game.items.map(normalizeItem) : [];

  if (legacyItems.length) {
    chapters.unshift({
      id: createId(),
      name: "Général",
      items: legacyItems.filter((item) => item.label),
    });
  }

  return {
    id: game?.id || createId(),
    name: String(game?.name || "Sans nom").trim() || "Sans nom",
    chapters,
  };
}

function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return { games: [] };
    }

    const parsed = JSON.parse(raw);
    const games = Array.isArray(parsed.games)
      ? parsed.games.map(normalizeGame)
      : [];

    const normalized = { games };
    saveData(normalized);
    return normalized;
  } catch (error) {
    console.error("Impossible de charger les données :", error);
    return { games: [] };
  }
}

function saveData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error("Impossible de sauvegarder les données :", error);
    alert(
      "Impossible de sauvegarder. Ouvre le site avec le fichier start.bat pour éviter ce problème."
    );
    return false;
  }
}

function getAllGameItems(game) {
  const chapters = Array.isArray(game?.chapters) ? game.chapters : [];
  return chapters.flatMap((chapter) =>
    Array.isArray(chapter.items) ? chapter.items : []
  );
}

function getChapterProgress(chapter) {
  const items = Array.isArray(chapter?.items) ? chapter.items : [];
  if (!items.length) {
    return 0;
  }

  const completed = items.filter((item) => item.completed).length;
  return Math.round((completed / items.length) * 100);
}

function getGameProgress(game) {
  const items = getAllGameItems(game);
  if (!items.length) {
    return 0;
  }

  const completed = items.filter((item) => item.completed).length;
  return Math.round((completed / items.length) * 100);
}
