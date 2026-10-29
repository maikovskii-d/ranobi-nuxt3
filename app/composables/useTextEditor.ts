import type { TextObject } from '~/types';

const mainTextDiv = shallowRef<HTMLDivElement | null>(null);
const uploadInput = shallowRef<HTMLInputElement | null>(null);

export function useTextEditor() {
  const textVersion = ref(0);

  function registerMainTextDiv(el: HTMLDivElement | null) {
    mainTextDiv.value = el;
  }

  function registerUploadInput(el: HTMLInputElement | null) {
    uploadInput.value = el;
  }

  function addUploadListener() {
    if (uploadInput.value) {
      uploadInput.value.addEventListener('change', handleFileSelection);

      function handleFileSelection(evt: Event) {
        if (!(evt.target instanceof HTMLInputElement) || !evt.target.files) return;

        const file = evt.target.files[0];

        if (file) {
          readFileAsText(file, (result) => {
            const textObject: TextObject = JSON.parse(result);

            if (mainTextDiv.value) {
              mainTextDiv.value.innerText = textObject.ciphertext;
            }

            setAutosave(textObject.ciphertext);
          });
        }
      }
    }
  }

  // counter
  const withSpaces = computed(() => {
    textVersion.value;
    return (mainTextDiv.value?.textContent ?? '').length;
  });
  const withoutSpaces = computed(() => {
    textVersion.value;
    return (mainTextDiv.value?.textContent ?? '').replace(/\s/g, '').length;
  });

  function mountAutosave() {
    if (mainTextDiv.value) {
      mainTextDiv.value.innerText = getAutosave() ?? '';
    }
  }

  function changeMainText (text: string) {
    textVersion.value++;
    
    setAutosave(text);
  }

  return {
    mainTextDiv,
    uploadInput,
    counter: { withSpaces, withoutSpaces },
    textVersion,
    registerMainTextDiv,
    registerUploadInput,
    changeMainText,
    mountAutosave,
    addUploadListener,
  };
}