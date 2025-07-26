<script setup lang="js">
import { computed, reactive, watch } from 'vue';
import { TresCanvas } from '@tresjs/core';
import { OrbitControls } from '@tresjs/cientos';
import * as Tweakpane from 'tweakpane';
import { useGameStore } from './stores/gameStore.js';
import { useFieldStore } from './stores/fieldStore.js';
import Field from './components/Field.vue';
import InfoPanel from './components/InfoPanel.vue';
import FieldInfoPanel from './components/FieldInfoPanel.vue';

const fieldStore = useFieldStore();
const gameStore = useGameStore();

gameStore.initializeGame(4, 4, ['Игрок 1']);

const handleFieldClick = (fieldId) => {
  gameStore.plantSeed(fieldId, 'dandelion');
};

const nextStep = () => {
  gameStore.nextStep();
};

const currentPlayer = computed(() => gameStore.getCurrentPlayer());
const canPlant = computed(() => currentPlayer.value && !currentPlayer.value.planted);

const state = reactive({
  clearColor: '#c0ffee',
  wireframe: false
});

const pane = new Tweakpane.Pane();
pane.addBinding(state, 'clearColor');
pane.addBinding(state, 'wireframe');

// Отслеживание изменений для отладки
watch(() => state.clearColor, (newValue) => {
  console.log('clearColor changed:', newValue);
});
watch(() => state.wireframe, (newValue) => {
  console.log('wireframe changed:', newValue);
});
</script>

<template>
  <div>
    <InfoPanel @next-step="nextStep" />
    <FieldInfoPanel :hovered-field="gameStore.getHoveredField" />
    <TresCanvas window-size :clear-color="state.clearColor">
      <OrbitControls />
      <TresPerspectiveCamera :position="[0, 5, 10]" :look-at="[0, 0, 0]" />
      <Field
          v-for="field in fieldStore.fields"
          :key="field.id"
          :field="field"
          :onClick="canPlant ? () => handleFieldClick(field.id) : null"
          :onHover="fieldStore.setHoveredField"
          :onLeave="fieldStore.clearHoveredField"
      />
      <TresAmbientLight :intensity="2.0" />
    </TresCanvas>
  </div>
</template>

<style>
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
</style>

<style>
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
</style>