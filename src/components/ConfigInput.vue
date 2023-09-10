<script lang="ts" setup>
import { useStorage } from '@vueuse/core'
import { ColorPicker } from "vue3-colorpicker";
import "vue3-colorpicker/style.css";

const cmdr = useStorage<string | undefined>("cmdr", "") 
const onlyOwnInteractions = useStorage("onlyOwnInteractions", false)
const highlightOwnInteractions = useStorage("highlightOwnInteractions", true)
const highlightOwnInteractionsColor = useStorage("highlightOwnInteractionsColor", "#ff0000ff")
const interactionsColor = useStorage("interactionsColor", "#4b4b4bff")
const backgroundColor = useStorage("backgroundColor", "#000000aa")
const useGreenScreen = useStorage("useGreenScreen", false)
const alignment = useStorage("alignment", "topRight")

</script>


<template>
<div class="flex p-2 pl-8 flex-col flex-1 overflow-y-scroll">
  <h2 class="text-xl text-neutral-500">Settings</h2>
  <hr class=" border-neutral-800 my-2" />

  <p class="text-neutral-500 pl-2">
    Your Settings are stored in local storage. If you close the site and come back they will persist :)
  </p>


  <div class="flex flex-col my-3">
    <label class=" text-neutral-400 font-bold" for="cmdr">CMDR Name(s)</label>
    <input id="cmdr" class=" bg-neutral-800 p-2 text-white font-extrabold rounded-md" type="text" v-model="cmdr" placeholder="e.g. 'WDX' or 'WDX, Harry Potter, ACowForAllSeasons'">
    <p class="text-neutral-500 pl-2">Enter either one Name like <span class="text-white">WDX</span> or a comma-separated list (in case you also want your Alts Picked up) like <span class="text-white">WDX, ACowForAllSeasons, Harry Potter</span>. Case wont matter (e.g. wdx vs WDX).</p>
  </div>

  <div class="flex flex-col my-3">
    <label class=" text-neutral-400 font-bold" for="alignment">Element Alignment</label>
    <select id="alignment" class=" bg-neutral-800 p-2 text-white font-extrabold rounded-md" v-model="alignment" >
      <option>topRight</option>
      <option>topLeft</option>
      <option>bottomLeft</option>
      <option>bottomRight</option>
    </select>
    <p class="text-neutral-500 pl-2">Where should the Kill Events be aligned? topRight will for example put them into - you guessed it - the top right corned, just how CS:GO does it.</p>
  </div>


  <div class="flex flex-col my-3">
    <div class="inline-flex flex-row gap-3">
      <input id="onlyOwnInteractions" class=" bg-neutral-800 p-2 text-white font-extrabold rounded-md" type="checkbox" v-model="onlyOwnInteractions">
      <label class=" text-neutral-400 font-bold" for="onlyOwnInteractions">Only show own Interactions</label>
    </div>
    <p v-if="(cmdr??'').replace(',', '').trim().length === 0" class=" text-yellow-500/90 pl-2">Warning: You need to set at least one CMDR name for this Setting to become relevant.</p>
    <p class="text-neutral-500 pl-2">This will make sure that only Events where you either died or got a kill will get put onto the overlay.</p>
  </div>

  <div class="flex flex-col my-3">
    <div class="inline-flex flex-row gap-3">
      <input id="highlightOwnInteractions" class=" bg-neutral-800 p-2 text-white font-extrabold rounded-md" type="checkbox" v-model="highlightOwnInteractions">
      <label class=" text-neutral-400 font-bold" for="highlightOwnInteractions">Highlight own Interactions</label>
    </div>
    <p v-if="(cmdr??'').replace(',', '').trim().length === 0" class=" text-yellow-500/90 pl-2">Warning: You need to set at least one CMDR name for this Setting to become relevant.</p>
    <p class="text-neutral-500 pl-2">This will give kills or deaths where you are involved a red outline (color can be changed below)</p>
  </div>

  <div class="flex flex-col my-3">
    <label class=" text-neutral-400 font-bold" for="highlightOwnInteractionsColor">Outline Color for Highlight own Interactions</label>
    <div class="flex flex-row items-center">
      <ColorPicker 
        id="highlightOwnInteractionsColor"
        :is-widget=false 
        :lang="'En'" 
        use-type="pure" 
        format="hex8"   
        v-model:pure-color="highlightOwnInteractionsColor" />
      <button 
        @click="highlightOwnInteractionsColor = '#ff0000'"
        class=" p-2 text-white rounded-lg bg-neutral-50/10 hover:bg-neutral-50/40 hover:text-black duration-200 transition-all">Reset to default</button>
    </div>

    <p v-if="(cmdr??'').replace(',', '').trim().length === 0" class=" text-yellow-500/90 pl-2">Warning: You need to set at least one CMDR name for this Setting to become relevant.</p>
    <p v-if="!highlightOwnInteractions" class=" text-yellow-500/90 pl-2">Warning: 'Highlight own Interactions' must be enabled for this setting to be relevant.</p>
    <p class="text-neutral-500 pl-2">This changes the outline color </p>
  </div>

  <div class="flex flex-col my-3">
    <label class=" text-neutral-400 font-bold" for="interactionsColor">Outline Color for regular events</label>
    <div class="flex flex-row items-center">
      <ColorPicker 
        id="interactionsColor"
        :is-widget=false 
        :lang="'En'" 
        use-type="pure" 
        format="hex8"   
        v-model:pure-color="interactionsColor" />
      <button 
        @click="interactionsColor = '#4b4b4b'"
        class=" p-2 text-white rounded-lg bg-neutral-50/10 hover:bg-neutral-50/40 hover:text-black duration-200 transition-all">Reset to default</button>
    </div>
  </div>

  <div class="flex flex-col my-3">
    <label class=" text-neutral-400 font-bold" for="interactionsColor">Background Fill</label>
    <div class="flex flex-row items-center">
      <ColorPicker 
        id="interactionsColor"
        :is-widget=false 
        :lang="'En'" 
        use-type="pure" 
        format="hex8"   
        v-model:pure-color="backgroundColor" />
      <button 
        @click="backgroundColor = '#000000aa'"
        class=" p-2 text-white rounded-lg bg-neutral-50/10 hover:bg-neutral-50/40 hover:text-black duration-200 transition-all">Reset to default</button>
    </div>
  </div>



  <div class="flex flex-col my-3">
    <div class="inline-flex flex-row gap-3">
      <input id="useGreenScreen" class=" bg-neutral-800 p-2 text-white font-extrabold rounded-md" type="checkbox" v-model="useGreenScreen">
      <label class=" text-neutral-400 font-bold" for="useGreenScreen">Use Green Background</label>
    </div>
    <p class="text-neutral-500 pl-2">Can't get OBS's Plugin to pick up the background as proper alpha? Then check this box and you will get a full-green Background instead.</p>
  </div>

</div>

</template>