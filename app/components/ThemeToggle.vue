<template>
  <button
    type="button"
    class="rounded-lg border border-gray-300 px-4 py-2
           text-gray-900 hover:bg-gray-100
           dark:border-gray-700 dark:text-white
           dark:hover:bg-gray-800"
    @click="toggleTheme"
  >
    {{ colorMode.value === 'dark' ? '☀️ Светлая тема' : '🌙 Тёмная тема' }}
  </button>
</template>

<script setup lang="ts">
const colorMode = useColorMode()

function toggleTheme() {
  colorMode.preference =
    colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>