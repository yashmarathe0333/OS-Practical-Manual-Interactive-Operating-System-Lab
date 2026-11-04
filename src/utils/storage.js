/**
 * LocalStorage management for OS Practical Manual
 */

const STORAGE_KEYS = {
  COMPLETED_PRACTICALS: 'os_lab_completed_ids',
  CUSTOM_CODE: 'os_lab_custom_code_v1',
  THEME: 'os_lab_theme',
  ACTIVE_PRACTICAL: 'os_lab_active_id',
};

export function getCompletedPracticals() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.COMPLETED_PRACTICALS);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Failed to read completed practicals:', e);
    return [];
  }
}

export function togglePracticalCompletion(id) {
  const completed = getCompletedPracticals();
  let updated;
  if (completed.includes(id)) {
    updated = completed.filter(item => item !== id);
  } else {
    updated = [...completed, id];
  }
  try {
    localStorage.setItem(STORAGE_KEYS.COMPLETED_PRACTICALS, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save completion state:', e);
  }
  return updated;
}

export function getSavedCode(id, defaultCode) {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CUSTOM_CODE);
    const store = raw ? JSON.parse(raw) : {};
    return store[id] !== undefined ? store[id] : defaultCode;
  } catch (e) {
    return defaultCode;
  }
}

export function saveCode(id, code) {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CUSTOM_CODE);
    const store = raw ? JSON.parse(raw) : {};
    store[id] = code;
    localStorage.setItem(STORAGE_KEYS.CUSTOM_CODE, JSON.stringify(store));
  } catch (e) {
    console.error('Failed to save custom code:', e);
  }
}

export function resetCode(id) {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CUSTOM_CODE);
    if (!raw) return;
    const store = JSON.parse(raw);
    delete store[id];
    localStorage.setItem(STORAGE_KEYS.CUSTOM_CODE, JSON.stringify(store));
  } catch (e) {
    console.error('Failed to reset custom code:', e);
  }
}

export function getSavedTheme() {
  try {
    return localStorage.getItem(STORAGE_KEYS.THEME) || 'dark';
  } catch (e) {
    return 'dark';
  }
}

export function saveTheme(theme) {
  try {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  } catch (e) {
    console.error('Failed to save theme:', e);
  }
}
