import { STORAGE_AUTOSAVE_KEY } from '~/constants';

export function setAutosave(text: string) {
  localStorage.setItem(STORAGE_AUTOSAVE_KEY, text);
}