export const saveSearchHistory = (keyword) => {
  const existing = JSON.parse(localStorage.getItem("SEARCH_HISTORY") || "[]");
  const updated = [keyword, ...existing.filter((item) => item !== keyword)];
  localStorage.setItem("SEARCH_HISTORY", JSON.stringify(updated.slice(0, 10)));
};
