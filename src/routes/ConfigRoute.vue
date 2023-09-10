<script lang="ts" setup>
import ConfigInput from '../components/ConfigInput.vue';
import ConfigPreview from '../components/ConfigPreview.vue';
</script>

<template>
  <div class="flex flex-col w-full min-h-screen bg-neutral-900">
    <nav class="flex flex-row bg-blue-900 p-3 items-center fixed w-full">
      <h1 class=" text-xl font-extrabold text-white">EDPVP Killboard Overlay</h1>
      <div class="flex-1"/>
      <RouterLink class="text-xl font-extrabold text-white p-2 hover:bg-blue-300 hover:scale-105 duration-150 transition-all bg-blue-500 rounded-xl" to="/main?demo">Go to Demo</RouterLink>
      <RouterLink class="text-xl font-extrabold text-white p-2 hover:bg-blue-300 hover:scale-105 duration-150 transition-all bg-blue-500 rounded-xl ml-2" to="/main">Go to App</RouterLink>
    </nav>
    <div class="flex flex-row w-full pt-24">
      <ConfigInput/>
      <ConfigPreview/>
    </div>
  </div>



</template>