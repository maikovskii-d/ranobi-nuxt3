import { STORAGE_AUTOSAVE_KEY } from '~/constants';

export function getAutosave(): TextObject | null {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_AUTOSAVE_KEY) ?? '');
  } catch {}

  return null;
}