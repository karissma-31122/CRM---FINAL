// Convert between JavaScript objects and Local Storage strings.
export function readData(key, fallback) {
  try {
    const value = localStorage.getItem('clientpilot-v3-' + key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

export function saveData(key, value) {
  localStorage.setItem('clientpilot-v3-' + key, JSON.stringify(value));
}

export function makeId() {
  return crypto.randomUUID();
}
