<script setup lang="ts">
import { useStorage } from '@vueuse/core';
import KillEntry from './KillEntry.vue';
import { computed } from 'vue';
import getEffectiveConfig from "../util/getEffectiveConfig"
const cmdr = useStorage<string | undefined>("cmdr", "") 
const onlyOwnInteractions = useStorage("onlyOwnInteractions", false)
const highlightOwnInteractions = useStorage("highlightOwnInteractions", true)
const highlightOwnInteractionsColor = useStorage("highlightOwnInteractionsColor", "#ff0000ff")
const interactionsColor = useStorage("interactionsColor", "#4b4b4bff")
const backgroundColor = useStorage("backgroundColor", "#000000aa")
const useGreenScreen = useStorage("useGreenScreen", false)


const config = computed( () => getEffectiveConfig(cmdr.value!, onlyOwnInteractions.value, highlightOwnInteractions.value, highlightOwnInteractionsColor.value, interactionsColor.value, backgroundColor.value, useGreenScreen.value, "topLeft"))


const backgroundStyle = computed( () => config.value.useGreenScreen ? {backgroundColor: "#00ff00"} : {})

</script>

<template>
<div class="flex p-2 flex-col flex-1 pr-8">
  <h2 class="text-xl text-neutral-500">Preview</h2>
  <hr class=" border-neutral-800 my-2" />

  <p class="text-neutral-500 pl-2">
    Look at what your config looks like! (excluding Element Alignment)  
  </p>

  <div :style="backgroundStyle"  class="flex flex-col gap-1 mt-5 sticky top-20 p-1 rounded-lg">
    <div v-if="config.ownCmdrs.length > 0" class="flex flex-col items-end">
      <div class="inline-flex flex-row">
        <KillEntry :killer-name="config.ownCmdrs[0]" victim-name="VictimName"  :background-color="config.backgroundColor" :outline-color="config.ownInteractionColor"   />
      </div>
    </div>
  
    <div v-if="config.ownCmdrs.length > 0" class="flex flex-col items-end">
      <div class="inline-flex flex-row">
        <KillEntry killer-name="Some killer" :victim-name="config.ownCmdrs[0]"  :background-color="config.backgroundColor" :outline-color="config.ownInteractionColor"   />
      </div>
    </div>

    <div v-if="!config.showOnlyOwnInteraction" class="flex flex-col items-end">
      <div class="inline-flex flex-row">
        <KillEntry killer-name="Someone" victim-name="Someone Else"  :background-color="config.backgroundColor" :outline-color="config.otherInteractionColor"   />
      </div>
    </div>
  </div>

  
</div>
</template>