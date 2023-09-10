<script setup lang="ts">
import SkullIcon from './SkullIcon.vue';

interface Props {
  killerName: string
  victimName: string
  
  outlineColor: string
  backgroundColor: string
}

const props = defineProps<Props>();

</script>

<template>

<div :style="{
  'background-color': props.backgroundColor,
  'border-color': props.outlineColor
}" class=" inline-flex flex-row border rounded-lg p-1 items-center">
  <p class="text-white text-lg font-bold px-2">{{ killerName }}</p>
  <SkullIcon />
  <p class="text-white text-lg font-bold px-2">{{ victimName }}</p>
</div>


</template>