export const getLocalStorage = (key: string) => {
  const value = localStorage.getItem(key);

  if (!value) return null;

  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

