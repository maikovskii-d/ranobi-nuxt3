import { STORAGE_AUTOSAVE_KEY } from '~/constants';

export function getAutosave(): string | null {
  return localStorage.getItem(STORAGE_AUTOSAVE_KEY) ?? null;
}