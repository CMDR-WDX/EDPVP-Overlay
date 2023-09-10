<script lang="ts" setup>
import { useStorage } from '@vueuse/core';
import getEffectiveConfig from '../util/getEffectiveConfig';
import { MockEventListener } from '../util/eventListeners';
import { onBeforeUnmount, ref } from 'vue';
import KillEntry from './KillEntry.vue';

const cmdr = useStorage<string | undefined>("cmdr", "") 
const onlyOwnInteractions = useStorage("onlyOwnInteractions", false)
const highlightOwnInteractions = useStorage("highlightOwnInteractions", true)
const highlightOwnInteractionsColor = useStorage("highlightOwnInteractionsColor", "#ff0000ff")
const interactionsColor = useStorage("interactionsColor", "#4b4b4bff")
const backgroundColor = useStorage("backgroundColor", "#000000aa")
const useGreenScreen = useStorage("useGreenScreen", false)
const alignment = useStorage("alignment", "topRight")

const config = getEffectiveConfig(
  cmdr.value, 
  onlyOwnInteractions.value, 
  highlightOwnInteractions.value, 
  highlightOwnInteractionsColor.value, 
  interactionsColor.value, 
  backgroundColor.value, 
  useGreenScreen.value, 
  alignment.value, 
)

const currentEntries = ref<[string, string][]>([])


const backgroundStyle =  config.useGreenScreen ? {backgroundColor: "#00ff00"} : {}

const alignVerticalTop = config.alignment === "topLeft" || config.alignment === "topRight"
const alignHorizontalLeft = config.alignment === "topLeft" || config.alignment === "bottomLeft"




function handleNewEvent(killer: string, victim: string) {
  
  if(alignVerticalTop) {
    currentEntries.value.unshift([killer, victim])
  } else {
    currentEntries.value.push([killer, victim])
  }

  setTimeout(() => {
    if(alignVerticalTop) {
      currentEntries.value.pop()
    } else {
      currentEntries.value.shift()
    }
  }, 10000)
}


const {cancel} = MockEventListener(config, handleNewEvent)


onBeforeUnmount( () => {
  cancel()
})


</script>



<template>
<div :style="backgroundStyle" class="flex flex-col flex-1 gap-1 bg-transparent h-screen p-2">
  <div v-if="!alignVerticalTop" class="flex-1"/>
  <TransitionGroup name="killer" tag="div">
    <div :key="killer+'+'+victim" v-for="[killer, victim] in currentEntries" :class="`flex py-[1px] flex-row ${alignHorizontalLeft ? '' : 'justify-end'}`">
      <KillEntry :killer-name="killer" :victim-name="victim" background-color="black" outline-color="red" />
    </div>
  </TransitionGroup>
</div>


</template>

<style>
.killer-enter-active,
.killer-move,
.killer-leave-active {
  transition: all 0.5s ease;
}
.killer-enter-from,
.killer-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

</style>