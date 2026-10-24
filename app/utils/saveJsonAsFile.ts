import type { TextObject } from '~/types';

export function saveJsonAsFile(textObject: TextObject, name: string = 'my_text.json') {
  const savingTextBlob = new Blob([JSON.stringify(textObject)]);

  const link = document.createElement('a');

  link.href = URL.createObjectURL(savingTextBlob);
  link.download = name;
  link.click();
}