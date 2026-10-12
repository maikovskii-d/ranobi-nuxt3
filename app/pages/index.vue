<template>
  <Preloader />
  <input ref="uploadInputRef" type="file" style="width: 0px; height: 0px; position: absolute;" accept=".txt" />
  <div class="w-full h-full absolute bg-violet-200 dark:bg-gray-700">
    <div
      ref="mainTextDivRef"
      class="p-2"
      contenteditable
      @input="handleChangeMainText"
    ></div>
    <button class="border border-black" @click="uploadInput?.click()">
      Загрузить
    </button>
    <button ref="save_file_btn" class="border border-black">
      Сохранить
    </button>
    <ThemeToggle />
  </div>
  <div class="fixed bottom-0">
    С пробелами - 
    <span>{{ counter.withSpaces }}</span>.
    Без пробелов - 
    <span>{{ counter.withoutSpaces }}</span>
  </div>
</template>

<script setup lang="ts">
import { APP_NAME } from '~/constants';

useHead({
  title: APP_NAME,
});

const {
  mainTextDiv,
  uploadInput,
  counter,
  registerMainTextDiv,
  registerUploadInput,
  changeMainText,
  mountAutosave,
  addUploadListener,
} = useTextEditor();

const mainTextDivRef = shallowRef<HTMLDivElement | null>(null);
const uploadInputRef = shallowRef<HTMLInputElement | null>(null);
const saveFileBtn = useTemplateRef('save_file_btn');

function handleChangeMainText(evt: Event) {
  if (!(evt.target instanceof HTMLElement)) return;

  changeMainText(evt.target.textContent ?? '');
}

onMounted(() => {
  registerMainTextDiv(mainTextDivRef.value);
  registerUploadInput(uploadInputRef.value);
  addUploadListener();
  mountAutosave();

  if (saveFileBtn.value) {
    saveFileBtn.value.addEventListener('click', handleSaveFileClick);

    function handleSaveFileClick() {
      saveTextAsFile(mainTextDiv.value?.textContent ?? '');
    }
  }
})
</script>