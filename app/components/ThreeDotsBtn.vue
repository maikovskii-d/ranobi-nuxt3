<template>
  <div class="fixed top-2 right-2 z-1000 flex flex-col items-end">
    <button class="flex flex-col gap-1 w-[26px] h-9 px-3 py-[5px] cursor-pointer" @click="isOpen = !isOpen">
      <div class="bg-violet-200 md:bg-white dark:bg-gray-600 md:dark:bg-gray-900 w-[6px] h-[6px] rounded"></div>
      <div class="bg-violet-200 md:bg-white dark:bg-gray-600 md:dark:bg-gray-900 w-[6px] h-[6px] rounded"></div>
      <div class="bg-violet-200 md:bg-white dark:bg-gray-600 md:dark:bg-gray-900 w-[6px] h-[6px] rounded"></div>
    </button>
    <div v-if="isOpen" class="mt-2 md:mt-3 bg-violet-200 md:bg-white dark:bg-gray-700 md:dark:bg-gray-900 w-[140px] rounded shadow-md p-[6px]">
      <button class="cursor-pointer p-[6px] w-full text-left hover:bg-violet-200 dark:hover:bg-violet-500" ref="save_file_btn">
        <span class="text-base dark:text-white">Сохранить</span>
      </button>
      <button class="cursor-pointer p-[6px] w-full text-left hover:bg-violet-200 dark:hover:bg-violet-500" @click="uploadInput?.click">
        <span class="text-base dark:text-white">Загрузить</span>
      </button>
      <button class="cursor-pointer p-[6px] w-full text-left hover:bg-violet-200 dark:hover:bg-violet-500" @click="isFullscreen = !isFullscreen; toggleFullscreen()">
        <span class="text-base dark:text-white">{{ isFullscreen ? 'В окне' : 'Полный экран' }}</span>
      </button>
      <button class="cursor-pointer p-[6px] w-full text-left hover:bg-violet-200 dark:hover:bg-violet-500" @click="toggleTheme">
        <span class="text-base dark:text-white">{{ colorMode.value === 'dark' ? 'Светлая тема' : 'Темная тема' }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { saveJsonAsFile } from '~/utils/saveJsonAsFile';
import { CRYPT_KDF } from '~/constants';

const { mainTextDiv, uploadInput } = useTextEditor();
const saveFileBtnRef = useTemplateRef('save_file_btn');
const colorMode = useColorMode();

const isOpen = ref(false);
const isFullscreen = ref(false);

function toggleTheme() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
}

watchEffect((onCleanup) => {
  const config = useRuntimeConfig();
  
  if (saveFileBtnRef.value) {
    saveFileBtnRef.value.addEventListener('click', handleSaveFileClick);

    async function handleSaveFileClick() {
      const textObjectInfo = createTextObjectInfo();

      const keyMaterial = await passwordToKeyMaterial(config.public.password, CRYPT_KDF);
      const derivedKey = await deriveKey(keyMaterial, textObjectInfo);

      const text = mainTextDiv.value?.innerText ?? '';

      const textObject = await encrypt(derivedKey, text, textObjectInfo);

      saveJsonAsFile(textObject, toBase64(generateSalt().buffer) + '.json');
    }

    const saveFileBtnRefValue = saveFileBtnRef.value;

    onCleanup(() => {
      saveFileBtnRefValue.removeEventListener('click', handleSaveFileClick);
    });
  }
})
</script>