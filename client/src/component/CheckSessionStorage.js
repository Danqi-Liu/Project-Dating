export const checkSessionStorage = (key, defaultValue) => {
  const stored = sessionStorage.getItem(key);
  if (!stored || stored === "undefined") {
    return defaultValue;
  }
  return JSON.parse(stored);
};
