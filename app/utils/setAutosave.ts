import { STORAGE_AUTOSAVE_KEY } from '~/constants';
import type { TextObject } from '~/types';

export function setAutosave(text: TextObject) {
  localStorage.setItem(STORAGE_AUTOSAVE_KEY, JSON.stringify(text));
}