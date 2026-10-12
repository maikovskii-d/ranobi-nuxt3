export function readFileAsText(file: File, callback: (result: string) => void) {
  const reader = new FileReader();

  reader.onload = () => {
    if (typeof reader.result === 'string') {
      callback(reader.result);
    }
  };

  reader.readAsText(file);
}