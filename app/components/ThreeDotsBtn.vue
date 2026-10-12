<template>
  <div class="fixed top-2 right-2 z-1000 flex flex-col items-end">
    <button class="flex flex-col gap-1 w-[26px] h-9 px-3 py-[5px] cursor-pointer" @click="isOpen = !isOpen">
      <div class="bg-white w-[6px] h-[6px] rounded"></div>
      <div class="bg-white w-[6px] h-[6px] rounded"></div>
      <div class="bg-white w-[6px] h-[6px] rounded"></div>
    </button>
    <div v-if="isOpen" class="mt-3 bg-white w-[114px] h-20 rounded shadow-md">
      
    </div>
  </div>
</template>

<script setup lang="ts">
const isOpen = ref(false);
</script>