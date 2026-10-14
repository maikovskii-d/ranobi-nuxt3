<template>
  <div class="fixed top-2 right-2 z-1000 flex flex-col items-end">
    <button class="flex flex-col gap-1 w-[26px] h-9 px-3 py-[5px] cursor-pointer" @click="isOpen = !isOpen">
      <div class="bg-violet-200 md:bg-white dark:bg-gray-600 md:dark:bg-gray-900 w-[6px] h-[6px] rounded"></div>
      <div class="bg-violet-200 md:bg-white dark:bg-gray-600 md:dark:bg-gray-900 w-[6px] h-[6px] rounded"></div>
      <div class="bg-violet-200 md:bg-white dark:bg-gray-600 md:dark:bg-gray-900 w-[6px] h-[6px] rounded"></div>
    </button>
    <div v-if="isOpen" class="mt-3 bg-violet-200 md:bg-white dark:bg-gray-700 md:dark:bg-gray-900 w-[114px] rounded shadow-md p-1">
      <button class="mx-[6px] cursor-pointer" ref="save_file_btn">
        <span class="text-sm dark:text-white">Сохранить</span>
      </button>
      <button class="mx-[6px] cursor-pointer" @click="uploadInput?.click">
        <span class="text-sm dark:text-white">Загрузить</span>
      </button>
      <button class="mx-[6px] cursor-pointer" @click="isFullscreen = !isFullscreen; toggleFullscreen()">
        <span class="text-sm dark:text-white">{{ isFullscreen ? 'В окне' : 'Полный экран' }}</span>
      </button>
      <button class="mx-[6px] cursor-pointer" @click="toggleTheme">
        <span class="text-sm dark:text-white">{{ colorMode.value === 'dark' ? 'Светлая тема' : 'Темная тема' }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const { mainTextDiv, uploadInput } = useTextEditor();
const saveFileBtnRef = useTemplateRef('save_file_btn');
const colorMode = useColorMode();

const isOpen = ref(false);
const isFullscreen = ref(false);

function toggleTheme() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
}

watchEffect((onCleanup) => {
  if (saveFileBtnRef.value) {
    saveFileBtnRef.value.addEventListener('click', handleSaveFileClick);

    function handleSaveFileClick() {
      saveTextAsFile(mainTextDiv.value?.textContent ?? '');
    }

    const saveFileBtnRefValue = saveFileBtnRef.value;

    onCleanup(() => {
      saveFileBtnRefValue.removeEventListener('click', handleSaveFileClick);
    });
  }
})

onMounted(() => {
  if (saveFileBtnRef.value) {
    saveFileBtnRef.value.addEventListener('click', handleSaveFileClick);

    function handleSaveFileClick() {
      saveTextAsFile(mainTextDiv.value?.textContent ?? '');
    }
  }
})
</script>