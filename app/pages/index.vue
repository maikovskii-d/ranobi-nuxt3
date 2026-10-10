<template>
  <Preloader />
  <div
    :id="MAIN_TEXT_DIV_ID"
    class="p-2"
    contenteditable
    @input="handleChangeMainText"
  >
  </div>
  <label class="border border-black">
    <span>Загрузить</span>
    <input :id="UPLOAD_INPUT_ID" type="file" style="width: 0px" accept=".txt" />
  </label>
  <button :id="SAVE_FILE_BTN_ID" class="border border-black">
    Сохранить
  </button>
  <div class="fixed bottom-0">
    С пробелами - 
    <span :id="COUNTER_WITH_SPACES_ID"></span>.
    Без пробелов - 
    <span :id="COUNTER_WITHOUT_SPACES_ID"></span>
  </div>
</template>

<script setup>
import {
  APP_NAME,
  MAIN_TEXT_DIV_ID,
  UPLOAD_INPUT_ID,
  SAVE_FILE_BTN_ID,
  COUNTER_WITH_SPACES_ID,
  COUNTER_WITHOUT_SPACES_ID,
} from '~/constants';

useHead({
  title: APP_NAME,
});

function handleChangeMainText(evt) {
  // autosave
  setAutosave(evt.target.textContent ?? '');

  // change counters
  const mainTextDiv = document.querySelector(`#${MAIN_TEXT_DIV_ID}`);
  const counterWithSpacesSpan = document.querySelector(`#${COUNTER_WITH_SPACES_ID}`);
  const counterWithoutSpacesSpan = document.querySelector(`#${COUNTER_WITHOUT_SPACES_ID}`);

  counterWithSpacesSpan.textContent = mainTextDiv.textContent.length;
  counterWithoutSpacesSpan.textContent = mainTextDiv.textContent.replaceAll(' ', '').length;
}

onMounted(() => {
  const mainTextDiv = document.querySelector(`#${MAIN_TEXT_DIV_ID}`);

  // get autosave
  mainTextDiv.textContent = getAutosave();

  // get counters

  const counterWithSpacesSpan = document.querySelector(`#${COUNTER_WITH_SPACES_ID}`);
  const counterWithoutSpacesSpan = document.querySelector(`#${COUNTER_WITHOUT_SPACES_ID}`);

  counterWithSpacesSpan.textContent = mainTextDiv.textContent.length;
  counterWithoutSpacesSpan.textContent = mainTextDiv.textContent.replaceAll(' ', '').length;

  // upload
  const uploadInput = document.querySelector(`#${UPLOAD_INPUT_ID}`);
  
  uploadInput.addEventListener('change', handleFileSelection);

  function handleFileSelection(evt) {
    const file = evt.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        mainTextDiv.textContent = reader.result;
      };

      reader.readAsText(file);
    }
  }

  // save file
  const saveFileBtn = document.querySelector(`#${SAVE_FILE_BTN_ID}`);

  saveFileBtn.addEventListener('click', handleSaveFileClick);

  function handleSaveFileClick() {
    const savingText = mainTextDiv.textContent;
    const savingTextBlob = new Blob([savingText]);

    const link = document.createElement('a');

    link.href = URL.createObjectURL(savingTextBlob);
    link.download = 'my_text';
    link.click();
  }
})
</script>