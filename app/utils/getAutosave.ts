import { STORAGE_AUTOSAVE_KEY } from '~/constants';

export function getAutosave() {
  return localStorage.getItem(STORAGE_AUTOSAVE_KEY) ?? '';
}