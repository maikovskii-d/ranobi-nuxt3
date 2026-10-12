export function saveTextAsFile(text: string, name: string = 'my_text') {
  const savingTextBlob = new Blob([text]);

  const link = document.createElement('a');

  link.href = URL.createObjectURL(savingTextBlob);
  link.download = name;
  link.click();
}