<template>
  <Preloader />
  <div
    ref="mainTextDiv"
    class="p-2"
    contenteditable
    @input="handleChangeMainText"
  ></div>
  <label class="border border-black">
    <span>Загрузить</span>
    <input ref="upload_input" type="file" style="width: 0px" accept=".txt" />
  </label>
  <button ref="save_file_btn" class="border border-black">
    Сохранить
  </button>
  <div class="fixed bottom-0">
    С пробелами - 
    <span>{{ counterWithSpaces }}</span>.
    Без пробелов - 
    <span>{{ counterWithoutSpaces }}</span>
  </div>
</template>

<script setup lang="ts">
import {
  APP_NAME,
} from '~/constants';

useHead({
  title: APP_NAME,
});

const mainTextDiv = useTemplateRef('mainTextDiv');
const uploadInput = useTemplateRef('upload_input');
const saveFileBtn = useTemplateRef('save_file_btn');
const textVersion = ref(0);

const counterWithSpaces = computed(() => {
  textVersion.value;
  return (mainTextDiv.value?.textContent ?? '').length;
});
const counterWithoutSpaces = computed(() => {
  textVersion.value;
  return (mainTextDiv.value?.textContent ?? '').replace(/\s/g, '').length;
});

function handleChangeMainText(evt: Event) {
  const target = evt.target;

  if (!(target instanceof HTMLElement)) return;

  textVersion.value++;
  setAutosave(target.textContent ?? '');
}

onMounted(() => {
  // get autosave
  if (mainTextDiv.value) {
    mainTextDiv.value.textContent = getAutosave();
  }

  // upload
  if (uploadInput.value) {
    uploadInput.value.addEventListener('change', handleFileSelection);

    function handleFileSelection(evt: Event) {
      const target = evt.target

      if (!(target instanceof HTMLInputElement) || !target.files) return;

      const file = target.files[0];

      if (file) {
        const reader = new FileReader();

        reader.onload = () => {
          if (typeof reader.result === 'string') {
            if (mainTextDiv.value) {
              mainTextDiv.value.textContent = reader.result;
            }

            setAutosave(reader.result);
          }
        };

        reader.readAsText(file);
      }
    }
  }

  // save file
  if (saveFileBtn.value) {
    saveFileBtn.value.addEventListener('click', handleSaveFileClick);

    function handleSaveFileClick() {
      const savingText = mainTextDiv.value?.textContent ?? '';
      const savingTextBlob = new Blob([savingText]);

      const link = document.createElement('a');

      link.href = URL.createObjectURL(savingTextBlob);
      link.download = 'my_text';
      link.click();
    }
  }
})
</script>