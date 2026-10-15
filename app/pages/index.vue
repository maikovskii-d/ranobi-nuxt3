<template>
  <Preloader />
  <input ref="uploadInputRef" type="file" style="width: 0px; height: 0px; position: absolute;" accept=".txt" />
  <ThreeDotsBtn />
  <div class="w-full h-screen absolute bg-white md:bg-violet-200 dark:bg-gray-900 md:dark:bg-gray-700 flex justify-center">
    <div class="min-w-0 px-[15px] md:px-[44px] pt-11 md:py-[36px] w-full md:w-[600px] md:my-[45px] bg-white dark:bg-gray-900 dark:text-white md:shadow-md">
      <div
        ref="mainTextDivRef"
        spellcheck="false"
        class="dark:caret-violet-500 outline-0 overflow-y-auto overflow-x-hidden overscroll-contain h-[85vh] [scrollbar-width:thin] [scrollbar-color:var(--scrollbar-thumb)_transparent] [--scrollbar-thumb:#d4d4d8] dark:[--scrollbar-thumb:#52525b]"
        contenteditable
        @input="handleChangeMainText"
      ></div>
    </div>
  </div>
  <div class="fixed bottom-0 w-full dark:text-white flex justify-center md:justify-start">
    <div>
      {{ counter.withSpaces }} / {{ counter.withoutSpaces }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { APP_NAME } from '~/constants';

useHead({
  title: APP_NAME,
  bodyAttrs: {
    class: 'bg-white md:bg-violet-200 dark:bg-gray-900 md:dark:bg-gray-700',
  },
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