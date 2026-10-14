<template>
  <Preloader />
  <input ref="uploadInputRef" type="file" style="width: 0px; height: 0px; position: absolute;" accept=".txt" />
  <ThreeDotsBtn />
  <div class="w-full h-full absolute bg-white md:bg-violet-200 dark:bg-gray-900 md:dark:bg-gray-700">
    <div
      ref="mainTextDivRef"
      class="p-2"
      contenteditable
      @input="handleChangeMainText"
    ></div>
  </div>
  <div class="fixed bottom-0">
    <span>{{ counter.withSpaces }}</span> /
    <span>{{ counter.withoutSpaces }}</span>
  </div>
</template>

<script setup lang="ts">
import { APP_NAME } from '~/constants';

useHead({
  title: APP_NAME,
});

const {
  counter,
  registerMainTextDiv,
  registerUploadInput,
  changeMainText,
  mountAutosave,
  addUploadListener,
} = useTextEditor();

const mainTextDivRef = shallowRef<HTMLDivElement | null>(null);
const uploadInputRef = shallowRef<HTMLInputElement | null>(null);

function handleChangeMainText(evt: Event) {
  if (!(evt.target instanceof HTMLElement)) return;

  changeMainText(evt.target.textContent ?? '');
}

onMounted(() => {
  registerMainTextDiv(mainTextDivRef.value);
  registerUploadInput(uploadInputRef.value);
  addUploadListener();
  mountAutosave();
})
</script>